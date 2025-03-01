const express = require("express");
const app = express();
const { userrouter } = require("./routes/user");
const { courserouter } = require("./routes/course");
const { adminroutes } = require("./routes/admin");
const { default: mongoose } = require("mongoose");

app.use(express.json());

app.use("/user", userrouter);
app.use("/course", courserouter);
app.use("/admin", adminroutes);

async function main() {
  await mongoose.connect(
    "mongodb+srv://stark:stHQvz8kODnms83p@cluster0.kds1g.mongodb.net/coursera"
  );
  app.listen(3000);
  console.log("connected");
}
main();
