const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const user = new Schema({
  email: String,
  password: String,
  firstname: String,
  lastname: String,
});

const admin = new Schema({
  email: String,
  password: String,
  firstname: String,
  lastname: String,
});

const course = new Schema({
  title: String,
  cost: Number,
  about: String,
  imageurl: String,
  creatorid: ObjectId,
});

const purchaseschema = new Schema({
  userid: ObjectId,
  courseid: ObjectId,
});

const usermodel = mongoose.model("user", user);
const adminmodel = mongoose.model("admin", admin);
const coursemodel = mongoose.model("course", course);
const purchasemodel = mongoose.model("purcahase", purchaseschema);

module.exports = {
  usermodel: usermodel,
  adminmodel: adminmodel,
  coursemodel: coursemodel,
  purchasemodel: purchasemodel,
};
