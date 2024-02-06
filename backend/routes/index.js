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

// Login user
router.post("/login", asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await req.db.collection("users").findOne({ email });
  if (!user) {
    return res.status(401).json({ message: "User not found!" });
  }
  if (!user.verified) {
    return res.status(401).json({ message: "Email is not verified!" });
  }
  if (password !== user.password) {
    return res.status(401).json({ message: "Wrong credentials!" });
  }
  const token = generateToken({
    userId: user._id,
    name: user.name,
    picture: user.picture,
    locale: user.locale,
    is_ios_connected: user.ios_email && user.ios_password,
    is_notion_connected: user.parent_id && user.notion_access_token,
    notion_page_url: user.parent_id ? "https://www.notion.so/" + user.parent_id : null,
    email: user.email,
  });
  res.json({ success:true, token, message: "Success!" });
}));


// Sign up user
router.post("/sign-up", asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const existingUser = await req.db.collection("users").findOne({ email });
  if (existingUser) {
    return res.status(400).json({ message: "User already exists!" });
  }
  const newUser = await req.db.collection("users").insertOne({
    email,
    password,
    name: null,
    picture: "https://cdn-icons-png.flaticon.com/512/10337/10337609.png",
    locale: "en",
    is_ios_connected: null,
    is_notion_connected: null,
    notion_page_url: null,
    verified: false,
    creationDate: new Date(),
    lastLogin: new Date(),
  });

  const confirmationCode = await generateCode(email); 
  emailSender.sendEmail(email, confirmationCode); 

  const token = generateToken({ 
    userId: newUser.insertedId,
    name: null,
    picture: null,
    locale: "en",
    is_ios_connected: null,
    is_notion_connected: null,
    notion_page_url: null,
   });
  res.json({
    success: true,
    message: "Sign-up successful! Please confirm your email address.",
    token: token,
  });
}));


router.post(
  "/auth0_signin",
  asyncHandler(async (req, res) => {
    const { email_verified, sub, timezone, ...userData } = req.body;
    if (!email_verified) {
      return res
        .status(400)
        .json({ success: false, message: "Email is not verified" });
    }
    const ip = (
      req.headers["x-forwarded-for"] ||
      req.connection.remoteAddress ||
      ""
    )
      .split(",")[0]
      .trim();
    const existingUser = await req.db.collection("users").findOne({ _id: sub });
    if (!existingUser) {
      const newUser = await req.db.collection("users").insertOne({
        _id: sub,
        ...userData,
        ip,
        timezone,
        creationDate: new Date(),
        lastLogin: new Date(),
      });
      let token = generateToken({ 
        userId: newUser.insertedId,
        name: userData.name,
        picture: userData.picture,
        locale: userData.locale,
        is_ios_connected: null,
        is_notion_connected: null,
        notion_page_url: null,
      });
      return res.json({
        success: true,
        message: "Signin successful",
        token: token,
      });
    }
    // If user exists, update their last login time
    await req.db.collection("users").updateOne(
      { _id: existingUser._id },
      { $set: { lastLogin: new Date() } } // Update the last login time
    );
    let token = generateToken({ 
      userId: existingUser._id,
      name: existingUser.name,
      picture: existingUser.picture,
      locale: existingUser.locale,
      is_ios_connected: existingUser.ios_email && existingUser.ios_password,
      is_notion_connected: existingUser.parent_id && existingUser.notion_access_token,
      notion_page_url: existingUser.parent_id ? "https://www.notion.so/" + existingUser.parent_id : null,
    });
    return res.json({
      success: true,
      message: "Signin successful",
      token: token,
    });
  })
);

router.post(
  "/notion_callback",
  asyncHandler(async (req, res) => {
    const { userId, code, redirect_uri } = req.body;
    const data = {
      grant_type: "authorization_code",
      code: code,
      redirect_uri: redirect_uri,
    };
    const response = await fetch("https://api.notion.com/v1/oauth/token", {
      method: "POST",
      headers: {
        Authorization:
          "Basic " +
          Buffer.from(
            process.env.NOTION_CLIENT_ID +
              ":" +
              process.env.NOTION_CLIENT_SECRET
          ).toString("base64"),
        "Content-Type": "application/json",
        "Notion-Version": "2022-06-28",
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
      try {
        const updateResult = await req.db
          .collection("users")
          .updateOne(
            { _id: userId },
            {
              $set: { notion_access_token: access_token, parent_id: parent_id },
            }
          );
        if (updateResult.matchedCount === 0) {
          console.warn(
            "No matching documents found to update for userId:",
            userId
          );
          return res
            .status(404)
            .json({ success: false, message: "User not found." });
        } else if (updateResult.modifiedCount === 0) {
          console.warn(
            "Document not modified, possibly already up-to-date for userId:",
            userId
          );
        }
        res.json({
          success: true,
          access_token: access_token,
          parent_id: parent_id,
          message: "Success!",
        });
      } catch (error) {
        console.error("Database Update Error:", error); // Log any error thrown during the update
        return res
          .status(500)
          .json({
            success: false,
            message: "Failed to update user information.",
          });
      }
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
      await req.db
        .collection("users")
        .updateOne({ _id: userId }, { $set: { ...filteredResults } });
      res.json({ success: true, message: "Success!", data: filteredResults });
    } catch (error) {
      console.error(error);
    }
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
    const result = await req.db
      .collection("users")
      .updateOne({ _id: userId }, { $set: { ...filteredResults } });
    return result;
  } catch (error) {
    console.error(error);
  }
}

router.get(
  "/server-time",
  asyncHandler(async (req, res) => {
    const date = new Date();
    const options = {
      timeZone: "Asia/Hong_Kong",
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    };
    const formattedDate = new Intl.DateTimeFormat("en-GB", options).format(date);
    res.json({ date: formattedDate });
  })
);

router.post(
  "/schedule",
  asyncHandler(async (req, res) => {
    const { userId } = req.body;
    var user = await req.db.collection("users").findOne({ _id: userId });
    if (
      !user.priorities_dbid ||
      !user.todo_dbid ||
      !user.schedule_dbid ||
      !user.jobs_dbid ||
      !user.courses_dbid ||
      !user.recurring_dbid ||
      !user.personal_dbid ||
      !user.routine_dbid ||
      !user.sports_dbid ||
      !user.lecture_notes_dbid ||
      !user.job_tasks_dbid
    ) {
      output = await update_notion_dbids(
        req,
        userId,
        user.notion_access_token,
        user.parent_id
      );
    }
    // refetch the user
    user = await req.db.collection("users").findOne({ _id: userId });
    const options = {
      timeZone: user.timezone,
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    };
    const date = new Intl.DateTimeFormat("en-GB", options).format(new Date());
    const response = await axios.post(
      process.env.LAMBDA_SCHEDULE_URL,
      {
        date: date,
        time_zone: user.timezone,
        user_data: {
          uid: user._id,
          access_token: user.notion_access_token,
          IOS_USER: user.ios_email,
          IOS_PASSWORD: user.ios_password,
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
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (response.data == "Success!") {
      res.json({ success: true, message: "Success!" });
    } else {
      return res
        .status(400)
        .json({ success: false, message: response.data.message });
    }
  })
);


router.post(
  "/calendar/apple",
  asyncHandler(async (req, res) => {
    const { userId, ios_email,  ios_password } = req.body;
    const result = await req.db
      .collection("users")
      .updateOne(
        { _id: userId },
        { $set: { ios_email: ios_email, ios_password: ios_password } }
      );
      if(result.modifiedCount == 1){
        res.json({ success: true, message: "Success!" });
      }else{
        res.json({ success: false, message: "Failed to update user information." });
      }
  })
);
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
        await req.db.collection("users").updateOne(
          { email },
          { $set: { verified: true } }
        );
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
