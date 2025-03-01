const express = require("express");
const app = express();

// route handlers
// /route
// for GET methodes
app.get("/", function (req, res) {
  res.send("Hello World");
});

app.get("/name", function (req, res) {
  res.send("Hello World from sudipta");
});

app.listen(3000); // port it listens to
