const express = require("express");
const app = express();
const mongoose = require("mongoose");
const { usermodel, todomodel } = require("./db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const JWT_KEY = "cbbxuqdu7y77";
const { z } = require("zod");
const { default: errorMap } = require("zod/locales/en.js");

mongoose.connect(
  "mongodb+srv://stark:wlp5yNz2pqVovoqU@cluster0.kds1g.mongodb.net/todo-2"
);

app.use(express.json());

function auth(req, res, next) {
  const token = req.headers.token;
  const decodedtoken = jwt.verify(token, JWT_KEY);
  if (decodedtoken) {
    req.userid = decodedtoken.id;
    next();
  } else {
    res.json("You are not Signed In !!");
  }
}

app.post("/signup", async function (req, res) {
  const requirebody = z.object({
    email: z.string().min(5).max(50).email(),
    password: z.string().min(5).max(18),
    name: z.string().min(2).max(50),
  });

  const parsedata = requirebody.safeParse(req.body);

  if (!parsedata.success) {
    res.json({ msg: "incorrect Format", error: parsedata.error });
    return;
  }

  const email = req.body.email;
  const password = req.body.password;
  const name = req.body.name;

  const hashpassword = await bcrypt.hash(password, 5);
  //Hash password before saving to database to perevent Data breach

  await usermodel.create({
    email: email,
    password: hashpassword,
    name: name,
  });
  res.json({ msg: "You are signed up !" });
});

app.post("/signin", async function (req, res) {
  const email = req.body.email;
  const password = req.body.password;
  const user = await usermodel.findOne({
    email: email,
  });
  if (user) {
    const passwordmatch = await bcrypt.compare(password, user.password);
    if (passwordmatch) {
      const token = jwt.sign({ id: user._id.toString() }, JWT_KEY);
      res.json({ token: token });
    } else {
      res.json({ msg: "Incorrect Password" });
    }
  } else {
    res.json({ msg: "User does not exists !" });
  }
});

app.post("/todo", auth, async function (req, res) {
  const userid = req.userid;
  const task = req.body.task;
  const done = req.body.done;

  await todomodel.create({
    Userid: userid,
    task: task,
    done: done,
  });
  res.json({ msg: "Task added succesfully !" });
});

app.get("/todos", auth, async function (req, res) {
  const userid = req.userid;
  const todos = await todomodel.find({ Userid: userid });
  res.json({
    todos,
  });
});

app.listen(3000);
