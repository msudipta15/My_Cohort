const express = require("express");
const app = express();

//middleware check for conditions

//create a middleware to check for age

function agecheckmiddleware(req, res, next) {
  const age = req.query.age;
  if (age > 16) {
    next();
  } else {
    res.json({ msg: "You are not Old enough !" });
  }
}

// we can also use app.use(middleware) and it will be effective for all the below get requests

app.get("/ride", agecheckmiddleware, function (req, res) {
  res.json({ msg: "Ride Succesfull !!" });
});

app.listen(3000);
