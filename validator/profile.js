const validator = require("validator");
const isEmpty = require("./isEmpty");

module.exports = validatorProfileInput = (data) => {
  let error = {};

  data.handle = !isEmpty(data.handle) ? data.handle : "";
  data.skills = !isEmpty(data.skills) ? data.skills : "";
  data.status = !isEmpty(data.status) ? data.status : "";

  if (!validator.isLength(data.handle, { min: 2, max: 40 })) {
    error.handle = "Hnadle must be between 2 nad 40 character";
  }

  if (validator.isEmpty(data.handle)) {
    error.handle = "profile handle is required";
  }

  if (validator.isEmpty(data.skills)) {
    error.skills = "profile skills is required";
  }

  if (validator.isEmpty(data.status)) {
    error.status = "profile status is required";
  }

  if (!isEmpty(data.website)) {
    if (!validator.isURL(data.website)) {
      error.website = "Not a valid Website Url";
    }
  }

  if (!isEmpty(data.youtube)) {
    if (!validator.isURL(data.youtube)) {
      error.youtube = "Not a valid youtube Url";
    }
  }

  if (!isEmpty(data.facebook)) {
    if (!validator.isURL(data.facebook)) {
      error.facebook = "Not a valid facebook Url";
    }
  }

  if (!isEmpty(data.linkedin)) {
    if (!validator.isURL(data.linkedin)) {
      error.linkedin = "Not a valid linkedin Url";
    }
  }

  if (!isEmpty(data.twitter)) {
    if (!validator.isURL(data.twitter)) {
      error.twitter = "Not a valid twitter Url";
    }
  }

  return {
    error: error,
    isValid: isEmpty(error),
  };
};
