const express = require("express");
const router = express.Router();
const bcryptjs = require("bcryptjs");
const { withDB } = require("@/config/mongodb");
const { generateToken, isUser } = require("@/utils/auth");
const { asyncHandler, AuthenticationError, ValidationError } = require("@/utils/error_handler");
const { validateLogin, validateSignup } = require("@/utils/validations");
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
    const token = generateToken({
      userId: user._id,
      name: user.name,
      ios_userId: Encipher(user._id.toString()),
      picture: user.picture,
      locale: user.locale,
      is_ios_connected: !!user.ios_email && !!user.ios_password,
      is_notion_connected: !!user.parent_id && !!user.notion_access_token,
      notion_page_url: user.parent_id
        ? "https://www.notion.so/" + user.parent_id
        : null,
      email: user.email,
    });
    res.json({ success: true, token, message: "Success!" });
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
  "/sign-up",
  validateSignup,
  asyncHandler(async (req, res) => {
    const { email, password, timezone } = req.body;
    const existingUser = await req.db.collection("users").findOne({ email });
    if (existingUser) {
      throw new AuthenticationError("User already exists!");
    }
    const encryptedPassword = await bcryptjs.hash(password, 10);
    const newUser = await req.db.collection("users").insertOne({
      email,
      password: encryptedPassword,
      name: null,
      picture: "/src/assets/images/default-profile.png",
      timezone,
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
    res.json({
      success: true,
      message: "Sign-up successful! Please confirm your email address.",
    });
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
      if (await verifyCode(email, confirm_code)) {
        await req.db
          .collection("users")
          .updateOne({ email }, { $set: { verified: true } });
        res.json({ success: true, message: "Code confirmed successfully" });
      } else {
        throw new ValidationError("Invalid code");
      }
    } catch (error) {
      throw new ValidationError("Server error");
    }
  })
);

module.exports = router;
