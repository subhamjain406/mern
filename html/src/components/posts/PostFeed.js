import React from "react";
import propTypes from "prop-types";
import PostItem from "./PostItem";

const PostFeed = (props) => {
  const { posts } = props;
  return posts.map((post) => <PostItem key={post._id} post={post} />);
};

PostFeed.propTypes = {
  posts: propTypes.array.isRequired,
};

export default PostFeed;
