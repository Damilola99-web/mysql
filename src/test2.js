const express = require("express");
const mongoose = require("mongoose");

// Connect to MongoDB
mongoose.connect("mongodb://127.0.0.1/mydb", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define a Mongoose schema for the data model
const DataSchema = new mongoose.Schema({
  value: Number,
});

// Define a Mongoose model for the data
const DataModel = mongoose.model("Data", DataSchema);

// Create an Express app
const app = express();

// Route to handle the client request
app.get("/data", (req, res) => {
  // Create a new data document
  const data = new DataModel({
    value: Math.random(),
  });

  // Save the data document
  data.save().then((result) => {
    // Send the data document back to the client
    res.send(result);
  });
});

// Start the Express server
app.listen(3000, () => {
  console.log("Server started on http://localhost:3000");
});
