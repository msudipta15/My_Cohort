const { Router } = require("express");
const userrouter = Router();
const { coursemodel, purchasemodel, usermodel } = require("../db");
const { z } = require("zod");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const JWT_KEY = "se3retk3y21uh8";
const { userauth } = require("../middlewares/userauth");

userrouter.post("/signup", async function (req, res) {
  const userbody = z.object({
    email: z.string().min(4).max(50),
    password: z.string().min(8).max(50),
    firstname: z.string().min(1).max(100),
    lastname: z.string().min(1).max(100),
  });
  const parsedata = userbody.safeParse(req.body);

  if (!parsedata.success) {
    res.json({ msg: "Invalid input", error: parsedata.error });
    return;
  }
  const { email, password, firstname, lastname } = req.body;

  const hashpassword = await bcrypt.hash(password, 5);

  await usermodel.create({
    email,
    password: hashpassword,
    firstname,
    lastname,
  });

  res.json({ msg: "You are sugned up !" });
});

userrouter.post("/signin", async function (req, res) {
  const { email, password } = req.body;
  const user = await usermodel.findOne({ email: email });
  if (user) {
    const verify = bcrypt.compare(user.password, password);
    if (verify) {
      const token = jwt.sign({ id: user._id.toString() }, JWT_KEY);
      res.json({ token: token });
    } else {
      res.json({ msg: "Incorrect Password" });
    }
  } else {
    res.json({ msg: "Invalid email" });
  }
});

// Confusion
userrouter.get("/purchases", userauth, async function (req, res) {
  const userid = req.id;
  const purchases = purchasemodel.find({
    userid: userid,
  });
  const coursedata = await coursemodel.find({
    _id: { $in: purchases.map((x) => x.courseid) },
  });

  res.json({ purchases, coursedata });
});

module.exports = { userrouter: userrouter };
