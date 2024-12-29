const express = require("express");
const connectDb = require("./config/database");
const cookieParser = require("cookie-parser");
const app = express();
const cors = require("cors");
const { authRouter } = require("./routers/auth");
const { profileRouter } = require("./routers/profile");
const { requestRouter } = require("./routers/request");
const { userRouter } = require("./routers/user");

app.use(
  cors({
    origin: "http://localhost:5173", // replace with your frontend URL
    credentials: true, // allow cookies to be sent over HTTP requests
  })
);

//express.json() is a middleware used to convert the JSON to js objects so that js can read it
app.use(express.json());
app.use(cookieParser());

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);
app.use("/", userRouter);

//connect to db then start the server
connectDb()
  .then(() => {
    console.log("Database connected successfully...");
    app.listen(7777, () => {
      console.log("Server is successfully started on port 7777...");
    });
  })
  .catch((err) => {
    console.log("Error connecting to Database" + err.message);
  });
