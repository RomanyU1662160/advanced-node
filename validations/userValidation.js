const Joi = require("@hapi/joi");

const UserValidationSchema = Joi.object({
  fname: Joi.string().min(3).max(50).required(),
  lname: Joi.string().min(3).max(50).required(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] }
    })
    .required()
    .trim(),
  password: Joi.string().min(4).max(50).required()
});

module.exports = UserValidationSchema;
