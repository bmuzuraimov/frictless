const express = require("express");
const router = express.Router();
const { withDB, ObjectId } = require("../utils/db");
const { isUser } = require("../utils/auth");
const { asyncHandler } = require("../utils/error_handler");
const { validateNotionCallback } = require("../utils/validations");
const { Decipher } = require("../utils/cipherman");
const { EN_DB_NAMES } = require("../utils/constants/notion_db_names");
const axios = require("axios");
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
    try {
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
      if (response.status !== 200) {
        throw new InternalServerError(response.data);
      } else {
        const access_token = response.access_token;
        const parent_id = response.duplicated_template_id;
        const updateResult = await req.db.collection("users").updateOne(
          { _id: new ObjectId(userId) },
          {
            $set: { notion_access_token: access_token, parent_id: parent_id },
          }
        );
        if (updateResult.matchedCount === 0) {
          throw new NotFoundError("User not found");
        } else if (updateResult.modifiedCount === 0) {
          throw new InternalServerError("Document not modified");
        }
        res.json({
          success: true,
          access_token: access_token,
          parent_id: parent_id,
          message: "Success!",
        });
      }
    } catch (error) {
      throw new InternalServerError(error.response.data);
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

router.post(
  "/schedule",
  isUser,
  asyncHandler(async (req, res) => {
    const { userId } = req.body;
    var user = await req.db
      .collection("users")
      .findOne({ _id: new ObjectId(userId) });
    const dbIdsRequired = [
      "priorities_dbid",
      "todo_dbid",
      "schedule_dbid",
      "jobs_dbid",
      "courses_dbid",
      "recurring_dbid",
      "personal_dbid",
      "routine_dbid",
      "sports_dbid",
      "lecture_notes_dbid",
      "job_tasks_dbid",
    ];
    if (dbIdsRequired.some((dbId) => !user[dbId])) {
      user = await update_notion_dbids(
        req,
        userId,
        user.notion_access_token,
        user.parent_id
      );
      if (dbIdsRequired.some((dbId) => !user[dbId])) {
        throw new InternalServerError("Not all Notion databases are linked.");
      }
    }
    const scheduleData = {
      date: formatDate(user.timezone),
      time_zone: user.timezone,
      user_data: {
        uid: user._id,
        access_token: user.notion_access_token,
        IOS_USER: Decipher(user.ios_email),
        IOS_PASSWORD: Decipher(user.ios_password),
        priorities_dbid: user.priorities_dbid,
        todo_dbid: user.todo_dbid,
        schedule_dbid: user.schedule_dbid,
        jobs_dbid: user.jobs_dbid,
        courses_dbid: user.courses_dbid,
        recurring_dbid: user.recurring_dbid,
        personal_dbid: user.personal_dbid,
        routine_dbid: user.routine_dbid,
        sports_dbid: user.sports_dbid,
        lecture_notes_dbid: user.lecture_notes_dbid,
        job_tasks_dbid: user.job_tasks_dbid,
        email: user.email,
      },
    };
    axios
      .post(process.env.LAMBDA_SCHEDULE_URL, scheduleData, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log("Lambda function called successfully");
      })
      .catch((error) => {
        console.error("Error calling Lambda function", error);
        throw new InternalServerError("Error calling Lambda function");
      });
    res.json({
      success: true,
      message: "Request accepted. Processing in the background.",
    });
  })
);

router.post(
  "/ios_schedule",
  isUser,
  asyncHandler(async (req, res) => {
    const { userId } = req.body;
    var user = await req.db
      .collection("users")
      .findOne({ _id: new ObjectId(Decipher(userId)) });
    const dbIdsRequired = [
      "priorities_dbid",
      "todo_dbid",
      "schedule_dbid",
      "jobs_dbid",
      "courses_dbid",
      "recurring_dbid",
      "personal_dbid",
      "routine_dbid",
      "sports_dbid",
      "lecture_notes_dbid",
      "job_tasks_dbid",
    ];
    if (dbIdsRequired.some((dbId) => !user[dbId])) {
      user = await update_notion_dbids(
        req,
        userId,
        user.notion_access_token,
        user.parent_id
      );
      if (dbIdsRequired.some((dbId) => !user[dbId])) {
        throw new InternalServerError("Not all Notion databases are linked.");
      }
    }
    const scheduleData = {
      date: formatDate(user.timezone),
      time_zone: user.timezone,
      user_data: {
        uid: user._id,
        access_token: user.notion_access_token,
        IOS_USER: Decipher(user.ios_email),
        IOS_PASSWORD: Decipher(user.ios_password),
        priorities_dbid: user.priorities_dbid,
        todo_dbid: user.todo_dbid,
        schedule_dbid: user.schedule_dbid,
        jobs_dbid: user.jobs_dbid,
        courses_dbid: user.courses_dbid,
        recurring_dbid: user.recurring_dbid,
        personal_dbid: user.personal_dbid,
        routine_dbid: user.routine_dbid,
        sports_dbid: user.sports_dbid,
        lecture_notes_dbid: user.lecture_notes_dbid,
        job_tasks_dbid: user.job_tasks_dbid,
        email: user.email,
      },
    };
    axios
      .post(process.env.LAMBDA_SCHEDULE_URL, scheduleData, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log("Lambda function called successfully");
      })
      .catch((error) => {
        console.error("Error calling Lambda function", error);
        throw new InternalServerError("Error calling Lambda function");
      });
    res.json({
      success: true,
      message: "Request accepted. Processing in the background.",
    });
  })
);

async function update_notion_dbids(req, userId, access_token, parent_id) {
  try {
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
          Authorization: `Bearer ${access_token}`,
          "Content-Type": "application/json",
        },
      }
    );
    const filteredResults = response.data.results
      .filter((item) => item.parent && item.parent.page_id == parent_id)
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
  } catch (error) {
    console.error(error);
  }
}

module.exports = router;
