require("dotenv").config();
const express = require("express");
const userRoutes = require("./auth/routes/user.routes");
const app = express();
const logger = require("./log/logger");
const pool = require("./db/db");

const port = process.env.PORT || 8000;

// middleware
app.use(express.json({ limit: "10kb" }));

app.use((req, res, next) => {
  logger.info(`${req.method} ${req.originalUrl}`);
  next();
});

app.get("/", (req, res) => {
  res.send("💸💸 Welcome to the Money App 💸💸");
});

app.use("/api/users", userRoutes);

// 404 middleware
app.use((req, res, next) => {
  res.status(404).json({
    message: `🔥🔥 404 Not Found 🔥🔥`,
  });
});

// error handling middleware
app.use((err, req, res, next) => {
  console.log(err.stack);
  res.status(500).json({ message: `🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥 + ${err.stack}` });
});

// handle unhandled exceptions e.g if your port is already in use
process.on("uncaughtException", (err, origin) => {
  logger.error(`🔥� Uncaught Exception 🔥� ${err.stack}`);
  process.exit(1);
});

// handle unhandled promise rejections
process.on("unhandledRejection", (err, origin) => {
  logger.error(`🔥� Unhandled Rejection 🔥� ${err.stack}`);
  process.exit(1);
});

const server = app.listen(port, () => {
  logger.info(`Server is running on port ${port}`);
});

// shut down the server gracefully
process.on("SIGTERM", () => {
  logger.info("🔥� SIGTERM RECEIVED. Shutting down gracefully 🔥�");
  server.close(() => {
    logger.info("💥 Process terminated!");
  });
});
