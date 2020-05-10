import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import propTypes from "prop-types";
import io from "socket.io-client";
import Input from "./Input/Input";
import Message from "./Message/Message";
import {
  getChat,
  getRoomChat,
  clearChat,
  clearUSERS,
} from "../../actions/chatAction";
import { getAllUser } from "../../actions/authAction";
import Member from "./Member/Member";
import Spinner from "../common/spinner";

let socket;
let receiverId = "";
const Endpoint = "localhost:5000";
// const Endpoint = "https://blooming-hollows-76971.herokuapp.com/";

const Chat = (props) => {
  const { user, users } = props.auth;
  const { chats } = props.chat;

  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [userConnected, setUserConnected] = useState([]);

  useEffect(() => {
    socket = io(Endpoint);

    if (socket) {
      socket.emit("join", user.id, () => {});
    }

    props.getAllUser();

    return () => {
      socket.emit("disconnection", user.id);

      socket.off();
      props.clearChat();
      receiverId = "";
    };
  }, []);

  // useEffect(() => {
  //   socket.on("message", (message) => {
  //     setMessages([...messages, message]);
  //   });
  // }, [messages]);

  useEffect(() => {
    setMessages(chats, ...messages);
  }, [chats]);

  useEffect(() => {
    socket.on("user_connected", (userConnected) => {
      console.log(userConnected);
      setUserConnected(userConnected);
    });
  }, [userConnected]);

  const sendMessage = (event) => {
    event.preventDefault();
    if (message) {
      socket.emit("sendMessage", user.id, message, "text", receiverId, () => {
        setMessage("");
        setMessages([
          ...messages,
          {
            sender: user.id,
            message: message,
            type: "text",
            receiver: receiverId,
          },
        ]);
      });
    }
  };

  const onClick = (receiver, event) => {
    event.preventDefault();
    if (receiver) {
      receiverId = receiver._id;
      props.getRoomChat(receiverId);
    }
  };

  return (
    <div className="container py-3 px-3">
      <header className="text-center">
        <h1 className="display-4 text-dark">Chat</h1>
      </header>
      <div className="row rounded-lg overflow-hidden shadow">
        <div className="col-5 px-0">
          <div className="bg-white">
            <div className="bg-gray px-4 py-2 bg-light">
              <p className="h5 mb-0 py-1">Member</p>
            </div>
            <div className="messages-box">
              <div className="list-group rounded-0">
                {users.length !== 0 ? (
                  users.map((item, i) =>
                    user.id !== item._id ? (
                      <Member
                        key={i}
                        user={item}
                        click={onClick}
                        selected={receiverId === item._id}
                        userConnected={userConnected}
                      />
                    ) : null
                  )
                ) : (
                  <Spinner />
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="col-7 px-0">
          {messages.length > 0 ? (
            <Message messages={messages} receiverId={receiverId} />
          ) : (
            <div className="px-4 py-5 chat-box bg-white"></div>
          )}
          <Input
            message={message}
            setMessage={setMessage}
            sendMessage={sendMessage}
          />
        </div>
      </div>
    </div>
  );
};

Chat.propTypes = {
  getChat: propTypes.func.isRequired,
  getAllUser: propTypes.func.isRequired,
  getRoomChat: propTypes.func.isRequired,
  clearChat: propTypes.func.isRequired,
  clearUSERS: propTypes.func.isRequired,
  auth: propTypes.object.isRequired,
  chat: propTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  chat: state.chat,
});

export default connect(mapStateToProps, {
  getChat,
  getAllUser,
  getRoomChat,
  clearUSERS,
  clearChat,
})(Chat);
