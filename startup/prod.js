const helmet = require("helmet");

const compression = require("compression");

const doProduction = (app) => {
  app.use(helmet());
  app.use(compression());
};

module.exports = doProduction;
