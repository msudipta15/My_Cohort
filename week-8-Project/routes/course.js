const { Router } = require("express");
const courserouter = Router();
const { coursemodel, purchasemodel } = require("../db");
const { userauth } = require("../middlewares/userauth");

courserouter.post("/purchase", async function (req, res) {
  const userid = req.id;
  const courseid = req.body.courseid;
  await purchasemodel.create({
    userid: userid,
    courseid: courseid,
  });
  res.json({ msg: "purchase succesfull" });
});

courserouter.get("/allcourse", async function (req, res) {
  const courses = await coursemodel.find({});
  res.json({ courses });
});

module.exports = {
  courserouter: courserouter,
};
