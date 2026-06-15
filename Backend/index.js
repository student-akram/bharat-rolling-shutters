console.log("RUNNING FILE:", __filename);
console.log("WORKING DIR:", process.cwd());
require('dotenv').config(); // load .env as early as possible

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const reviewRoutes = require("./routes/reviewRoutes");
const mediaRoutes = require("./routes/mediaRoutes");

const app = express();

app.use(cors());
app.use(express.json());

const DEFAULT_CONN = "mongodb+srv://bharatUser:Bharat123@cluster0.58wq6co.mongodb.net/BharatShuttersDB?retryWrites=true&w=majority";
const connString = process.env.MONGODB_URI || DEFAULT_CONN;

if (!process.env.MONGODB_URI) {
  console.warn('⚠️ Warning: `MONGODB_URI` not set in environment; using built-in default string.');
}

function maskUri(uri) {
  try {
    return uri.replace(/(\/\/).*@/, '$1***@');
  } catch (e) {
    return '***';
  }
}

// MONGODB CONNECTION
// Note: recent Mongoose / MongoDB driver versions no longer accept
// `useNewUrlParser` / `useUnifiedTopology` options; pass no deprecated options.
mongoose.connect(connString)
.then(() => {
  console.log("✅ MongoDB Connected");
  console.log("DB:", mongoose.connection.name);
})
.catch((err) => {
  console.error("❌ MongoDB FAILED");
  console.error(err);
});

mongoose.connection.on('connected', () => {
  console.log('🟢 Mongoose connected');
});

mongoose.connection.on('error', (err) => {
  console.error('🔴 MongoDB connection error:', err);
});

mongoose.connection.on('disconnected', () => {
  console.warn('🟡 MongoDB disconnected');
});
// Test route
app.get("/", (req, res) => {
  res.send("Backend Working & MongoDB Connected!");
});
app.get("/test123", (req, res) => {
  res.send("INDEX ROUTE WORKING");
});
console.log("Mounting review routes...");
app.use("/reviews", reviewRoutes);
console.log("Review routes mounted");
app.use("/media", mediaRoutes);


const PORT = process.env.PORT || 1000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
