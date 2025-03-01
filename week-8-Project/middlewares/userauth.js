const jwt = require("jsonwebtoken");
const JWT_KEY = "se3retk3y21uh8";

function userauth(req, res, next) {
  const token = req.headers.token;
  const verify = jwt.verify(token, JWT_KEY);
  if (verify) {
    req.id = verify.id;
    next();
  } else {
    res.json({ mdg: "You are not signed in !" });
  }
}

module.exports = {
  userauth: userauth,
};
