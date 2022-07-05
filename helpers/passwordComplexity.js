const passwordComplexity = require("joi-password-complexity");

const options = {
  min: 4,
  max: 12,
  lowerCase: 1,
  upperCase: 1,
  numeric: 1,
  symbol: 1
};

const validateComplexity = function (password) {
  const result = passwordComplexity(options, "Password").validate(password);

  return result;
};

module.exports = validateComplexity;
