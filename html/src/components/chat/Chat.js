import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import propTypes from "prop-types";
import io from "socket.io-client";
import "./Chat.css";
import InfoBar from "./InfoBar/InfoBar";
import Input from "./Input/Input";
import Message from "./Message/Message";

let socket;
const Endpoint = "localhost:5000";

const Chat = (props) => {
  const { user } = props.auth;

  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    socket = io(Endpoint);

    if (socket) {
      socket.emit("join", user.id, user.name, "developer_room", () => {});
    }

    return () => {
      console.log("offline");
      socket.emit("disconnection", user.id);

      socket.off();
    };
  }, []);

  useEffect(() => {
    socket.on("message", (message) => {
      setMessages([...messages, message]);
    });
  }, [messages]);

  const sendMessage = (event) => {
    event.preventDefault();
    if (message) {
      socket.emit("sendMessage", user.id, message, () => {
        setMessage("");
      });
      console.log(messages);
    }
  };

  console.log(message, messages);

  return (
    <div className="outerContainer">
      <div className="innercontainer">
        <InfoBar room="developer Room" />
        <Message messages={messages} />
        <Input
          message={message}
          setMessage={setMessage}
          sendMessage={sendMessage}
        />
      </div>
    </div>
  );
};

Chat.propTypes = {
  auth: propTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(Chat);
