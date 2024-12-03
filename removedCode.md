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
