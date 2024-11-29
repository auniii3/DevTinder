const mongoose = require("mongoose");

//til .net it will connect to the cluster and /devTinder is the database
const connectDb = async () => {
  await mongoose.connect(
    "mongodb+srv://auniii97:sxtm2T5VHimR6DL4@aniketnode.t4dmt.mongodb.net/devTinder"
  );
};

module.exports = connectDb;
