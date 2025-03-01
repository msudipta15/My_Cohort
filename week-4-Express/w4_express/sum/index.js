const express = require("express");

const app = express();

function sum(n) {
  s = 0;
  for (i = 0; i <= n; i++) {
    s = s + i;
  }
  return s;
}

app.get("/", function (req, res) {
  // req = request and res = response
  const n = req.query.n;
  // in browser to put value of n : after / put ?n = value
  // localhost/3000/?n=5
  const ans = sum(n);
  res.send(`Sum of the numbers till ${n} is ${ans}`);
});

app.listen(3000);
