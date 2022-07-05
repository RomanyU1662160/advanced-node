const Joi = require("@hapi/joi");

const GenreValidation = Joi.object({
  name: Joi.string().min(3).max(150).required(),
});

module.exports = GenreValidation;
