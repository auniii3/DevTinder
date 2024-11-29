const express = require("express");
const connectDb = require("./config/database");
const app = express();

const User = require("./models/user");

//express.json() is a middleware used to convert the JSON to js objects so that js can read it
app.use("/", express.json());

app.post("/signup", async (req, res) => {
  // Creating a new instance of the User
  const user = new User(req.body);
  try {
    //.save() it saves the user to the database
    await user.save();
    res.send("User added to the database successfully");
  } catch {
    (err) => {
      res.status(400).send("Failed to add to the database" + err.message);
    };
  }
});

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
