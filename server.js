const express = require("express");
const config = require("config");
const { urlencoded } = require("body-parser");
const connectDb = require("./config/dbConnection");
const morgan = require("morgan");
const logger = require("./config/winston");
const routes = require("./startup/routes"); //(app)
const notifier = require("node-notifier");
const path = require("path");
require("express-async-errors");

const app = new express();

connectDb();

// caught unhandled exception out of the express server
process.on("uncaughtException", (ex) => {
  console.log("ex.message ::>>>", ex.message);
  logger.error(ex.message);
});

process.on("unhandledRejection", (ex) => {
  console.log("ex.message ::>>>", ex.message);
});

const port = config.get("PORT");
app.use(express.json());
app.use(urlencoded({ extended: false }));

routes(app);
app.use(morgan("combined", { stream: logger.stream }));

const server = app.listen(port, () => {
  notifier.notify({
    title: "Server status",
    message: `Server is running on port ${port}`,
    icon: path.join(__dirname, "coulson.jpg"), // Absolute path (doesn't work on balloons)
    sound: false, // Only Notification Center or Windows Toasters
    wait: true,
  });
  console.log(`Server is running on port ${port}`);
});

module.exports = server;
