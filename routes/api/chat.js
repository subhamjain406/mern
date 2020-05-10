const express = require("express");
const router = express.Router();
const passport = require("passport");

const Chat = require("../../models/chatModel");

// @route  get api/chat
// @desc   get all chat
// @access private
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Chat.find()
      .populate("sender")
      .then((chat) => {
        res.status(200).json(chat);
      })
      .catch((err) => res.status(404).json(err));
  }
);

// @route  get api/chat/:room
// @desc   get all chat
// @access private
router.get(
  "/:receiver",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Chat.find({
      $or: [{ sender: req.params.receiver }, { receiver: req.params.receiver }],
    })
      .then((chat) => {
        res.json(chat);
      })
      .catch((err) => res.status(404).json(err));
  }
);

module.exports = router;
