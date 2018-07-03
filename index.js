const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("Simple blog application index page");
});

app.listen(5000, () => {
  console.log("Listening on port 5000");
});
