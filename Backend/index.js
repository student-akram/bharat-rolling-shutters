require('dotenv').config(); // load .env as early as possible

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const reviewRoutes = require("./routes/reviewRoutes");
const mediaRoutes = require("./routes/mediaRoutes");

const app = express();

// Simple request logging for debugging in deployed environments
app.use((req, res, next) => {
  console.log(`➡️ ${req.method} ${req.path}`);
  next();
});

// CORS configuration
// If `CORS_ORIGIN` is set it will be used as the allowed origin and
// credentials will be allowed. Otherwise we fall back to open public CORS
// (no credentials) to avoid wildcard + credentials conflicts.
const corsOrigin = process.env.CORS_ORIGIN || '*';
const allowCredentials = !!process.env.CORS_ORIGIN; // true only when a specific origin is provided
const corsOptions = {
  origin: corsOrigin,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS', 'HEAD'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Accept', 'Origin', 'X-Requested-With'],
  exposedHeaders: ['Content-Range', 'X-Total-Count'],
  credentials: allowCredentials,
  maxAge: 86400, // cache preflight for 24 hours
};

app.use(cors(corsOptions));
// Explicitly handle OPTIONS (preflight) requests without relying on
// a wildcard route pattern which may be rejected by path-to-regexp.
app.use((req, res, next) => {
  if (req.method !== 'OPTIONS') return next();
  // Set CORS preflight response headers
  res.setHeader('Access-Control-Allow-Origin', corsOrigin);
  res.setHeader('Access-Control-Allow-Methods', corsOptions.methods.join(','));
  res.setHeader('Access-Control-Allow-Headers', corsOptions.allowedHeaders.join(','));
  if (allowCredentials) res.setHeader('Access-Control-Allow-Credentials', 'true');
  if (corsOptions.exposedHeaders && corsOptions.exposedHeaders.length) {
    res.setHeader('Access-Control-Expose-Headers', corsOptions.exposedHeaders.join(','));
  }
  res.setHeader('Access-Control-Max-Age', String(corsOptions.maxAge || 0));
  return res.sendStatus(204);
});

app.use(express.json());

const connString = process.env.MONGODB_URI;
const FAIL_ON_DB_CONNECT = process.env.FAIL_ON_DB_CONNECT !== 'false';

if (!connString) {
  console.error('❌ CRITICAL: `MONGODB_URI` environment variable is required but not set.');
  process.exit(1);
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
  .then(() => console.log("✅ MongoDB Atlas Connected Successfully"))
  .catch((err) => {
    console.error("❌ MongoDB Connection Error:", err && err.message ? err.message : err);
    console.error("Full error:", err);
    console.log("Using connection string:", maskUri(connString));
    if (err && err.message && /authentication|auth/i.test(err.message)) {
      console.error('Hint: Authentication failed. Check DB user, password and database name.');
    }
    if (err && err.message && /getaddrinfo|ENOTFOUND|ECONNREFUSED|DNS/i.test(err.message)) {
      console.error('Hint: DNS or network error. Check network, firewall or try a non-SRV connection string.');
    }
    if (FAIL_ON_DB_CONNECT) {
      console.error('FAIL_ON_DB_CONNECT is true — exiting process so deploy tooling can restart or fail fast.');
      process.exit(1);
    }
  });

mongoose.connection.on('error', (err) => {
  console.error('MongoDB connection error (event):', err);
});
mongoose.connection.on('disconnected', () => {
  console.warn('MongoDB disconnected.');
});

// Healthcheck: useful for monitoring and for verifying DB connectivity on deploy
app.get('/health', (req, res) => {
  const dbState = mongoose.connection.readyState; // 0 = disconnected, 1 = connected
  const healthy = dbState === 1;
  res.status(healthy ? 200 : 503).json({
    uptime: process.uptime(),
    healthy,
    dbState,
    env: process.env.NODE_ENV || 'development'
  });
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

// Global error handler (express)
app.use((err, req, res, next) => {
  console.error('Unhandled request error:', err && err.stack ? err.stack : err);
  res.status(err && err.status ? err.status : 500).json({ success: false, message: err && err.message ? err.message : 'Internal Server Error' });
});

// Fail-fast on unhandled rejections/uncaught exceptions so deploy systems can restart.
process.on('uncaughtException', (err) => {
  console.error('UNCAUGHT EXCEPTION:', err);
  // Immediate exit allows process manager (pm2 / docker / heroku) to restart the app.
  process.exit(1);
});
process.on('unhandledRejection', (reason, promise) => {
  console.error('UNHANDLED REJECTION at:', promise, 'reason:', reason);
  process.exit(1);
});
