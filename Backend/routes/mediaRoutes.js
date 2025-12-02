const express = require("express");
const router = express.Router();
const ProjectMedia = require("../models/ProjectMedia");

// ADD MEDIA
router.post("/add", async (req, res) => {
  try {
    const media = await ProjectMedia.create(req.body);
    res.send({ success: true, media });
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

// GET ALL MEDIA
router.get("/all", async (req, res) => {
  try {
    const media = await ProjectMedia.find().sort({ createdAt: -1 });
    res.send(media);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

module.exports = router;
