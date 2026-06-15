const express = require("express");
const Review = require("../models/Review");
console.log("✅ reviewRoutes.js loaded");
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
        console.log("Model Name:", Review.modelName);

        const count = await Review.countDocuments();

        console.log("Review Count:", count);

        res.json({
            success: true,
            count
        });

    } catch (err) {
        console.error("REVIEWS ERROR:", err);

        res.status(500).json({
            success: false,
            message: err.message
        });
    }
});
router.get("/test-reviews", async (req, res) => {
    try {
        console.log("TEST ROUTE HIT");

        console.log("readyState:", require("mongoose").connection.readyState);

        const count = await Review.countDocuments();

        res.json({
            success: true,
            count
        });

    } catch (err) {
        console.error("TEST ERROR:", err);

        res.status(500).json({
            success: false,
            message: err.message
        });
    }
});
module.exports = router;
