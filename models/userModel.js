const mongoose = require("mongoose");
const schema = mongoose.Schema;

//create schema
const userSchema = new schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});

module.exports = User = mongoose.model("users", userSchema);
