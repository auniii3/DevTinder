const authAdmin = (req, res, next) => {
  const token = "xyz";
  console.log("Admin Authentication System");
  const isAuthenticated = token === "xyz";
  if (!isAuthenticated) {
    res.status(401).send("Admin is not authenticated");
  } else {
    next();
  }
};

const authUser = (req, res, next) => {
  const token = "xyz";
  console.log("User Authentication System");
  const isAuthenticated = token === "xyz";
  if (!isAuthenticated) {
    res.status(401).send("User is not authenticated");
  } else {
    next();
  }
};

module.exports = {
  authAdmin,
  authUser,
};
