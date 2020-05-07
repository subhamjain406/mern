import React from "react";
import "./MessageSingle.css";
import { connect } from "react-redux";
import propTypes from "prop-types";
import ReactEmoji from "react-emoji";

const MessageSingle = (props) => {
  let isSendByCurrentUser = false;
  const { user } = props.auth;
  const { message, name } = props;
  if (user.name == name) {
    isSendByCurrentUser = true;
  }
  return isSendByCurrentUser ? (
    <div className="messageContainer justifyEnd">
      <p className="sentText pr-10">{user.name}</p>
      <div className="messageBox backgroundBlue">
        <p className="messageText colorWhite">
          {ReactEmoji.emojify(message.text)}
        </p>
      </div>
    </div>
  ) : (
    <div className="messageContainer justifyStart">
      <div className="messageBox backgroundLight">
        <p className="messageText colorDark">
          {ReactEmoji.emojify(message.text)}
        </p>
      </div>
      <p className="sentText pl-10">{name}</p>
    </div>
  );
};

MessageSingle.propTypes = {
  auth: propTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(MessageSingle);
