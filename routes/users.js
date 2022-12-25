const express = require("express");

const router = express.Router();
const User = require("../models/User");

// Create Users
router.post("/", async (req, res) => {
  const newUser = new User(req.body);
  try {
    const savedUser = await newUser.save();
    res.status(200).json(savedUser);
  } catch (error) {
    res.status(500).json(error);
  }
});

// Update Users
router.put("/:id", async (req, res) => {
  try {
    const users = await User.findByIdAndUpdate(
      req.params.id,
      { set: req.body },
      { new: true }
    );
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json(error);
  }
});

// Delete User
router.delete("/:id", async (req, res) => {
  try {
    await User.findByIdAndUpdate(req.params.id);
    res.status(200).json("User Deleted Successfully");
  } catch (error) {
    res.status(500).json(error);
  }
});

// Get One Users
router.get("/:id", (req, res) => {
  try {
    const user = new User.findOne(req.params.id);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json(error);
  }
});

// Get All Users
router.get("/", async (req, res) => {
  try {
    const users = new User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
