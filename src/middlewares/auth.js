const jwt = require("jsonwebtoken");
const User = require("../models/User");

const userAuth = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    if (!token) {
      throw new Error("Invalid Token !!!!!");
    }
    const { _id } = jwt.verify(token, "DevTinder@123");
    const user = await User.findById(_id);
    if (!user) {
      throw new Error("User not found !!!!!");
    }
    req.user = user;
    next();
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
};

module.exports = {
  userAuth,
};
