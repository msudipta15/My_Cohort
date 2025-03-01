const jwt = require("jsonwebtoken");
const JWT_KEY_Admin = "jdbduwuw7yw7";

function adminauth(req, res, next) {
  const token = req.headers.token;
  const verify = jwt.verify(token, JWT_KEY_Admin);
  if (verify) {
    const adminid = verify.id;
    req.id = adminid;
    next();
  } else {
    res.json({ msg: "You are not signed in !" });
  }
}

module.exports = {
  adminauth: adminauth,
};
