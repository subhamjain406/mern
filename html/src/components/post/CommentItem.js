import React from "react";
import { connect } from "react-redux";
import propTypes from "prop-types";
import { deleteComment } from "../../actions/postAction";

const CommentItem = (props) => {
  const { comment, postId, auth } = props;

  const onDelete = (postId, commentId) => {
    props.deleteComment(postId, commentId);
  };
  return (
    <div className="card card-body mb-3">
      <div className="row">
        <div className="col-md-2">
          <a href="profile.html">
            <img
              className="rounded-circle d-none d-md-block"
              src={comment.profile_img}
              alt=""
              style={{ width: "120px", height: "120px" }}
            />
          </a>
          <br />
          <p className="text-center">{comment.name}</p>
        </div>
        <div className="col-md-10">
          <p className="lead">{comment.text}</p>
          {comment.user === auth.user.id ? (
            <button
              type="button"
              className="btn btn-danger mr-1"
              onClick={() => onDelete(postId, comment._id)}
            >
              <i className="fas fa-times" />
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );
};

CommentItem.propTypes = {
  deleteComment: propTypes.func.isRequired,
  auth: propTypes.object.isRequired,
  comment: propTypes.object.isRequired,
  postId: propTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { deleteComment })(CommentItem);
