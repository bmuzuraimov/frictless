const express = require("express");
const router = express.Router();
const { withDB, ObjectId } = require("@/config/mongodb");
const { isUser } = require("@/utils/guard");
const { Encipher, Decipher } = require("@/utils/cipherman");
const { validateIOS } = require("@/utils/validations");
const { asyncHandler, NotFoundError } = require("@/utils/error_handler");
router.use(withDB);

// Create a new user
router.post(
  "/",
  asyncHandler(async (req, res) => {
    const { name, email } = req.body;
    const result = await req.db.collection("users").insertOne({ name, email });
    if (result.insertedId) {
      res.json({ success: true, message: "User created successfully!" });
    } else {
      res.json({ success: false, message: "Failed to create user." });
    }
  })
);

// Read all users
router.get(
  "/",
  asyncHandler(async (req, res) => {
    const users = await req.db.collection("users").find().toArray();
    res.json({ success: true, users });
  })
);

// Read a single user
router.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    if (!ObjectId.isValid(id)) {
      throw new BadRequestError("Invalid user ID");
    }
    const user = await req.db.collection("users").findOne({ _id: new ObjectId(id) });
    if (!user) {
      throw new NotFoundError("User not found!");
    }
    res.json({ success: true, user });
  })
);

// Update a user
router.put(
  "/:id",
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { name, email } = req.body;
    if (!ObjectId.isValid(id)) {
      throw new BadRequestError("Invalid user ID");
    }
    const result = await req.db.collection("users").updateOne(
      { _id: new ObjectId(id) },
      { $set: { name, email } }
    );
    if (result.modifiedCount == 1 || result.matchedCount == 1) {
      res.json({ success: true, message: "User updated successfully!" });
    } else {
      res.json({ success: false, message: "Failed to update user." });
    }
  })
);

// Delete a user
router.delete(
  "/:id",
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    if (!ObjectId.isValid(id)) {
      throw new BadRequestError("Invalid user ID");
    }
    const result = await req.db.collection("users").deleteOne({ _id: new ObjectId(id) });
    if (result.deletedCount == 1) {
      res.json({ success: true, message: "User deleted successfully!" });
    } else {
      res.json({ success: false, message: "Failed to delete user." });
    }
  })
);

router.post(
  "/waitlist",
  asyncHandler(async (req, res) => {
    const { email } = req.body;
    console.log(req.body)
    const result = await req.db
      .collection("waitlist").insertOne({ 
        email,
        created_at: new Date()
      });
    if (result.insertedId) {
      res.json({ success: true, message: "Success!" });
    }else{
      res.json({ success: false, message: "Failed!" });
    }
  })
);

router.post(
  "/calendar/ios",
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
        { $set: { 'ios_device.email': Encipher(ios_email), 'ios_device.password': Encipher(ios_password), 'ios_device.connected_on': new Date() } }
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
