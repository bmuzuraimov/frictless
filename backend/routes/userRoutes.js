const express = require("express");
const router = express.Router();
const { withDB, ObjectId } = require("@/config/mongodb");
const { isUser } = require("@/utils/auth");
const { Encipher, Decipher } = require("@/utils/cipherman");
const { validateIOS } = require("@/utils/validations");
const { asyncHandler, NotFoundError } = require("@/utils/error_handler");
router.use(withDB);

router.post(
  "/calendar/apple",
  isUser,
  validateIOS,
  asyncHandler(async (req, res) => {
    const { userId, ios_email, ios_password } = req.body;
    if (!ObjectId.isValid(userId)) {
      throw new BadRequestError("Invalid user ID");
    }
    const result = await req.db
      .collection("users")
      .updateOne(
        { _id: new ObjectId(userId) },
        { $set: { ios_email: Encipher(ios_email), ios_password: Encipher(ios_password) } }
      );
    if (result.modifiedCount == 1 || result.matchedCount == 1) {
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
    if (!userId && !ObjectId.isValid(userId)) {
      throw new BadRequestError("Missing user ID");
    }
    const user = await req.db
      .collection("users")
      .findOne({ _id: new ObjectId(userId) });
    if (!user) {
      throw new NotFoundError("User not found!");
    }
    const ios_email = user.ios_email ? Decipher(user.ios_email) : '';
    res.json({ success: true, ios_email: ios_email });
  })
);

module.exports = router;
