const mongoose = require("mongoose");
const schema = mongoose.Schema;

//create schema
const chatSchema = new schema({
  sender: {
    type: schema.Types.ObjectId,
    ref: "users",
  },
  message: {
    type: String,
  },
  type: {
    type: String,
  },
  receiver: {
    type: String,
  },
});

module.exports = Chat = mongoose.model("chat", chatSchema);
