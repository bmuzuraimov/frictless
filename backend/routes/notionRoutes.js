const express = require("express");
const router = express.Router();
const { withDB, ObjectId } = require("@/config/mongodb");
const { isUser } = require("@/utils/guard");
const {
  asyncHandler,
  InternalServerError,
} = require("@/utils/error_handler");
const { validateNotionCallback } = require("@/utils/validations");
const { Decipher } = require("@/utils/cipherman");
const { EN_DB_NAMES } = require("@/constants/notion_db_names");
const axios = require("axios");
const { snsPublisher } = require("@config/awsclient");
const util = require("util");
router.use(withDB);

router.post(
  "/callback",
  validateNotionCallback,
  isUser,
  asyncHandler(async (req, res) => {
    const { userId, code, redirect_uri } = req.body;
    const data = {
      grant_type: "authorization_code",
      code: code,
      redirect_uri: redirect_uri,
    };
    const response = await axios.post(
      "https://api.notion.com/v1/oauth/token",
      data,
      {
        headers: {
          Authorization: `Basic ${Buffer.from(
            `${process.env.NOTION_CLIENT_ID}:${process.env.NOTION_CLIENT_SECRET}`
          ).toString("base64")}`,
          "Content-Type": "application/json",
          "Notion-Version": "2022-06-28",
        },
      }
    );
    if (!response.data.duplicated_template_id) {
      res.json({
        success: false,
        message: "Please select provided templated by developer",
      });
    } else {
      const access_token = response.data.access_token;
      const parent_id = response.data.duplicated_template_id;
      const updateResult = await req.db.collection("users").updateOne(
        { _id: new ObjectId(userId) },
        {
          $set: {
            "notion.secret_key": access_token,
            "notion.template_id": parent_id,
            "notion.template_url":
              "https://www.notion.so/" + parent_id.replace(/-/g, ""),
            "notion.connected_on": new Date(),
          },
        }
      );
      if (updateResult.matchedCount === 0) {
        res.json({ success: false, message: "User not found" });
      } else if (updateResult.modifiedCount === 0) {
        res.json({ success: false, message: "Document not modified" });
      }
      res.json({
        success: true,
        access_token: access_token,
        parent_id: parent_id,
        message: "Success!",
      });
    }
  })
);

const formatDate = (time_zone) => {
  const options = {
    timeZone: time_zone,
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  };
  return new Intl.DateTimeFormat("en-GB", options).format(new Date());
};

router.post("/schedule", isUser, asyncHandler(async (req, res) => {
  const { userId } = req.body;
  let user = await req.db.collection("users").findOne({ _id: new ObjectId(userId) });
  
  user = await ensureNotionDbIds(user, req);
  const scheduleData = prepareScheduleData(user);
  await publishScheduleMessage(scheduleData);
  
  res.json({
    success: true,
    message: "Request accepted. Processing in the background.",
  });
}));

async function ensureNotionDbIds(user, req) {
  const dbIdsRequired = [
    "priorities_dbid", "todo_dbid", "schedule_dbid", "jobs_dbid",
    "courses_dbid", "recurring_dbid", "personal_dbid", "routine_dbid",
    "sports_dbid", "lecture_notes_dbid", "job_tasks_dbid",
  ];

  if (dbIdsRequired.some(dbId => !user.notion[dbId])) {
    return await update_notion_dbids(
      req,
      user._id.toString(),
      user.notion.secret_key,
      user.notion.template_id
    );
  }
  return user;
}


function prepareScheduleData(user) {
  return {
    date: formatDate(user.timezone),
    time_zone: user.timezone,
    user_data: {
      uid: user._id,
      access_token: user.notion.secret_key,
      IOS_USER: Decipher(user.ios_device.email),
      IOS_PASSWORD: Decipher(user.ios_device.password),
      priorities_dbid: user.notion.priorities_dbid,
      todo_dbid: user.notion.todo_dbid,
      schedule_dbid: user.notion.schedule_dbid,
      jobs_dbid: user.notion.jobs_dbid,
      courses_dbid: user.notion.courses_dbid,
      recurring_dbid: user.notion.recurring_dbid,
      personal_dbid: user.notion.personal_dbid,
      routine_dbid: user.notion.routine_dbid,
      sports_dbid: user.notion.sports_dbid,
      lecture_notes_dbid: user.notion.lecture_notes_dbid,
      job_tasks_dbid: user.notion.job_tasks_dbid,
    },
  };
}


async function publishScheduleMessage(scheduleData) {
  const params = {
    Message: JSON.stringify(scheduleData),
    TopicArn: process.env.SNS_SCHEDULE_TOPIC_ARN,
  };
  await snsPublisher.publishMessage(params);
}


router.post("/ios_schedule", asyncHandler(async (req, res) => {
  const { userId } = req.body;
  const deciphered_userId = Decipher(userId);
  
  if (!ObjectId.isValid(deciphered_userId)) {
    return res.json({ success: false, message: "Invalid user id" });
  }
  
  let user = await req.db.collection("users").findOne({ _id: new ObjectId(deciphered_userId) });
  
  if (!user) {
    return res.json({ success: false, message: "User not found." });
  }
  
  user = await ensureNotionDbIds(user, req);
  const scheduleData = prepareScheduleData(user);
  await publishScheduleMessage(scheduleData);
  
  res.json({
    success: true,
    message: "Request accepted. Processing in the background.",
  });
}));

async function update_notion_dbids(req, userId, secret_key, template_id) {
  const response = await axios.post(
    "https://api.notion.com/v1/search",
    {
      filter: {
        value: "database",
        property: "object",
      },
    },
    {
      headers: {
        "Notion-Version": "2022-02-22",
        Authorization: `Bearer ${secret_key}`,
        "Content-Type": "application/json",
      },
    }
  );
  const filteredResults = response.data.results
    .filter((item) => item.parent && item.parent.page_id == template_id)
    .reduce((accumulator, item) => {
      const key = EN_DB_NAMES[item.title[0].text.content];
      accumulator[key] = item.id;
      return accumulator;
    }, {});
  const result = await req.db.collection("users").findOneAndUpdate(
    { _id: new ObjectId(userId) }, // Filter document by _id
    { $set: { ...filteredResults } }, // Update operation
    {
      returnDocument: "after", // Option to return the updated document
      returnOriginal: false, // Deprecated in favor of returnDocument in newer MongoDB versions
      upsert: false, // Set to true if you want to insert a new document when no document matches the query
    }
  );
  return result;
}

module.exports = router;
