const mongoose = require("mongoose");
const config = require("config");
const winston = require("./winston");
const notifier = require("node-notifier");

const dbURL = config.get("DB_URL");
const applicationName = config.get("APPLICATION_NAME");

const connectDb = async () => {
  try {
    await mongoose.connect(dbURL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(
      `Welcome Romany, your application ${applicationName} is connected to your mongo db`
    );
    notifier.notify({
      title: "DB connection",
      message: `Welcome Romany, your application ${applicationName} is connected to your mongo db`,
      sound: false,
      wait: true,
    });
    // winston.info("connected to Mongo DB.");
  } catch (error) {
    console.log("Cannot connect to DB ");
    winston.error(error.message);
    process.exit(1);
  }
};

module.exports = connectDb;
