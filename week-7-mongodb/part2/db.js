const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const users = new Schema({
  email: String,
  password: String,
  name: String,
});

const todos = new Schema({
  task: String,
  done: Boolean,
  Userid: ObjectId,
});

const usermodel = mongoose.model("user", users);
const todomodel = mongoose.model("todo", todos);

module.exports = { usermodel, todomodel };
