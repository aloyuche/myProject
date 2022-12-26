const express = require("express");
const {
  createUsers,
  updateUser,
  deleteUser,
  getOneUser,
  getAllUser,
} = require("../controllers/user");
const {
  verifyToken,
  verifyUser,
  verifyAdmin,
} = require("../utils/verifyToken");

const router = express.Router();

router.get("/checkauthentication", verifyToken, (req, res, next) => {
  res.send("Hello User you are Logged in");
});

// router.get("/checkauthentication/:id", verifyToken, (req, res, next) => {
//   res.send("Hello User you are Logged in");
// });

// router.get("/checkuser/:id", verifyUser, (req, res, next) => {
//   res.send("Hello User you are Logged in and you can delete your account");
// });
// router.get("/checkadmin/:id", verifyAdmin, (req, res, next) => {
//   res.send("Hello User you are Logged in and you can delete all account");
// });

// Create Users
router.post("/", verifyUser, createUsers);

// Update Users
router.put("/:id", verifyUser, updateUser);

// Delete User
router.delete("/:id", verifyUser, deleteUser);

// Get One Users
router.get("/:id", verifyUser, getOneUser);

// Get All Users
router.get("/", verifyAdmin, getAllUser);

module.exports = router;
