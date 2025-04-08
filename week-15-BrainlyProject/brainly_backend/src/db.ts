import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
  username: { type: String, unique: true },
  password: String,
});

const contentSchema = new Schema({
  title: String,
  link: String,
  type: String,
  tags: [{ type: mongoose.Types.ObjectId, ref: "Tag" }],
  userid: { type: mongoose.Types.ObjectId, ref: "User", required: true },
});

const linkSchema = new Schema({
  hash: String,
  userid: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true,
  },
});

export const userModel = mongoose.model("User", userSchema);
export const contentModel = mongoose.model("Content", contentSchema);
export const linkModel = mongoose.model("Link", linkSchema);
