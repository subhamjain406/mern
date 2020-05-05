import React from "react";
import propTypes from "prop-types";
import CommentItem from "./CommentItem";

const CommentFeed = (props) => {
  const { comments, postId } = props;
  return comments.map((comment) => (
    <CommentItem key={comment._id} comment={comment} postId={postId} />
  ));
};

CommentFeed.propTypes = {
  comments: propTypes.array.isRequired,
  postId: propTypes.string.isRequired,
};

export default CommentFeed;
