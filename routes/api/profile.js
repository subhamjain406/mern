const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");
const validateProfileInput = require("../../validator/profile");
const validateExperienceInput = require("../../validator/experience");
const validateEducationInput = require("../../validator/education");

//Load profile Model
const Profile = require("../../models/profileModel");

//Load user Model
const User = require("../../models/userModel");

// @route  Get api/profile
// @desc   return current user profile
// @access private
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errrors = {};
    Profile.findOne({ user: req.user.id })
      .populate("user", ["name", "email"])
      .then((profile) => {
        if (!profile) {
          errrors.no_profile = "There is no Profile for this user";
          return res.status(404).json(errrors);
        }
        res.json(profile);
      })
      .catch((err) => {
        res.status(404).json(err);
      });
  }
);

// @route  GEt api/profile/handle/:handle
// @desc   get user profile based on handle
// @access public
router.get("/handle/:handle", (req, res) => {
  const errors = {};
  Profile.findOne({ handle: req.params.handle })
    .populate("user")
    .then((profile) => {
      if (!profile) {
        errors.noprofile = "there is no profile for this user";
        res.status(404).json(errors);
      }
      res.json(profile);
    })
    .catch((err) => {
      errors.noprofile = "there is no profile for this user";
      res.status(404).json(errors);
    });
});

// @route  GEt api/profile/user/:user_id
// @desc   get user profile based on user id
// @access public
router.get("/user/:user_id", (req, res) => {
  const errors = {};
  Profile.findOne({ user: req.params.user_id })
    .populate("user")
    .then((profile) => {
      if (!profile) {
        errors.noprofile = "there is no profile for this user";
        res.status(404).json(errors);
      }
      res.json(profile);
    })
    .catch((err) => {
      errors.noprofile = "there is no profile for this user";
      res.status(404).json(errors);
    });
});

// @route  GEt api/profile/all
// @desc   get all user profile
// @access public
router.get("/all", (req, res) => {
  const errors = {};
  Profile.find()
    .populate("user")
    .then((profile) => {
      if (!profile) {
        errors.noprofile = "there is no profile";
        res.status(404).json(errors);
      }
      res.json(profile);
    })
    .catch((err) => {
      errors.noprofile = "there is no profile";
      res.status(404).json(errors);
    });
});

// @route  Post api/profile
// @desc   create and update user profile
// @access private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errrors = {};
    const { error, isValid } = validateProfileInput(req.body);

    if (!isValid) {
      res.status(400).json(error);
    }

    const profile_fields = {};
    profile_fields.user = req.user.id;
    if (req.body.handle) profile_fields.handle = req.body.handle;
    if (req.body.company) profile_fields.company = req.body.company;
    if (req.body.website) profile_fields.website = req.body.website;
    if (req.body.location) profile_fields.location = req.body.location;
    if (req.body.status) profile_fields.status = req.body.status;
    if (req.body.bio) profile_fields.bio = req.body.bio;
    if (req.body.githubusername)
      profile_fields.githubusername = req.body.githubusername;

    //Skills fields
    if (typeof req.body.skills !== undefined)
      profile_fields.skills = req.body.skills.split(",");

    //Social fields
    profile_fields.social = {};
    if (req.body.youtube) profile_fields.social.youtube = req.body.youtube;
    if (req.body.facebook) profile_fields.social.facebook = req.body.facebook;
    if (req.body.twitter) profile_fields.social.twitter = req.body.twitter;
    if (req.body.linkedin) profile_fields.social.linkedin = req.body.linkedin;

    Profile.findOne({ user: req.user.id }).then((profile) => {
      if (profile) {
        //Update
        Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profile_fields },
          { new: true }
        )
          .then((profile) => {
            console.log("update done");
            res.json(profile);
          })
          .catch((err) => console.log(err));
      } else {
        //create

        //Check if handle exits
        Profile.findOne({ handle: profile_fields.handle }).then((profile) => {
          if (profile) {
            errrors.handle = "that handle already exists";
            res.status(400).json(errrors);
          } else {
            new Profile(profile_fields)
              .save()
              .then((profile) => res.json(profile));
          }
        });
      }
    });
  }
);

// @route  Post api/profile/experience
// @desc   add experience to profile
// @access private
router.post(
  "/experience",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then((profile) => {
      const { error, isValid } = validateExperienceInput(req.body);
      if (!isValid) {
        res.status(400).json(error);
      }
      const newExp = {
        title: req.body.title,
        website: req.body.website,
        company: req.body.company,
        location: req.body.location,
        from: req.body.from,
        to: req.body.to,
        current: req.body.current,
        desc: req.body.description,
      };

      //add to experience array
      profile.experience.unshift(newExp);

      profile.save().then((profile) => res.json(profile));
    });
  }
);

// @route  Post api/profile/education
// @desc   add education to profile
// @access private
router.post(
  "/education",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then((profile) => {
      const { error, isValid } = validateEducationInput(req.body);
      if (!isValid) {
        res.status(400).json(error);
      }
      const newEd = {
        school: req.body.school,
        degree: req.body.degree,
        fieldofstudy: req.body.fieldofstudy,
        from: req.body.from,
        to: req.body.to,
        current: req.body.current,
        desc: req.body.description,
      };

      //add to experience array
      profile.education.unshift(newEd);

      profile.save().then((profile) => res.json(profile));
    });
  }
);

// @route  delete api/profile/experience/:exp:id
// @desc   delete experience to profile
// @access private
router.delete(
  "/experience/:exp_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then((profile) => {
      //get remove Index
      const removeIndex = profile.experience
        .map((item) => item.id)
        .indexOf(req.params.exp_id);

      //splice experience
      profile.experience.splice(removeIndex, 1);

      profile.save().then((profile) => res.json(profile));
    });
  }
);

// @route  delete api/profile/education/:ed:id
// @desc   delete education to profile
// @access private
router.delete(
  "/education/:ed_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then((profile) => {
      //get remove Index
      const removeIndex = profile.education.findIndex(
        ({ id }) => id === req.params.ed_id
      );
      // .map((item) => item.id)
      // .indexOf(req.params.ed_id);

      //splice education
      profile.education.splice(removeIndex, 1);

      profile.save().then((profile) => res.json(profile));
    });
  }
);

// @route  delete api/profile
// @desc   delete user and profile
// @access private
router.delete(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOneAndRemove({ user: req.user.id }).then(() => {
      User.findOneAndRemove({ _id: req.user.id }).then(() =>
        res.json({ success: true })
      );
    });
  }
);

module.exports = router;
