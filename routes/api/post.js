const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

const Post = require("../../models/postModel");
const Profile = require("../../models/profileModel");

const validatePostHandle = require("../../validator/post");
const validatePostCommentHandle = require("../../validator/postComment");

// @route  get api/post
// @desc   get post
// @access public
router.get("/", (req, res) => {
  Post.find()
    .sort({ date: -1 })
    .then((posts) => res.json(posts))
    .catch((err) => res.status(404).json("no posts found"));
});

// @route  get api/post/:id
// @desc   get particular post
// @access public
router.get("/:id", (req, res) => {
  Post.findById(req.params.id)
    .then((post) => res.json(post))
    .catch((err) => res.status(404).json("no post found for that idea"));
});

// @route  Post api/post
// @desc   create post
// @access private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { error, isValid } = validatePostHandle(req.body);
    if (!isValid) {
      return res.status(400).json(error);
    }
    const newPost = new Post({
      text: req.body.text,
      name: req.body.name,
      profile_img: req.body.profile_img,
      user: req.user.id,
    });

    newPost.save().then((post) => res.json(post));
  }
);

// @route  Delte api/post/:id
// @desc   delete particular post
// @access private
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then((profile) => {
      Post.findById(req.params.id)
        .then((post) => {
          if (post.user.toString() !== req.user.id) {
            return res.status(401).json("user not authorized");
          }
          post.remove().then(() => {
            res.json("success");
          });
        })
        .catch((err) => {
          res.status(400).json("post not found");
        });
    });
  }
);

// @route  Post api/post/like/:id
// @desc   like/unlike particular post
// @access private
router.post(
  "/like/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id })
      .then((profile) => {
        Post.findById(req.params.id)
          .then((post) => {
            const removeIndex = post.likes.findIndex(
              ({ user }) => user.toString() === req.user.id
            );
            if (removeIndex > -1) {
              post.likes.splice(removeIndex, 1);
            } else {
              post.likes.unshift({ user: req.user.id });
            }
            post.save().then((post) => res.json(post));
          })
          .catch((err) => {
            res.status(400).json("post not found");
          });
      })
      .catch((err) => {
        res.status(400).json("user not found");
      });
  }
);

// @route  Post api/post/comment/:id
// @desc   comment particular post
// @access private
router.post(
  "/comment/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Post.findById(req.params.id)
      .then((post) => {
        const { error, isValid } = validatePostCommentHandle(req.body);
        if (!isValid) {
          return res.status(400).json(error);
        }
        const newComment = {
          text: req.body.text,
          user: req.user.id,
          name: req.body.name,
          profile_img: req.body.profile_img,
        };
        post.comments.unshift(newComment);
        post.save().then((post) => res.json(post));
      })
      .catch((err) => {
        res.json("post not found");
      });
  }
);

// @route  delete api/post/comment/:id/:comment_id
// @desc   comment particular post
// @access private
router.delete(
  "/comment/:id/:comment_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Post.findById(req.params.id)
      .then((post) => {
        const removeIndex = post.comments.findIndex(
          ({ id }) => id.toString() === req.params.comment_id
        );
        if (removeIndex > -1) {
          post.comments.splice(removeIndex, 1);
        } else {
          return res.status(404).json("comment not found");
        }
        post.save().then((post) => res.json(post));
      })
      .catch((err) => {
        res.json("post not found");
      });
  }
);

module.exports = router;
