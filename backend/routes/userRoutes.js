const express = require("express");
const router = express.Router();
const { withDB, ObjectId } = require("../utils/db");
const { isUser } = require("../utils/auth");
const { asyncHandler } = require("../utils/error_handler");
const axios = require("axios");
router.use(withDB);

router.post(
  "/calendar/apple",
  isUser,
  asyncHandler(async (req, res) => {
    const { userId, ios_email, ios_password } = req.body;
    const result = await req.db
      .collection("users")
      .updateOne(
        { _id: new ObjectId(userId) },
        { $set: { ios_email: ios_email, ios_password: ios_password } }
      );
    console.log(result);
    if (result.modifiedCount == 1) {
      res.json({ success: true, message: "Success!" });
    } else {
      res.json({
        success: false,
        message: "Failed to update user information.",
      });
    }
  })
);

router.get(
  "/calendar/apple",
  isUser,
  asyncHandler(async (req, res) => {
    const { userId } = req.query;
    const user = await req.db
      .collection("users")
      .findOne({ _id: new ObjectId(userId) });
    if (!user) {
      return res.json({ success: false, ios_email: "" });
    }
    res.json({ success: true, ios_email: user.ios_email });
  })
);

module.exports = router;
