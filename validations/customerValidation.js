const Joi = require("@hapi/joi");

const CustomerValidationSchema = Joi.object({
  fname: Joi.string().min(3).max(50).required(),
  lname: Joi.string().min(3).max(50).required(),
  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ["com", "net"] }
  })
});

module.exports = CustomerValidationSchema;
