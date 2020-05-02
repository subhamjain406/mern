const validator = require("validator");
const isEmpty = require("./isEmpty");

module.exports = validatorEducationInput = (data) => {
  let error = {};

  data.school = !isEmpty(data.school) ? data.school : "";
  data.degree = !isEmpty(data.degree) ? data.degree : "";
  data.from = !isEmpty(data.from) ? data.from : "";

  if (validator.isEmpty(data.school)) {
    error.school = "education school field is required";
  }

  if (validator.isEmpty(data.degree)) {
    error.degree = "education degree field is required";
  }

  if (validator.isEmpty(data.from)) {
    error.from = "education from field is required";
  }

  return {
    error: error,
    isValid: isEmpty(error),
  };
};
