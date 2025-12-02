const mongoose = require("mongoose");

const mediaSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ["photo", "video"],
    required: true
  },

  url: {
    type: String,
    required: true
  },

  // ⭐ REQUIRED FIELDS (NEW)
  location: {
    type: String,
    required: true
  },

  description: {
    type: String,
    required: true
  },

  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("ProjectMedia", mediaSchema);
