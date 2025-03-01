const express = require("express");
const app = express();
let errorcount = 0;

app.get("/user", function (req, res) {
  throw new Error("error");
  res.status(200).json({ name: "john" });
});

app.get("/errorcount", function (req, res) {
  res.status(200).json({ errorcount });
});

// error handling middleware(when error will come it will be passed to this)
app.use(function (err, req, res, next) {
  res.status(404).send({});
  errorcount++;
});

app.listen(3000);
