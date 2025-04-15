import { Client } from "pg";
import express from "express";

const app = express();
const pgClient = new Client(
  "postgresql://neondb_owner:npg_cjUFCitemh42@ep-yellow-river-a55naqz5-pooler.us-east-2.aws.neon.tech/neondb?sslmode=require"
);

async function main() {
  await pgClient.connect();
  console.log("Connected");
}

main();

app.use(express.json());

app.get("/signup", async function (req, res) {
  const username = req.body.username;
  const password = req.body.password;
  const email = req.body.email;

  const town = req.body.town;
  const pincode = req.body.pincode;
  const state = req.body.state;

  try {
    const query1 = `INSERT INTO users2(username,password,email) VALUES($1, $2, $3) RETURNING id;`;
    const query2 = `INSERT INTO address2(town, pincode, state, userid) VALUES($1, $2, $3, $4);`;

    // wrap the entire query inside a transaction , so that either both the query get success or
    // neither of them get executed so that there is not nay user without address

    await pgClient.query("BEGIN;");

    const response = await pgClient.query(query1, [username, password, email]);
    const userid = response.rows[0].id;
    const response2 = await pgClient.query(query2, [
      town,
      pincode,
      state,
      userid,
    ]);

    await pgClient.query("COMMIT;");

    res.json({ msg: "Sign Up Succesfull" });
  } catch (error) {
    res.json({ msg: "Error Signing Up" });
    console.log(error);
  }
});

app.get("/address", async function (req, res) {
  const username = req.body.username;

  try {
    const query = `SELECT u.username , u.email, a.town, a.state, a.pincode FROM users2 u JOIN address2 a ON u.id = a.userid WHERE u.username = $1`;
    const response = await pgClient.query(query, [username]);
    const data = response.rows;
    console.log(response);
    res.json({ data });
  } catch (error) {
    console.log(error);
  }
});

app.listen(3000);
