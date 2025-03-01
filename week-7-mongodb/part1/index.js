const express = require("express");
const { usermodel, todomodel } = require("./db");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const JWT_KEY = "jbjbxuwbxb236272su2b";
mongoose.connect(
  "mongodb+srv://stark:wlp5yNz2pqVovoqU@cluster0.kds1g.mongodb.net/todo-stark"
);
const app = express();

app.use(express.json());
app.post("/signup", async function (req, res) {
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;
  await usermodel.insertMany({
    email: email,
    password: password,
    name: name,
  });
  res.json({ msg: "You are logged in" });
});

function auth(req, res, next) {
  const token = req.headers.token;
  const decodedtoken = jwt.verify(token, JWT_KEY);
  console.log(decodedtoken);

  if (decodedtoken) {
    req.userid = decodedtoken.userid;
    next();
  } else {
    res.json({ msg: "Incorrect Creedentials !" });
  }
}

app.post("/signin", async function (req, res) {
  const email = req.body.email;
  const password = req.body.password;
  const user = await usermodel.findOne({
    email: email,
    password: password,
  });
  console.log(user);

  if (user) {
    const token = jwt.sign(
      {
        userid: user._id.toString(),
      },
      JWT_KEY
    );
    res.json({ token: token });
  } else {
    res.json({ msg: "Wrong Credentials !" });
  }
  console.log(user._id);
});

app.post("/todo", auth, function (req, res) {
  const userid = req.userid;
  res.json({
    userid: userid,
  });
});

app.get("/todos", function (req, res) {});

app.listen(3000);
