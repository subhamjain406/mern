const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
var cors = require("cors");
var path = require("path");
const socketio = require("socket.io");
const http = require("http");
const Chat = require("./models/chatModel");

const user = require("./routes/api/user");
const profile = require("./routes/api/profile");
const post = require("./routes/api/post");
const chat = require("./routes/api/chat");
const { addUser, removeUser } = require("./chat_users");

const app = express();

//body parser middleware
app.use(
  bodyParser.urlencoded({
    extended: false,
    limit: "500mb",
    parameterLimit: 10000000000,
  })
);
app.use(
  bodyParser.json({
    extended: false,
    limit: "50mb",
  })
);

//Cors middleware
app.use(cors());
app.use((req, res, next) => {
  res.append("Access-Control-Allow-Origin", "http://localhost:3000");
  res.append("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.append(
    "Access-Control-Allow-Headers",
    "Origin, Accept,Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers"
  );
  res.append("Access-Control-Allow-Credentials", true);
  next();
});

// Db url
const db = require("./config/key").mongoUrl;

//db connect
mongoose
  .connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => console.log("mongodb connected"))
  .catch((err) => console.log(err));

//passport middleware
app.use(passport.initialize());

// passport config
require("./config/passport.js")(passport);

//use Routes
app.use("/api/user", user);
app.use("/api/profile", profile);
app.use("/api/post", post);
app.use("/api/chat", chat);

// Serve static files from the React frontend app
app.use(express.static(path.join(__dirname, "html/build")));
// Anything that doesn't match the above, send back index.html
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/html/build/index.html"));
});

const port = process.env.PORT || 5000;

const server = http.createServer(app);

//socket integration
const io = socketio(server);

var sessionUsers = [];
var userConnected = [];

//socket event
io.on("connection", (socket) => {
  //join user
  socket.on("join", (id, callback) => {
    sessionUsers[id] = socket.id;
    console.log(sessionUsers);
    userConnected.push(id);

    // socket.emit("message", {
    //   user: "admin",
    //   text: `${user.name}, welcome to the room`,
    // })

    // socket.join(sessionUsers[id]);

    io.emit("user_connected", userConnected);

    // io.to(user.room).emit("roomData", {
    //   room: user.room,
    //   users: getUsersInRoom(user.room),
    // });

    callback();
  });

  //send message
  socket.on("sendMessage", (id, message, type, receiver, callback) => {
    try {
      const chat = new Chat({
        sender: id,
        message: message,
        type: type,
        receiver: receiver,
      });
      chat.save((err, doc) => {
        if (err) return res.json({ err });

        Chat.findOne({ _id: doc._id }).exec((err, doc) => {
          console.log("emmiting message", sessionUsers[doc.receiver]);
          return io.to(sessionUsers[doc.receiver]).emit("message", doc);
        });
      });
    } catch (error) {
      console.log(error);
    }
    callback();
  });

  //socket disconnect
  socket.on("disconnection", (id) => {
    if (sessionUsers[id]) {
      delete sessionUsers[id];
    }
    const index = userConnected.findIndex((item) => item == id);
    if (index > -1) {
      userConnected.splice(index, 1);
      io.emit("user_connected", userConnected);
    } else {
      io.emit("user_connected", userConnected);
    }
  });
});

server.listen(port, () => console.log("server running"));
