const express = require("express");
const Review = require("../models/Review");
const router = express.Router();

// POST - Add new review
router.post("/add", async (req, res) => {
    console.log("🔥 /reviews/add hit", req.body);  
    try {
        const review = await Review.create(req.body);
        res.send({ success: true, review });
    } catch (err) {
        console.log(err);
        res.status(500).send({ success: false, error: err });
    }
});

// GET - Fetch all reviews
router.get("/all", async (req, res) => {
    console.log("🔥 /reviews/all hit");
    try {
        const reviews = await Review.find().sort({ createdAt: -1 });
        res.send(reviews);
    } catch (err) {
        res.status(500).send(err);
    }
});

module.exports = router;
