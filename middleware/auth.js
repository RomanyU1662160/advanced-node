const jwt = require("jsonwebtoken");
const config = require("config");
const logger = require("../config/winston");

const authMiddleware = (req, res, next) => {
  const token = req.header("x-auth-token");
  if (!token) {
    logger.error("No authorized -- Token not Found");
    return res.status(401).send("No authorized -- Token not Found");
  }

  try {
    const decoded = jwt.verify(token, config.get("JWT_SECRET"));
    req.id = decoded.id;
    req.isAdmin = decoded.isAdmin;
    next();
  } catch (error) {
    res
      .status(400)
      .json({ error: "Token is not correct-- Authorization error... " });
  }
};

module.exports = authMiddleware;
