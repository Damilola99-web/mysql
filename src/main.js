require("dotenv").config();
const express = require("express");
const userRoutes = require("./auth/routes/user.routes");
const app = express();

const pool = require("./db/db");

const port = process.env.PORT || 8000;

// middleware
app.use(express.json());

app.get("/profile", (req, res) => {
  res.send("Hello from profile");
});

app.use("/api/users", userRoutes);

// 404 middleware

// error handling middleware
app.use((err, req, res, next) => {
  res
    .status(500)
    .json({ message: `🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥 + ${err.message}` });
});

app.listen(port, () => {
  console.log(`Server is running on port 🚀🚀🚀🚀🚀🚀 ${port}`);
});
