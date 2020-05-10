import React from "react";
import ScrollToBottom from "react-scroll-to-bottom";
import MessageSingle from "./MessageSingle/MessageSingle";

const Message = ({ messages, receiverId }) => {
  return (
    <ScrollToBottom className="chat-box">
      <div className="px-4 py-5 bg-white">
        {receiverId
          ? messages.map((message, i) => (
              <div key={i}>
                <MessageSingle message={message} />
              </div>
            ))
          : null}
      </div>
    </ScrollToBottom>
  );
};

export default Message;
