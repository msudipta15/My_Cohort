const express = require("express");
const app = express();

//create a global middleware to rate limit the requests from a user to
//only 5 request per second. if a user sends more than 5 requests in 1 sec
//the server should block them with a 404. user will be sending their userid
//in the header as 'user-id'

let numberofrequest = {};
setInterval(() => {
  numberofrequest = {};
}, 1000); // every 1 sec the numberofrequest reset to 0

app.use(function (req, res, next) {
  const userid = req.headers["user-id"];
  if (numberofrequest[userid]) {
    numberofrequest[userid]++;
    if (numberofrequest[userid] > 5) {
      res.status(404).send("no entry !!");
    } else {
      next();
    }
  } else {
    numberofrequest[userid] = 1;
    next();
  }
});

app.get("/", function (re1, res) {
  res.send("Ok");
});

app.listen(3000);
