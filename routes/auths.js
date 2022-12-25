const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("This is Auth");
});

router.get("/register", (req, res) => {
  res.send("This is Register");
});

module.exports = router;
