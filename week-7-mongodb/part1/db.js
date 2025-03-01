const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const user = new Schema({
  email: String,
  password: String,
  name: String,
});

const todo = new Schema({
  task: String,
  done: Boolean,
  userid: ObjectId,
});

const usermodel = mongoose.model("users", user);
const todomodel = mongoose.model("todos", todo);

module.exports = {
  usermodel,
  todomodel,
};
