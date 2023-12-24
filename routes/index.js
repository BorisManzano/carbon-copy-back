const express = require("express");
const router = express.Router();
const users = require("./users");

router.get("/", (req, res) => {
  res.send("hello");
});

// router.use("/users", users);
router.use("/", (req, res) => res.sendStatus(404));

module.exports = router;
