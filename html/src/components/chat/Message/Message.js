import React from "react";
import ScrollToBottom from "react-scroll-to-bottom";
import MessageSingle from "./MessageSingle/MessageSingle";

const Message = ({ messages }) => {
  return (
    <ScrollToBottom>
      <div className="messages">
        {messages.map((message, i) => (
          <div key={i}>
            <MessageSingle message={message} name={message.user} />
          </div>
        ))}
      </div>
    </ScrollToBottom>
  );
};

export default Message;
