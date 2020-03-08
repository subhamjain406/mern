const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");

const user = require("./routes/api/user");
const profile = require("./routes/api/profile");
const post = require("./routes/api/post");

const app = express();

//body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Db url
const db = require("./config/key").mongoUrl;

//db connect
mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("mongodb connected"))
  .catch(err => console.log(err));

//passport middleware
app.use(passport.initialize());

// passport config
require("./config/passport.js")(passport);

//use Routes
app.use("/api/user", user);
// app.use("/api/profile", profile);
// app.use("/api/post", post);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log("server running"));
