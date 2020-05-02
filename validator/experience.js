const validator = require("validator");
const isEmpty = require("./isEmpty");

module.exports = validatorExperienceInput = (data) => {
  let error = {};

  data.title = !isEmpty(data.title) ? data.title : "";
  data.company = !isEmpty(data.company) ? data.company : "";
  data.from = !isEmpty(data.from) ? data.from : "";

  if (validator.isEmpty(data.title)) {
    error.title = "job title field is required";
  }

  if (validator.isEmpty(data.company)) {
    error.company = "job company field is required";
  }

  if (validator.isEmpty(data.from)) {
    error.from = "job from field is required";
  }

  return {
    error: error,
    isValid: isEmpty(error),
  };
};
