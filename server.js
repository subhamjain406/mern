const express = require("express");
const mongoose = require("mongoose");

const user = require("./routes/api/user");
const profile = require("./routes/api/profile");
const post = require("./routes/api/post");

const app = express();

// Db url
const db = require("./config/key").mongoUrl;

//db connect
mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("mongodb connected"))
  .catch(err => console.log(err));

app.get("/", (req, res) => res.send("hello"));

//use Routes
app.use("/api/user", user);
// app.use("/api/profile", profile);
// app.use("/api/post", post);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log("server running"));
