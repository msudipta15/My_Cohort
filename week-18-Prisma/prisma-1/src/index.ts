import { PrismaClient } from "../generated/prisma";
import express from "express";

const client = new PrismaClient();

const app = express();

app.use(express.json());

app.get("/signup", async function (req, res) {
  const username = req.body.username;
  const password = req.body.password;

  try {
    await client.user.create({
      data: {
        username: username,
        password: password,
      },
    });

    res.json({ msg: "Signed Up !" });
  } catch (error) {
    res.json({ msg: "Error signing up!" });
    console.log(error);
  }
});

app.get("/user", async function (req, res) {
  try {
    const users = await client.user.findMany({
      select: { username: true },
    });
    res.json({ users: users });
  } catch (error) {
    console.log(error);
  }
});

app.get("/todo/:id", async function (req, res) {
  const userId = req.params.id;

  try {
    const user = await client.user.findFirst({
      where: {
        id: parseInt(userId),
      },
      select: {
        username: true,
        todos: true,
      },
    });

    res.json({ user });
  } catch (error) {
    console.log(error);
  }
});

app.listen(3000);
