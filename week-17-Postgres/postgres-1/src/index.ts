import { Client } from "pg";
import express from "express";

const app = express();

const pgClient = new Client(
  "postgresql://neondb_owner:npg_cjUFCitemh42@ep-yellow-river-a55naqz5-pooler.us-east-2.aws.neon.tech/neondb?sslmode=require"
);

async function main() {
  await pgClient.connect();
  console.log("Comnnected to Server");
}

main();

app.use(express.json());

app.get("/signup", async function (req, res) {
  const username = req.body.username;
  const password = req.body.password;
  const email = req.body.email;

  try {
    // we use this below syntax to protect our database from sql injection
    const query = `INSERT INTO users(username, password, email) VALUES ($1 , $2, $3)`;
    const response = await pgClient.query(query, [username, password, email]);

    console.log(response);

    res.json({ msg: "Signed UP !" });
  } catch (error) {
    console.log(error);

    res.json({ msg: "Error Signing Up" });
  }
});

app.listen(3000);
