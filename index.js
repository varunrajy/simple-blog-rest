const express = require("express");
const app = express();
const mongoose = require("mongoose");

app.get("/", (req, res) => {
  res.send("Simple blog application index page");
});

app.listen(5000, () => {
  console.log("Listening on port 5000");
});
