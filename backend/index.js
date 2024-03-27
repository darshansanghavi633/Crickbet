const express = require("express");
const User = require("./db/User");
const cors = require("cors");
const Admin = require("./db/Admin");
const Match = require("./db/Match");
const jwt = require('jsonwebtoken'); // Import JWT library
require("./db/config");
const app = express();
const secretKey = process.env.JWT_SECRET;

app.use(cors());
app.use(express.json());

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Internal Server Error");
});

app.post("/signup", async (req, res) => {
  try {
    const user = new User(req.body);
    // console.log(user)
    const result = await user.save();
    const sanitizedResult = result.toObject();
    delete sanitizedResult.password;

    // Generate JWT token
    const token = jwt.sign({ userId: user._id }, secretKey, { expiresIn: '1h' });

    // Send token and user data in response
    res.json({ token, user: sanitizedResult });
  } catch (error) {
    console.error("Error signing up:", error);
    res.status(500).send("Server Error in signing up");
  }
});

app.post("/login", async (req, res) => {
  try {
    const user = await User.findOne(req.body).select("-password");
    if (user) {
      // Generate JWT token and send it along with user data
      const token = jwt.sign({ userId: user._id }, secretKey, { expiresIn: '1h' }); // You need to implement this function
      res.send({ user, token });
    } else {
      res.status(401).send("Invalid email or password");
    }
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).send("Server Error logging in");
  }
});
app.post("/admin", async (req, res) => {
  try {
    const admin = new Admin(req.body);
    const result = await admin.save();
    res.send(result);
  } catch (error) {
    console.error("Error posting match:", error);
    res.status(500).send("Server Error in posting match");
  }
});

app.get("/user", async (req, res) => {
  try {
    const user = await Admin.findOne().sort({ _id: -1 });
    if (user) {
      res.send(user);
    } else {
      res.status(404).send({ result: "No Products" });
    }
  } catch (error) {
    console.error("Error getting user:", error);
    res.status(500).send("Server Error in getting user");
  }
});

app.put("/admin/:id", async (req, res) => {
  try {
    const match = await Admin.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (match) {
      res.send(match);
    } else {
      res.status(404).send({ result: "No updates" });
    }
  } catch (error) {
    console.error("Error updating match:", error);
    res.status(500).send("Server Error in updating match");
  }
});

app.post("/user", async (req, res) => {
  try {
    const match = new Match(req.body);
    const result = await match.save();
    res.send(result);
  } catch (error) {
    console.error("Error getting choice:", error);
    res.status(500).send("Server Error in getting choice");
  }
});

app.listen(5002, () => {
  console.log("Server is running on port 5002");
});
