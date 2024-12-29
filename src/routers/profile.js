const express = require("express");
const profileRouter = express.Router();
const { userAuth } = require("../middlewares/auth");
const { validateEditData } = require("../utils/validate");
const bcrypt = require("bcrypt");
const User = require("../models/User");

//get profile
profileRouter.get("/profile/view", userAuth, async (req, res) => {
  try {
    const user = req.user;
    res.send(user);
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
});

profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
  try {
    const isUpdateAllowed = validateEditData(req);
    if (!isUpdateAllowed) {
      throw new Error("Invalid update request!");
    }
    const loggedInUser = req.user;
    Object.keys(req.body).forEach((key) => (loggedInUser[key] = req.body[key]));
    loggedInUser.save();
    res.json({
      message: `${loggedInUser.firstName}, your data has been updated successfully`,
      data: loggedInUser,
    });
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
});

profileRouter.patch("/profile/password", userAuth, async (req, res) => {
  try {
    const user = req.user;
    const { emailId } = req.body;
    if (emailId !== user.emailId) {
      throw new Error("User/Email Id not found");
    }
    const { newPassword, confirmPassword } = req.body;
    if (newPassword !== confirmPassword) {
      throw new Error("Password does not match");
    }
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await User.findByIdAndUpdate(user._id, { password: hashedPassword });
    res.send("Password updated successfully");
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
});

module.exports = {
  profileRouter,
};
