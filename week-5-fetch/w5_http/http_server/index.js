const express = require("express");
const app = express();

app.get("/add", function (req, res) {
  let a = parseInt(req.query.a);
  let b = parseInt(req.query.b);
  let sum = a + b;
  res.json({ Result: sum });
});

app.get("/multiply", function (req, res) {
  let a = parseInt(req.query.a);
  let b = parseInt(req.query.b);
  let s = a * b;
  res.json({ Result: s });
});

app.get("/divide", function (req, res) {
  let a = parseInt(req.query.a);
  let b = parseInt(req.query.b);
  let s = a / b;
  res.json({ Result: s });
});

app.get("/substract", function (req, res) {
  let a = parseInt(req.query.a);
  let b = parseInt(req.query.b);
  let s = a - b;
  res.json({ Result: s });
});

app.listen(3002);
