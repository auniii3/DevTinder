const express = require("express");
const requestRouter = express.Router();
const User = require("../models/User");
const ConnectionRequest = require("../models/ConnectionRequest");
const { userAuth } = require("../middlewares/auth");

//send connection request
requestRouter.post(
  "/request/send/:status/:toUserId",
  userAuth,
  async (req, res) => {
    try {
      const fromUserId = req.user._id;
      const toUserId = req.params.toUserId;
      const status = req.params.status;
      const allowedStatus = ["ignored", "interested"];

      //logic to check the status is ignored or interested
      if (!allowedStatus.includes(status)) {
        throw new Error("Invalid status " + status);
      }

      //logic to check if toUserId exists or not
      const toUser = await User.findById(toUserId);
      if (!toUser) {
        throw new Error("User not found");
      }

      //logic to check if the connection request already exists between the to and from User
      const connectionRequest = await ConnectionRequest.findOne({
        $or: [
          { fromUserId, toUserId },
          { fromUserId: toUserId, toUserId: fromUserId },
        ],
      });
      if (connectionRequest) {
        throw new Error("Connection request already exists");
      }

      //will create new Connection
      const connection = new ConnectionRequest({
        fromUserId,
        toUserId,
        status,
      });
      const data = await connection.save();

      return res.json({
        message: "Connection request sent successfully",
        data,
      });
    } catch (err) {
      res.status(400).send("Error: " + err.message);
    }
  }
);

//review the connection request
requestRouter.post(
  "/request/review/:status/:requestId",
  userAuth,
  async (req, res) => {
    try {
      const loggedInUser = req.user;
      const { status, requestId } = req.params;

      const allowedStatus = ["accepted", "rejected"];
      if (!allowedStatus.includes(status)) {
        throw new Error("Invalid status " + status);
      }

      const connectionRequest = await ConnectionRequest.findOne({
        _id: requestId,
        toUserId: loggedInUser._id,
        status: "interested",
      });
      if (!connectionRequest) {
        throw new Error("Invalid connection request");
      }
      connectionRequest.status = status;
      const data = await connectionRequest.save();
      res.json({
        message: "Connection request updated successfully",
        data,
      });
    } catch (err) {
      res.status(400).send("Error: " + err.message);
    }
  }
);

module.exports = {
  requestRouter,
};
