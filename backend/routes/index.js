const express = require("express");
const router = express.Router();

router.get(
  "/server-time", (req, res) => {
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
  }
);

module.exports = router;
