const express = require("express");
const authRouter = express.Router();
const User = require("../models/User");
const { validateSignUpData } = require("../utils/validate");
const bcrypt = require("bcrypt");

//signup
authRouter.post("/signup", async (req, res) => {
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
authRouter.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;
    const user = await User.findOne({ emailId: emailId });
    if (!user) {
      throw new Error("Invalid Credentials");
    }
    const isPasswordMatch = await user.validatePassword(password);
    if (isPasswordMatch) {
      const token = await user.getJWT();
      res.cookie("token", token, {
        expires: new Date(Date.now() + 8 * 3600000),
      });
      res.send("Login successful!!!");
    } else {
      throw new Error("Invalid Credentials");
    }
  } catch (err) {
    res.status(400).send("Login Failed: " + err.message);
  }
});

module.exports = {
  authRouter,
};
