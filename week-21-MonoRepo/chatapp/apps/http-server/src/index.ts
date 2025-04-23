import express from "express";

const app = express();

app.get("/signup", async function (req, res) {
  res.send("hello world");
});

app.get("/signin", async function (req, res) {
  res.send("hello world");
});

app.get("/chat", async function (req, res) {
  res.send("hello world");
});

app.listen(3001);
