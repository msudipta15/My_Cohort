const express = require("express");
const app = express();

let numberofrequest = 0;

function middleware(req, res, next) {
  numberofrequest++;
  console.log(`number of request : ${numberofrequest}`);
  let url = req.url;
  console.log(url);
}

app.get("/sum", middleware, function (req, res) {
  const a = req.query.a;
  const b = req.query.b;
  res.json({ result: a + b });
});

app.listen(3000);
