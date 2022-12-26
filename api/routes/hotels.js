const express = require("express");

const router = express.Router();
// const Hotel = require("../models/hotel");
const {
  createHotels,
  updateHotel,
  deleteHotel,
  getOneHotel,
  getAllHotel,
} = require("../controllers/hotel");
const { verifyAdmin } = require("../utils/verifyToken");

// Create Hotels
router.post("/", verifyAdmin, createHotels);

// Update Hotels
router.put("/:id", verifyAdmin, updateHotel);

// Delete Hotels
router.delete("/:id", verifyAdmin, deleteHotel);

// Get One Hotels
router.get("/:id", getOneHotel);

// Get All Hotels
router.get("/", getAllHotel);

module.exports = router;
