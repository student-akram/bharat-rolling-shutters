const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
    name: { type: String, required: true },
    location: { type: String, required: true },
    type: { type: String, required: true },  // new / repair / both
    count: { type: Number, required: true },
    rating: { type: Number, required: true }, // star rating
    message: { type: String, default: "" },   // optional
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Review", reviewSchema);
