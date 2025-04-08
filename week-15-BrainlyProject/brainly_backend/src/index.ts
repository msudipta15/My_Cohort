import express from "express";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import { contentModel, linkModel, userModel } from "./db";
import zod, { z } from "zod";
const jwt_key = "jwdq00-1-==1";
import bcrypt from "bcrypt";
import { authuser } from "./middleware";
import { random } from "./utils";
import cors from "cors";

const app = express();

async function main() {
  console.log("Attemting to connect");

  await mongoose
    .connect(
      "mongodb+srv://stark:stHQvz8kODnms83p@cluster0.kds1g.mongodb.net/Brainly"
    )
    .then(() => {
      console.log("connected");
    })
    .catch((error) => {
      console.log(error);
    });
  app.listen(3003);
}

main();

app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

app.use(express.json());

app.post("/api/v1/signup", async function (req, res) {
  const usernameBody = zod.object({
    username: z.string().min(2).max(10),
  });
  const passwordBody = zod.object({
    password: z.string().min(2).max(10),
  });

  const validusername = usernameBody.safeParse(req.body);
  const validpassword = passwordBody.safeParse(req.body);

  if (!validusername) {
    res.json({ msg: "username not valid" });
    return;
  }
  if (!validpassword) {
    res.json({ msg: "password not valid" });
  }

  const username = req.body.username;
  const password = req.body.password;

  const hashpassword = await bcrypt.hash(password, 10);

  const user = await userModel.findOne({ username: username });

  if (user) {
    res.json({ msg: "Username already exists" });
    return;
  }

  const signup = await userModel.create({
    username: username,
    password: hashpassword,
  });

  if (signup) {
    res.json({ msg: "Sign Up Successfull" });
  } else {
    res.json({ msg: "Error Signup" });
  }
});

app.post("/api/v1/signin", async function (req, res) {
  const username = req.body.username;
  const password = req.body.password;

  const user = await userModel.findOne({ username: username });

  if (user) {
    const user_password = user.password;
    if (user_password) {
      const valid = await bcrypt.compare(password, user_password);
      if (valid) {
        const token = jwt.sign({ userId: user._id.toString() }, jwt_key);
        res.json({ token: token });
      } else {
        res.json({ msg: "Incorrect password" });
      }
    }
  } else {
    res.json({ msg: "username not found" });
  }
});

app.post("/api/v1/content", authuser, async function (req, res) {
  // @ts-ignore
  const userid = req.userid;
  const title = req.body.title;
  const link = req.body.link;
  const tags = req.body.tags;
  const type = req.body.type;

  const post_content = await contentModel.create({
    title: title,
    type: type,
    link: link,
    tags: tags,
    userid: userid,
  });

  if (post_content) {
    res.json({ msg: "content added !" });
  } else {
    res.json({ msg: "Something went wrong !" });
  }
});

app.get("/api/v1/content", authuser, async function (req, res) {
  // @ts-ignore
  const userid = req.userid;

  const contents = await contentModel
    .find({ userid: userid })
    .populate("userid", "username");

  if (contents.length != 0) {
    res.json({
      contents,
    });
  } else {
    res.json({ msg: "No Content found" });
  }
});

app.delete("/api/v1/content", authuser, async function (req, res) {
  // @ts-ignore
  const userid = req.userid;
  const contentid = req.body.contentid;

  const content = await contentModel.findOne({ _id: contentid });
  if (content) {
    await contentModel.deleteOne({ _id: contentid });
    res.json({ msg: "Deleted" });
  } else {
    res.json({ msg: "No content found" });
  }
});

app.post("/api/v1/share", authuser, async function (req, res) {
  //@ts-ignore
  const userid = req.userid;

  const share = req.body.share;

  if (share) {
    const existingLink = await linkModel.findOne({ userid: userid });

    if (existingLink) {
      res.json({ hash: existingLink.hash });
      return;
    }

    const hash = random(10);
    await linkModel.create({
      userid: userid,
      hash: hash,
    });
    res.json({
      hash: hash,
    });
  } else {
    await linkModel.deleteOne({
      userid: userid,
    });
    res.json({ msg: "Link Deleted" });
  }
});

app.get("/api/v1/:sharelink", async function (req, res) {
  const hash = req.params.sharelink;

  const link = await linkModel.findOne({ hash: hash });

  if (!link) {
    res.json({ msg: "Incorrect input" });
    return;
  }

  const userid = link.userid;

  const content = await contentModel.findOne({ userid: userid });

  const user = await userModel.findOne({
    _id: userid,
  });

  if (!user) {
    res.json({ msg: "User Not Found , something went wrong" });
  } else {
    res.json({ username: user.username, content: content });
  }
});
