const express = require("express");
const router = express.Router();
const { withDB } = require("../utils/db");
const { generateToken } = require("../utils/auth");
const { asyncHandler, AuthenticationError, ValidationError } = require("../utils/error_handler");
const { generateCode, verifyCode } = require("../utils/handle_confirmation");
const { emailSender } = require("../utils/mailman");
const { Encipher, Decipher } = require("../utils/cipherman");
const bcryptjs = require("bcryptjs");
const axios = require("axios");
router.use(withDB);

router.post(
  "/login",
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
    console.log(user._id);
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

router.post(
  "/sign-up",
  asyncHandler(async (req, res) => {
    const { email, password, timezone } = req.body;
    const existingUser = await req.db.collection("users").findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists!" });
    }
    const encryptedPassword = await bcryptjs.hash(password, 10);
    const newUser = await req.db.collection("users").insertOne({
      email,
      password: encryptedPassword,
      name: null,
      picture: "@/assets/images/default-profile.png",
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
  })
);

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
