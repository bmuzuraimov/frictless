const express = require("express");
const router = express.Router();
const { withDB } = require("../utils/db");
const { generateToken } = require("../utils/auth");
const { asyncHandler, AuthenticationError } = require("../utils/error_handler");
const { generateCode, verifyCode } = require("../utils/handle_confirmation");
const { emailSender } = require("../utils/mailman");
const { Decipher } = require("../utils/cipherman");
const axios = require("axios");
router.use(withDB);


const EN_DB_NAMES = {
  "Priorities": "priorities_dbid",
  "To do": "todo_dbid",
  "Schedule": "schedule_dbid",
  "Jobs": "jobs_dbid",
  "Courses": "courses_dbid",
  "Recurring Activities": "recurring_dbid",
  "Personal Projects": "personal_dbid",
  "Routine": "routine_dbid",
  "Sports": "sports_dbid",
  "Lecture notes": "lecture_notes_dbid",
  "Job tasks": "job_tasks_dbid",
};

// Testing get node
router.get(
  "/test",
  asyncHandler(async (req, res) => {
    const test = process.env.NOTION_CLIENT_ID;
    res.json({ 'status': true, 'message': 'Success!', test: test });
  })
);

// Login user
router.post(
  "/login",
  asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const user = await req.db.collection("users").findOne({ email });
    if(!user || password != user.password) {
      throw new AuthenticationError("Wrong credentials!");
    }
    delete user.password;
    const token = generateToken(user);
    res.json({ token: token, messsage: "Success!" });
  })
);

// Sign up user
router.post(
  "/sign-up",
  asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const newUser = await req.db.collection("users").insertOne({
      email,
      verified: false,
      password: password,
    });
    res.json({
      success: true,
      message: "Sign-up successful",
      data: { userId: newUser.insertedId },
    });
    const confirmationCode = await generateCode(email);
    emailSender.sendEmail(email, confirmationCode);
  })
);

// store the user signed with Auth0 if doesn't exist
// POST endpoint for Auth0 signin
router.post(
  "/auth0_signin",
  asyncHandler(async (req, res) => {
    const { email_verified, sub, timezone, ...userData } = req.body;

    // Check for email verification
    if (!email_verified) {
      return res
        .status(400)
        .json({ success: false, message: "Email is not verified" });
    }
    // Extract the user's IP address
    const ip = (req.headers["x-forwarded-for"] || req.connection.remoteAddress || "").split(",")[0].trim();
    // get the timezone of the user
    // Check if the user with sub exists
    const existingUser = await req.db.collection("users").findOne({ _id: sub });
    // If the user doesn't exist, create a new user
    if (!existingUser) {
      // use sub as _id
      const newUser = await req.db.collection("users").insertOne({
        _id: sub,
        ...userData,
        ip,
        timezone,
        creationDate: new Date(), // Add a creation date for the new user
        lastLogin: new Date(), // Add a last login date for the new user
      });

      return res.json({
        success: true,
        message: "Signin successful",
        data: { userId: newUser.insertedId },
      });
    }
    // If user exists, update their last login time
    await req.db.collection("users").updateOne(
      { _id: existingUser._id },
      { $set: { lastLogin: new Date() } } // Update the last login time
    );

    // Respond with success message
    return res.json({
      success: true,
      message: "Signin successful",
      data: { userId: existingUser._id },
    });
  })
);

router.post(
  "/notion_callback",
  asyncHandler(async (req, res) => {
    const { userId, code, redirect_uri } = req.body;
    const data = {
      "grant_type": "authorization_code",
      "code": code,
      "redirect_uri": redirect_uri,
    };
    const response = await fetch("https://api.notion.com/v1/oauth/token", {
      method: "POST",
      headers: {
        "Authorization":
          "Basic " +
          Buffer.from(
            process.env.NOTION_CLIENT_ID +
              ":" +
              process.env.NOTION_CLIENT_SECRET
          ).toString("base64"),
        "Content-Type": "application/json",
        "Notion-Version": "2022-06-28"
      },
      body: JSON.stringify(data),
    });
    const response_data = await response.json();
    if (response_data.error) {
      return res
        .status(400)
        .json({ success: false, message: response_data.error });
    } else {
      const access_token = response_data.access_token;
      const parent_id = response_data.duplicated_template_id;
      await req.db.collection("users").updateOne(
        { _id: userId },
        { $set: { notion_access_token: access_token, parent_id: parent_id } }
      );
      res.json({ success: true, access_token: access_token, parent_id: parent_id, messsage: "Success!" });
    }
  })
);
router.post(
  "/update_notion_dbids",
  asyncHandler(async (req, res) => {
  const { userId, access_token, parent_id } = req.body;
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
          "Authorization": `Bearer ${access_token}`,
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
    await req.db
      .collection("users")
      .updateOne({ _id: userId }, { $set: { ...filteredResults } });
    res.json({ success: true, message: "Success!", data: filteredResults});
  } catch (error) {
    console.error(error);
  }
}));

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
    const result = await req.db
      .collection("users")
      .updateOne({ _id: userId }, { $set: { ...filteredResults } });
    return result;
  } catch (error) {
    console.error(error);
  }
}

function getFormattedDate() {
  const date = new Date();

  let month = (date.getMonth() + 1).toString();
  let day = date.getDate().toString();
  const year = date.getFullYear();

  // Adding leading zero if month or day is less than 10
  if (month.length < 2) 
      month = '0' + month;
  if (day.length < 2) 
      day = '0' + day;

  return `${day}-${month}-${year}`;
}

router.post(
  "/schedule",
  asyncHandler(async (req, res) => {
  const { userId } = req.body;
  var user = await req.db.collection("users").findOne({ _id: userId });
  if(!user.priorities_dbid || !user.todo_dbid || !user.schedule_dbid || !user.jobs_dbid || !user.courses_dbid || !user.recurring_dbid || !user.personal_dbid || !user.routine_dbid || !user.sports_dbid || !user.lecture_notes_dbid || !user.job_tasks_dbid) {
    output = await update_notion_dbids(req, userId, user.notion_access_token, user.parent_id);
    console.log(output);
  }
  // refetch the user
  user = await req.db.collection("users").findOne({ _id: userId });
  const date = getFormattedDate();
  const response = await axios.post(
    process.env.LAMBDA_SCHEDULE_URL,
    {
      "date": date,
      "time_zone": user.timezone, 
      "user_data": {
          "uid": user._id,
          "access_token": user.notion_access_token,
          "IOS_USER": user.ios_email,
          "IOS_PASSWORD": user.ios_password,
          "priorities_dbid": user.priorities_dbid,
          "todo_dbid": user.todo_dbid,
          "schedule_dbid": user.schedule_dbid,
          "jobs_dbid": user.jobs_dbid,
          "courses_dbid": user.courses_dbid,
          "recurring_dbid": user.recurring_dbid,
          "personal_dbid": user.personal_dbid,
          "routine_dbid": user.routine_dbid,
          "sports_dbid": user.sports_dbid,
          "lecture_notes_dbid": user.lecture_notes_dbid,
          "job_tasks_dbid": user.job_tasks_dbid,
          "email": user.email,
      }
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  console.log(response);
  if(response.data == 'Success!') {
    res.json({ success: true, message: "Success!" });
  }else{
    return res.status(400).json({ success: false, message: response.data.message });
  }
}));

// Confirm the code
router.post(
  "/confirm-code",
  asyncHandler(async (req, res) => {
    const { crypted_email, confirm_code } = req.body;
    const email = Decipher(crypted_email);
    if (!email || !confirm_code) {
      return res
        .status(400)
        .json({ success: false, message: "Missing email or code" });
    }
    try {
      if (await verifyCode(email, confirm_code)) {
        res
          .status(200)
          .json({ success: true, message: "Code confirmed successfully" });
      } else {
        res.status(400).json({ success: false, message: "Invalid code" });
      }
    } catch (error) {
      res.status(500).json({ success: false, message: "Server error" });
    }
  })
);

module.exports = router;
