const express = require("express");
const router = express.Router();
const bcryptjs = require("bcryptjs");
const { withDB } = require("@/config/mongodb");
const { generateToken, isUser } = require("@/utils/guard");
const {
  asyncHandler,
  AuthenticationError,
  ValidationError,
} = require("@/utils/error_handler");
const { validateLogin, validateRegister } = require("@/utils/validations");
const { generateCode, verifyCode } = require("@/utils/handle_confirmation");
const { emailSender } = require("@/utils/mailman");
const { Encipher, Decipher } = require("@/utils/cipherman");

// Apply the withDB middleware globally to all routes in this router
router.use(withDB);

// Login endpoint
router.post(
  "/login",
  validateLogin,
  asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const user = await req.db.collection("users").findOne({ email });
    if (!user) {
      throw new AuthenticationError("Wrong credentials!");
    }
    if (!user.verified) {
      throw new AuthenticationError("Email is not verified!");
    }
    const match = await bcryptjs.compare(password, user.password);
    if (!match) {
      throw new AuthenticationError("Wrong credentials!");
    }
    delete user.password;
    await req.db.collection("users").updateOne({ email }, { $set: { loginAt: new Date() } });
    user.ios_device.email = Decipher(user.ios_device.email);
    user.ios_device.password = Decipher(user.ios_device.password);
    const token = generateToken(user);
    res.json({ success: true, token, message: "Success!" });
  })
);

router.post(
  "/referral",
  asyncHandler(async (req, res) => {
    const { ref, timezone } = req.body;
    data = {
      ref,
      timezone,
      createdAt: new Date(),
    };
    const referral = await req.db.collection("referral").insertOne({ ...data });
    res.json({ success: true, message: "Referral code saved!" });
  })
);

// User verification endpoint
router.post(
  "/user_verify",
  isUser,
  asyncHandler(async (req, res) => {
    res.json({ success: true, message: "User is verified!" });
  })
);

// Sign-up endpoint
router.post(
  "/register",
  validateRegister,
  asyncHandler(async (req, res) => {
    const { email, password, timezone } = req.body;
    const existingUser = await req.db.collection("users").findOne({ email });
    if (existingUser) {
      throw new AuthenticationError("User already exists!");
    }
    const new_user = {
      email,
      password: await bcryptjs.hash(password, 10),
      verified: false,
      timezone,
      locale: "en",
      scope: "user",
      createdAt: new Date(),
      updatedAt: new Date(),
      loginAt: null,
      ios_device: {
        email: null,
        password: null,
        shortcut_id: null,
        connected_on: null,
        shortcutInstalledAt: null,
      },
      notion: {
        secret_key: null,
        template_id: null,
        template_url: null,
        connected_on: null,
        courses_dbid: null,
        job_tasks_dbid: null,
        jobs_dbid: null,
        lecture_notes_dbid: null,
        personal_dbid: null,
        priorities_dbid: null,
        recurring_dbid: null,
        routine_dbid: null,
        schedule_dbid: null,
        sports_dbid: null,
        todo_dbid: null,
      },
      name: null,
      picture: "/src/assets/images/user-profile.png",
    };
    const newUser = await req.db.collection("users").insertOne(new_user);
    await req.db
      .collection("users")
      .updateOne(
        { email },
        {
          $set: {
            "ios_device.shortcut_id": await Encipher(
              newUser.insertedId.toString()
            ),
          },
        }
      );
    const confirmationCode = await generateCode(email);
    await emailSender.sendEmail(email, confirmationCode);
    if (newUser.insertedId) {
      res.json({
        success: true,
        message: "Sign-up successful! Please confirm your email address.",
      });
    } else {
      throw new ValidationError("Sign-up failed!");
    }
  })
);

// Confirm code endpoint
router.post(
  "/confirm-code",
  asyncHandler(async (req, res) => {
    const { crypted_email, confirm_code } = req.body;
    const email = Decipher(crypted_email);
    if (!email || !confirm_code) {
      throw new ValidationError("Missing email or code");
    }
    try {
      const user = await req.db.collection("users").findOne({ email });
      if (user && user.verified) {
        throw new ValidationError("Email already verified");
      }
      if (await verifyCode(email, confirm_code)) {
        await req.db
          .collection("users")
          .updateOne({ email }, { $set: { verified: true } });
        res.json({ success: true, message: "Code confirmed successfully" });
      } else {
        throw new ValidationError("Invalid code");
      }
    } catch (error) {
      throw new ValidationError(error.message);
    }
  })
);

module.exports = router;
