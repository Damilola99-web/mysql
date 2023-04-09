require("dotenv").config();
const express = require("express");
const userRoutes = require("./auth/routes/user.routes");
const app = express();
const logger = require("./log/logger");
const pool = require("./db/db");

const port = process.env.PORT || 8000;

// middleware
app.use(express.json());

app.get("/profile", (req, res) => {
  res.send("Hello from profile");
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

app.listen(port, () => {
  logger.info(`Server is running on port ${port}`);
});


