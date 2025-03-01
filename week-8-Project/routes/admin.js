const { Router } = require("express");
const adminroutes = Router();
const { coursemodel, adminmodel } = require("../db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const JWT_KEY_Admin = "jdbduwuw7yw7";
const { z } = require("zod");
const { adminauth } = require("../middlewares/adminauth");
const course = require("./course");

adminroutes.post("/signup", async function (req, res) {
  const adminbody = z.object({
    email: z.string().min(4).max(50),
    password: z.string().min(8).max(50),
    firstname: z.string().min(1).max(100),
    lastname: z.string().min(1).max(100),
  });
  const parsedata = adminbody.safeParse(req.body);

  if (!parsedata.success) {
    res.json({ msg: "Invalid input", error: parsedata.error });
    return;
  }
  const { email, password, firstname, lastname } = req.body;

  const hashpassword = await bcrypt.hash(password, 5);

  await adminmodel.create({
    email,
    password: hashpassword,
    firstname,
    lastname,
  });

  res.json({ msg: "You are signed up !" });
});

adminroutes.post("/signin", async function (req, res) {
  const { email, password } = req.body;
  const admin = await adminmodel.findOne({ email: email });
  if (admin) {
    const verify = bcrypt.compare(admin.password, password);
    if (verify) {
      const token = jwt.sign({ id: admin._id.toString() }, JWT_KEY_Admin);
      res.json({ token: token });
    } else {
      res.status(403).json({ msg: "Invalid Password" });
    }
  } else {
    res.status(403).json({ msg: "Invalid email" });
  }
});

adminroutes.post("/addcourse", adminauth, async function (req, res) {
  const { title, cost, about, imageurl } = req.body;
  const adminid = req.id;
  const course = await coursemodel.create({
    title,
    cost,
    about,
    imageurl,
    creatorid: adminid,
  });

  res.json({ msg: "Course created Succesfully !", courseid: course._id });
});

adminroutes.put("/updatecourse", adminauth, async function (req, res) {
  const adminid = req.id;
  const { title, cost, about, imageurl, courseid } = req.body;

  const valid = await coursemodel.findOne({
    creatorid: adminid,
    _id: courseid,
  });
  console.log(adminid);

  if (valid) {
    await coursemodel.updateOne(
      {
        creatorid: adminid,
        _id: courseid,
      },
      { title: title, about: about, cost: cost, imageurl: imageurl }
    );
    res.json({ msg: "Succesfully edited the course !" });
  } else {
    res.json({ msg: "Unauthorized Access !" });
  }
});

adminroutes.get("/allcourses", adminauth, async function (req, res) {
  const adminid = req.id;
  const courses = await coursemodel.find({ creatorid: adminid });
  res.json({ courses });
});

module.exports = {
  adminroutes: adminroutes,
};
