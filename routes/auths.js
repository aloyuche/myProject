const express = require("express");

const router = express.Router();
const Hotel = require("../models/hotel");

// Create Hotels
router.post("/", async (req, res) => {
  const newHotel = new Hotel(req.body);
  try {
    const savedHotel = await newHotel.save();
    res.status(200).json(savedHotel);
  } catch (error) {
    res.status(500).json(error);
  }
});

// Update Hotels
router.post("/:id", async (req, res) => {
  try {
    const hotel = await Hotel.findByIdAndUpdate(
      req.params.id,
      { set: req.body },
      { new: true }
    );
    res.status(200).json(hotel);
  } catch (error) {
    res.status(500).json(error);
  }
});

// Delete Hotels
router.delete("/:id", async (req, res) => {
  try {
    await Hotel.findByIdAndUpdate(req.params.id);
    res.status(200).json("Hotel Deleted Successfully");
  } catch (error) {
    res.status(500).json(error);
  }
});

// Get One Hotels
router.get("/:id", async (req, res) => {
  try {
    const hotel = new Hotel.findById(req.params.id);
    res.status(200).json(hotel);
  } catch (error) {
    res.status(500).json(error);
  }
});

// Get All Hotels
router.post("/", async (req, res) => {
  try {
    const hotels = new Hotel.findById();
    res.status(200).json(hotels);
  } catch (error) {
    res.status(500).json(error);
  }
});
