const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/key");
const passport = require("passport");
const validateRegisterInput = require("../../validator/regsiter");
const validateLoginIput = require("../../validator/login");

// Load User Model
const User = require("../../models/userModel");

// @route  Post api/user/register
// @desc   register user
// @access public
router.post("/register", (req, res) => {
  const { error, isValid } = validateRegisterInput(req.body);
  if (!isValid) {
    console.log(isValid);
    res.status(400).json(error);
  } else {
    User.findOne({ email: req.body.email }).then((user) => {
      if (user) {
        return res.status(400).json({ message: "user Already exists" });
      } else {
        const newUser = new User({
          name: req.body.name,
          email: req.body.email,
          password: req.body.password,
          profile_img: req.body.profile_img
            ? req.body.profile_img
            : "https://api.adorable.io/avatars/600/bcd2533e9816efec370c138dced2cef2.png",
        });

        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser
              .save()
              .then((user) => {
                res.json({ status: "Success", user });
              })
              .catch((err) => {
                console.log(err);
              });
          });
        });
      }
    });
  }
});

// @route  Post api/user/login
// @desc   login user / returning jwt token
// @access public
router.post("/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  const { error, isValid } = validateLoginIput(req.body);
  if (!isValid) {
    console.log(isValid);
    res.status(400).json(error);
  } else {
    User.findOne({ email }).then((user) => {
      if (!user) {
        return res.status(400).json({ email: "user not found" });
      } else {
        bcrypt.compare(password, user.password).then((isMatch) => {
          if (isMatch) {
            // user match

            // create jwt payload
            const paylaod = {
              id: user.id,
              name: user.name,
            };

            // sign token
            jwt.sign(
              paylaod,
              keys.secretKey,
              { expiresIn: 3600 },
              (err, token) => {
                res.json({
                  message: "Success",
                  token: "Bearer " + token,
                });
              }
            );
          } else {
            return res
              .status(400)
              .json({ password: "password is not correct" });
          }
        });
      }
    });
  }
});

// @route  Post api/user/current
// @desc   return current user
// @access private
router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const user = {
      id: req.user.id,
      name: req.user.name,
      email: req.user.email,
      profile_img: req.user.profile_img,
    };
    res.json(user);
  }
);

// @route  Post api/user/all
// @desc   return all user
// @access private
router.get(
  "/all",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    User.find(
      {},
      {
        name: 1,
        _id: 1,
        profile_img: 1,
      }
    )
      .then((user) => {
        res.json(user);
      })
      .catch((err) => res.status(404).json(err));
  }
);

module.exports = router;
