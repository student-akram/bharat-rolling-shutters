const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const reviewRoutes = require("./routes/reviewRoutes");
const mediaRoutes = require("./routes/mediaRoutes");



const app = express();

app.use(cors());
app.use(express.json());



// MONGODB CONNECTION
mongoose.connect("mongodb+srv://bharatUser:Bharat123@cluster0.58wq6co.mongodb.net/BharatShuttersDB?retryWrites=true&w=majority")
.then(() => console.log("✅ MongoDB Atlas Connected Successfully"))
.catch((err) => console.log("❌ MongoDB Connection Error:", err));

// Test route
app.get("/", (req, res) => {
    res.send("Backend Working & MongoDB Connected!");
});
app.use("/reviews", reviewRoutes);
app.use("/media", mediaRoutes);



app.listen(1000, () => {
    console.log("🚀 Server running on http://localhost:1000");
});
