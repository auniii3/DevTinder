const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "First name is required"],
      minLength: 3,
      maxLength: 50,
    },
    lastName: {
      type: String,
      minLength: 3,
      maxLength: 50,
    },
    emailId: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Email id is not valid");
        }
      },
    },
    password: {
      type: String,
      required: true,
      validate(value) {
        if (!validator.isStrongPassword(value)) {
          throw new Error("Password is not valid");
        }
      },
    },
    gender: {
      type: String,
      lowercase: true,
      validate(value) {
        if (!["male", "female", "others"].includes(value)) {
          return new Error("Gender data is not valid");
        }
      },
    },
    age: {
      type: Number,
      min: 18,
    },
    photoUrl: {
      type: String,
      default:
        "https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg",
      validate(value) {
        if (!validator.isURL(value)) {
          throw new Error("Invalid URL: " + value);
        }
      },
    },
    about: {
      type: String,
      default: "This is a default about of the user.",
      minLength: 20,
      maxLength: 500,
    },
    skills: {
      type: [String],
      validate(value) {
        if (value.length > 10) {
          throw new Error("Skills more then 10 is not allowed.");
        }
      },
    },
  },
  { timestamps: true }
);

//creating a User model with userSchema
module.exports = mongoose.model("User", userSchema);
