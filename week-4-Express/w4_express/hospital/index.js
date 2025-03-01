const express = require("express");

const app = express();

const users = [
  {
    name: "john",
    kidneys: [{ healthy: false }],
  },
];

app.use(express.json());

app.get("/", function (req, res) {
  const johnkidney = users[0].kidneys;
  const numberofkidney = johnkidney.length;
  let numberofhealthykidney = 0;
  for (let i = 0; i < johnkidney.length; i++) {
    if (johnkidney[i].healthy) {
      numberofhealthykidney = numberofhealthykidney + 1;
    }
  }
  const numberofunhealthykidney = numberofkidney - numberofhealthykidney;
  res.json({
    numberofkidney,
    numberofhealthykidney,
    numberofunhealthykidney,
  });
});
// adding unhealthy kidneys
app.post("/", function (req, res) {
  const ishealthy = req.body.ishealthy;
  users[0].kidneys.push({
    healthy: ishealthy,
  });
  res.json({
    msg: "Kidney Added !",
  });
});
// making all kidneys healthy
app.put("/", function (req, res) {
  for (let i = 0; i < users[0].kidneys.length; i++) {
    users[0].kidneys[i].healthy = true;
  }
  res.json({ msg: "Modified !" });
});
// removing all the unhealthy kidneys
app.delete("/", function (req, res) {
  const newkidneys = [];
  for (let i = 0; i < users[0].kidneys.length; i++) {
    if (users[0].kidneys[i].healthy) {
      newkidneys.push({ healthy: true });
    }
  }
  users[0].kidneys = newkidneys;
  res.json({ msg: "done!" });
});

// we can also send status code for specific conditions . res.status(code)

app.listen(3001);
