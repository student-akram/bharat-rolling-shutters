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
mongoose.connect(connString, {
  serverSelectionTimeoutMS: 5000
})
.then(() => {
  console.log("✅ MongoDB Atlas Connected Successfully");
  console.log("Database:", mongoose.connection.name);
  console.log("State:", mongoose.connection.readyState);
})
.catch((err) => {
  console.error("❌ MongoDB Connection Error:", err);
  console.log("Using connection string:", maskUri(connString));
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
app.use("/reviews", reviewRoutes);
app.use("/media", mediaRoutes);

const PORT = process.env.PORT || 1000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
