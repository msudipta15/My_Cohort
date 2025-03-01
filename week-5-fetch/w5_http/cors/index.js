const express = require("express");
const app = express();
// install cors : npm install cors
const cors = require("cors");
// cors is a middleware to give access to cross origin requests
// so that we can allow other frontends to get access our backend

app.use(express.json());
// this is a middleware to convert body data to json format

app.use(cors());
// this will alow any frontend to access our backend
// to give access to specific frontends wee need to mention them
// cors({domains: 'google.com','facebook.com'})

app.post("/sum", function (req, res) {
  const a = parseInt(req.body.a);
  const b = parseInt(req.body.b);

  res.json({ result: a + b });
});

app.listen(3000);
