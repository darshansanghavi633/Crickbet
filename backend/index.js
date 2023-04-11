const express = require("express");
const User = require("./db/User");
const cors = require("cors");
const Admin = require("./db/Admin");
const Match = require("./db/Match");
require("./db/config");
const app = express();

app.use(cors());
app.use(express.json());

app.post("/signup", async (req, res) => {
  try {
    let user = new User(req.body);
    let result = await user.save();
    result = result.toObject();
    delete result.password;
    res.send({ result });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error in signing up");
  }
});

app.post("/login", async (req, res) => {
  try {
    let user = await User.findOne(req.body).select("-password");
    if (user) {
      res.send({ user });
    } else {
      res.send("error");
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error logging in");
  }
});

app.post("/admin", async (req, res) => {
  try {
    let admin = new Admin(req.body);
    let result = await admin.save();
    res.send(result);
  } catch (error) {
    console.log(error);
    res.status(500).send("server error in posting Match");
  }
});
app.get("/user", async (req, res) => {
  let user = await Admin.findOne().sort({ _id: -1 });
  if (user) {
    res.send(user);
  } else {
    res.send({ result: "No Products" });
  }
});

app.put("/admin/:id", async (req, res) => {
  try {
    let match = await Admin.updateOne(
      { _id: req.params.id },
      { $set: req.body }
    ).sort({ _id: -1 });
    if (match) {
      res.send(match);
    } else {
      res.send({ result: "No updates" });
    }
  } catch {
    console.log(error);
    res.status(500).send("server error in updating matches");
  }
});

app.post("/user", async (req, res) => {
  try {
    let match = new Match(req.body);
    let result = await match.save();
    res.send(result);
  } catch (error) {
    console.log(error);
    res.status(500).send("server error in getting choice");
  }
});

app.listen(5000);
