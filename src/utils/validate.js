const validator = require("validator");

const validateSignUpData = (req) => {
  const { firstName, lastName, emailId, password } = req.body;
  if (!firstName || !lastName) {
    throw new Error("Invalid first name or last name");
  } else if (!validator.isEmail(emailId)) {
    throw new Error("Invalid email");
  } else if (!validator.isStrongPassword(password)) {
    throw new Error("Password is not valid");
  }
};

const validateEditData = (req) => {
  const allowedEditFields = [
    "firstName",
    "lastName",
    "skills",
    "about",
    "gender",
    "age",
  ];
  const isUpdateAllowed = Object.keys(req.body).every((key) =>
    allowedEditFields.includes(key)
  );
  return isUpdateAllowed;
};

module.exports = {
  validateSignUpData,
  validateEditData,
};
