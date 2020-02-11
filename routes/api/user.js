const express = require("express");
const router = express.Router();

// @route  Get api/user/test
// @desc   test user api
// @access public
router.get("/test", (req, res) => res.json({ msg: "user is working" }));

module.exports = router;
