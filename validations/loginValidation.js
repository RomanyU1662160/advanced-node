const Joi = require("@hapi/joi");

const loginValidationSchema = Joi.object({
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .required()
    .trim(),
  password: Joi.required()
});
module.exports = loginValidationSchema;
