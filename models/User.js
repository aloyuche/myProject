const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, required: true },
  name: { type: String, required: true },
  name: { type: String, required: true },
  name: { type: String, required: true },
  name: { type: String, required: true },
  name: { type: String, required: true },
});

module.exports = mongoose.model("User", userSchema);
