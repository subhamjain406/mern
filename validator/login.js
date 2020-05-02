const validator = require("validator");
const isEmpty = require("./isEmpty");

module.exports = validatorLoginInput = (data) => {
  let error = {};
  // let is_valid = true;

  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";

  if (!validator.isEmail(data.email)) {
    error.email = "email is invalid";
  }

  if (validator.isEmpty(data.email)) {
    error.email = "email field is required";
  }

  if (!validator.isLength(data.password, { min: 6, max: 40 })) {
    error.password = "password must be between 6 and 40 char";
  }

  if (validator.isEmpty(data.password)) {
    error.password = "password field is required";
  }

  return {
    error: error,
    isValid: isEmpty(error),
  };
};
