const express = require("express");

const router = express.Router();

const {
  createRooms,
  updateRoom,
  deleteRoom,
  getOneRoom,
  getAllRooms,
} = require("../controllers/rooms");
const { verifyAdmin } = require("../utils/verifyToken");

// Create Rooms
router.post("/:hotelId", verifyAdmin, createRooms);

// Update Rooms
router.put("/:id", verifyAdmin, updateRoom);

// Delete Rooms
router.delete("/:id/:hotelId", verifyAdmin, deleteRoom);

// Get One Rooms
router.get("/:id", getOneRoom);

// Get All Rooms
router.get("/", getAllRooms);

module.exports = router;
