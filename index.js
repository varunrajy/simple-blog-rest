const express = require("express");
const app = express();
const mongoose = require("mongoose");

const PORT = process.env.PORT || 5000;

mongoose.connect("");

app.get("/", (req, res) => {
  res.send("Simple blog application index page");
});

app.listen(PORT, () => {
  console.log("Listening on port 5000");
});
