const mongoose = require("mongoose");
const schema = mongoose.Schema;

//create schema
const userSchema = new schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  profile_img: {
    type: String,
    default: "",
  },
});

module.exports = User = mongoose.model("users", userSchema);
