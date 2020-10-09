const winston = require("../config/winston");

const handleErrors = function (err, req, res, next) {
  console.log("error handle called   :>> ", err.message);

  // log Error
  //winston.error(err.message);

  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  res
    .status(err.status || 500)
    .send(`HandleErrors middleware says  ERROR : ${err.message} `);
  next();
};

module.exports = handleErrors;
