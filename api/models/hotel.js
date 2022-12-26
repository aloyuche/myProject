const mongoose = require("mongoose");

const hotelSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    type: { type: String, required: true },
    city: { type: String, required: true },
    distance: { type: String, required: true },
    photos: { type: [String] },
    title: { type: String, required: true },
    description: { type: String, required: true },
    rating: { type: Number, min: 0, max: 5 },
    rooms: { type: [String] },
    price: { type: Number, default: 0 },
    featured: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Hotel", hotelSchema);
