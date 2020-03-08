const validator = require("validator");
const isEmpty = require("./isEmpty");

module.exports = function validateRegisterInput(data) {
  let error = {};
  let is_valid = true;

  data.name = !isEmpty(data.name) ? data.name : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";

  if (!validator.isLength(data.name, { min: 2, max: 30 })) {
    error.name = "name must be between 2 and 30 character";
    is_valid = false;
  }

  if (validator.isEmpty(data.name)) {
    error.name = "name field is required";
    is_valid = false;
  }

  if (validator.isEmpty(data.email)) {
    is_valid = false;
    error.email = "email field is required";
  }

  if (!validator.isEmail(data.email)) {
    is_valid = false;
    error.email = "email is invalid";
  }

  if (!validator.isLength(data.password, { min: 6, max: 40 })) {
    is_valid = false;
    error.password = "password must be between 6 and 40 char";
  }

  if (validator.isEmpty(data.password)) {
    is_valid = false;
    error.password = "password field is required";
  }

  return {
    error: error,
    isValid: is_valid
  };
};
