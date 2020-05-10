import React from "react";
import { connect } from "react-redux";
import propTypes from "prop-types";
import ReactEmoji from "react-emoji";

const MessageSingle = (props) => {
  let isSendByCurrentUser = false;
  let showMessage = false;
  const { user } = props.auth;
  const { message } = props;
  if (user.id == message.sender) {
    isSendByCurrentUser = true;
  }
  if (user.id == message.sender || user.id == message.receiver) {
    showMessage = true;
  }
  return showMessage ? (
    !isSendByCurrentUser ? (
      <div className="media w-50 mb-3">
        <div className="media-body ml-3">
          <div className="bg-light rounded py-2 px-3 mb-2">
            <p className="text-small mb-0 text-muted text-message">
              {ReactEmoji.emojify(message.message)}
            </p>
          </div>
        </div>
      </div>
    ) : (
      <div className="media w-50 ml-auto mb-3">
        <div className="media-body">
          <div className="bg-primary rounded py-2 px-3 mb-2">
            <p className="text-small mb-0 text-white text-message">
              {ReactEmoji.emojify(message.message)}
            </p>
          </div>
        </div>
      </div>
    )
  ) : null;
};

MessageSingle.propTypes = {
  auth: propTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(MessageSingle);
