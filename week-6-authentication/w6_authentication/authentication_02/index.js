const express = require("express");
const jwt = require("jsonwebtoken");
const jwt_key = "sudipta2110";
const app = express();

app.use(express.json());

let users = [];

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/public/index.html");
});

app.post("/signup", function (req, res) {
  const username = req.body.username;
  const password = req.body.password;
  users.push({ username: username, password: password });
  res.json({ message: "Signed Up Succesfully !" });
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
    const token = jwt.sign({ username: username }, jwt_key);
    res.h;
    res.json({ token: token });
  } else {
    res.json({ msg: "Invalid username or password !" });
  }

  console.log(users);
});

// Creating auth middleware
function auth(req, res, next) {
  const token = req.headers.token;
  const decodedtoken = jwt.verify(token, jwt_key);
  if (decodedtoken) {
    req.username = decodedtoken.username;
    next();
  } else {
    res.json({ msg: "Invalid token !" });
  }
}

app.get("/me", auth, function (req, res) {
  let founduser = null;

  const found = users.find((u) => {
    if (u.username === req.username) {
      founduser = u;
    } else {
      return;
    }
  });

  if (founduser) {
    res.json({ username: founduser.username, password: founduser.password });
  } else {
    res.json({ msg: "Invalid Token !!" });
  }
});

app.listen(3000);
