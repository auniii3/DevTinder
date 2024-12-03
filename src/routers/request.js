const express = require("express");
const requestRouter = express.Router();

//send connection request
requestRouter.post("/sendConnectionRequest", (req, res) => {
  try {
    res.send("Sending Connection Request");
  } catch (err) {
    res.status(400).send("Error: " + err.message);
  }
});

module.exports = {
  requestRouter,
};
