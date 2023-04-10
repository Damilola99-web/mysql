// Import dependencies
const express = require("express");
const mysql = require("mysql");
const redis = require("redis");

// Create a MySQL connection pool
const mysqlPool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "Bassguitar1",
  database: "revamp",
});

// Create a Redis client
const redisClient = redis.createClient();

// Create an Express app
const app = express();
app.use(express.json());

// Publish a message to Redis
app.post("/publish", (req, res) => {
  const { channel, message } = req.body;
  redisClient.publish(channel, message, (err, result) => {
    if (err) {
      console.error("Error publishing message to Redis:", err);
      return res
        .status(500)
        .json({ error: "Failed to publish message to Redis" });
    }
    console.log(`Published message to channel "${channel}": ${message}`);
    res.json({ status: "success" });
  });
});

// Subscribe to a Redis channel
app.post("/subscribe", (req, res) => {
  const { channel } = req.body;
  const subscriber = redis.createClient();

  subscriber.subscribe(channel);

  subscriber.on("message", (ch, msg) => {
    console.log(`Received message from channel "${ch}": ${msg}`);
    // Process the received message, e.g., send it to the client via WebSocket
  });

  res.json({ status: "success" });
});

// Start the Express app
const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
