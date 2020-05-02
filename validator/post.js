const validator = require("validator");
const isEmpty = require("./isEmpty");

module.exports = validatorPostInput = (data) => {
  let error = {};

  data.text = !isEmpty(data.text) ? data.text : "";

  if (validator.isEmpty(data.text)) {
    error.text = "text field is required";
  }

  return {
    error: error,
    isValid: isEmpty(error),
  };
};
