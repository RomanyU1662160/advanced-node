const winston = require("winston");
const config = require("config");
const RootPath = require("app-root-path");

require("winston-mongodb");

/*
 ** winston logging levels
 ** winstonLevels = ['error' , "warn", "info" , "verbose", "debug" , "silly"]
 */

const options = {
  file: {
    level: "info",
    filename: `${RootPath}/logs/app.log`,
    json: true,
    maxsize: 524880, //5MB,
    maxFiles: 5,
    colorize: false,
    handleException: true,
    handleRejections: true,
    format: winston.format.json(),
  },

  console: {
    level: "error",
    json: true,
    colorize: true,
    handleException: true,
    handleRejections: true,
    format: winston.format.json(),
    prettyPrint: true,
  },

  mongoDb: {
    level: "info",
    tryReconnect: true,
    poolSize: 2,
    includeIds: false,
    handleException: true,
    handleRejections: true,
    format: winston.format.json(),
    db: config.get("DB_URL"),
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      poolSize: 2,
    },
  },
};

const logger = winston.createLogger({
  transports: [
    new winston.transports.File(options.file),
    new winston.transports.Console(options.console),
    // new winston.transports.MongoDB(options.mongoDb),
  ],
  exceptionHandlers: [
    new winston.transports.File({
      filename: `${RootPath}/logs/exceptions.log`,
    }),
    new winston.transports.Console(options.console),
  ],
  exitOnError: true,
});

logger.stream = {
  write: function (msg, encoding) {
    logger.info(msg);
  },
};

module.exports = logger;
