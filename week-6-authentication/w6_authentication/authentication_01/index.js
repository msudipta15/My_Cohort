const express = require("express");
const jwt = require("jsonwebtoken");
const jwt_secret = "mynameissudiptailovemountains";
const app = express();
// npm install jsonwebtoken. This autometically encrypt our user info
// into token and also decrypt it when needed
app.use(express.json());

let users = [];

app.post("/signup", function (req, res) {
  const username = req.body.username;
  const password = req.body.password;
  users.push({
    username: username,
    password: password,
  });
  res.send("Signed up succesfully");
});

app.post("/signin", function (req, res) {
  const username = req.body.username;
  const password = req.body.password;
  const found = users.find((u) => {
    if (u.username === username && u.password === password) {
      return true;
    } else {
      return false;
    }
  });
  if (found) {
    const token = jwt.sign(
      {
        username: username,
      },
      jwt_secret
    );
    // it creates a token for us with username using jwt-secret that we provided

    res.json({ token: token });
  } else {
    res.send("Invalid Username or Password !");
  }
  console.log(users);
});

app.get("/me", function (req, res) {
  const token = req.headers.token;
  const decodedtoken = jwt.verify(token, jwt_secret);
  // this will return the object {username: username}

  const username = decodedtoken.username;

  let founduser = null;

  const found = users.find((u) => {
    if (u.username === username) {
      founduser = u;
    } else {
      return;
    }
  });

  if (founduser) {
    res.json({
      username: founduser.username,
      password: founduser.password,
    });
  } else {
    res.send("Invalid Token !!");
  }
});

app.listen(3000);
