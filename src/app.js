const express = require("express");
const connectDb = require("./config/database");
const bcrypt = require("bcrypt");
const app = express();
const User = require("./models/User");
const { validateSignUpData } = require("./utils/validate");

const AllowedUpdateFields = [
  "gender",
  "password",
  "skills",
  "about",
  "photoUrl",
];

//express.json() is a middleware used to convert the JSON to js objects so that js can read it
app.use("/", express.json());

//signup a new user
app.post("/signup", async (req, res) => {
  // Creating a new instance of the User
  const { firstName, lastName, emailId, password } = req.body;
  try {
    //Validate the data
    validateSignUpData(req);
    const passwordHash = await bcrypt.hash(password, 10);
    const user = new User({
      firstName,
      lastName,
      emailId,
      password: passwordHash,
    });
    //.save() it saves the user to the database
    await user.save();
    res.send("User added to the database successfully");
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
});

//login
app.post("/login", async (req, res) => {
  const { emailId, password } = req.body;
  try {
    const user = await User.findOne({ emailId: emailId });
    if (!user) {
      throw new Error("Invalid Credentials");
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (isPasswordMatch) {
      res.send("Login successful!!!");
    } else {
      throw new Error("Invalid Credentials");
    }
  } catch (err) {
    res.status(400).send("Login Failed: " + err.message);
  }
});

//Get user by email
app.get("/user", async (req, res) => {
  const userEmail = req.body.emailId;
  try {
    const user = await User.findOne({ emailId: userEmail });
    if (!user) {
      return res.status(404).send("User not found");
    }
    res.send(user);
  } catch (err) {
    res.status(400).send("Something went wrong");
  }
});

//Get feed data
app.get("/feed", async (req, res) => {
  try {
    const userData = await User.find({});
    res.send(userData);
  } catch (err) {
    res.status(400).send("Failed to fetch User data");
  }
});

//Delete user data
app.delete("/user", async (req, res) => {
  const userId = req.body.userId;
  try {
    await User.findByIdAndDelete(userId);
    res.send("User deleted successfully");
  } catch (err) {
    res.status(400).send("Something went wrong" + err.message);
  }
});

//Update user by userId
app.patch("/user/:id", async (req, res) => {
  const userId = req.params.id;
  const data = req.body;
  const isAllowed = Object.keys(data).every((item) =>
    AllowedUpdateFields.includes(item)
  );
  try {
    if (!isAllowed) {
      throw new Error("Update not allowed.");
    } else {
      const user = await User.findByIdAndUpdate(userId, data, {
        returnDocument: "after",
        runValidators: true,
      });
      res.send(user);
    }
  } catch (err) {
    res.status(400).send("Something went wrong " + err.message);
  }
});

//Update user by emailId
app.patch("/user", async (req, res) => {
  const emailId = req.body.emailId;
  const data = req.body;
  try {
    const user = await User.findOneAndUpdate({ emailId: emailId }, data, {
      returnDocument: "after",
    });
    res.send(user);
  } catch (err) {
    res.status(400).send("Something went wrong");
  }
});

//connect to db then start the server
connectDb()
  .then(() => {
    console.log("Database connected successfully...");
    app.listen(7777, () => {
      console.log("Server is successfully started on port 7777...");
    });
  })
  .catch((err) => {
    console.log("Error connecting to Database");
  });
