const jwt = require("jsonwebtoken");
const config = require("config");

const adminMiddleware = (req, res, next) => {
  try {
    const { isAdmin } = req; //req.IsAdmin defined in the auth middleware

    if (!isAdmin) return res.status(403).send("You are not Admin...");
    next();
  } catch (error) {
    res.status(401).send(" Token is not Correct-- Authorization error...");
  }
};

module.exports = adminMiddleware;
