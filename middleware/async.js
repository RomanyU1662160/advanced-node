const asyncMiddleware = function (handler) {
  return async function (req, res, next) {
    try {
      await handler(req, res);
    } catch (error) {
      console.log(" async Error... ", error.message);
      next();
    }
  };
};

module.exports = asyncMiddleware;
