const handleErrors = require("../middleware/handleErrors");

const routes = function (app) {
  app.use("/api/films", require("../routes/api/film"));
  app.use("/api/directors", require("../routes/api/director"));
  app.use("/api/customers", require("../routes/api/customer"));
  app.use("/api/users", require("../routes/api/user"));
  app.use("/api/rentals", require("../routes/api/rental"));
  app.use("/api/genres", require("../routes/api/genre"));
  app.use("/api/auth", require("../routes/api/auth"));
  app.use("/api/admin", require("../routes/api/admin"));
  app.use(handleErrors);
};

module.exports = routes;
