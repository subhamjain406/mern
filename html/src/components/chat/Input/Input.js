import React from "react";
import "./Input.css";

const Input = ({ message, setMessage, sendMessage }) => {
  return (
    // <form className="form">
    //   <input
    //     className="input"
    //     type="text"
    //     placeholder="Type a message"
    //     value={message}
    //     onChange={(event) => setMessage(event.target.value)}
    //     onKeyPress={(event) =>
    //       event.key === "Enter" ? sendMessage(event) : null
    //     }
    //   />
    //   <button className="sendButton" onClick={(event) => sendMessage(event)}>
    //     Send
    //   </button>
    // </form>
    <div className="input-group">
      <input
        type="text"
        placeholder="Type a message"
        aria-describedby="button-addon2"
        className="form-control rounded-0 border-0 py-4 bg-light"
        value={message}
        onChange={(event) => setMessage(event.target.value)}
        onKeyPress={(event) =>
          event.key === "Enter" ? sendMessage(event) : null
        }
      />
      <div className="input-group-append">
        <button
          id="button-addon2"
          type="submit"
          className="btn btn-link"
          onClick={(event) => sendMessage(event)}
        >
          {" "}
          <i className="fa fa-paper-plane"></i>
        </button>
      </div>
    </div>
  );
};

export default Input;
