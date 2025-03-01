const express = require("express");
const app = express();
let requestcount = 0;

//create a global middleware using app.use() which will maintain
//the count of the number of requests made to the server in the global
//request count variable

app.use(function (req, res, next) {
  requestcount++;
  next();
});

app.get("/user", function (req, res) {
  res.status(200).json({ name: "john" });
});

app.post("/user", function (req, res) {
  res.status(200).json({ msg: "created a dummy user !" });
});

app.get("/requestcount", function (req, res) {
  res.status(200).json({ requestcount });
});

app.listen(3000);
