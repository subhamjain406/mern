import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import propTypes from "prop-types";
import Spinner from "../common/spinner";
import { getParticularPost } from "../../actions/postAction";
import PostItem from "../posts/PostItem";
import { Link } from "react-router-dom";
import CommentForm from "./CommentForm";
import CommentFeed from "./CommentFeed";

const Post = (props) => {
  useEffect(() => {
    props.getParticularPost(props.match.params.id);
  }, []);

  const { post, loading } = props.post;

  let postContent;
  if (post === null || loading || Object.keys(post).length === 0) {
    postContent = <Spinner />;
  } else {
    postContent = (
      <div>
        <PostItem post={post} showAction={false} />
        <CommentForm postId={post._id} />
        <CommentFeed postId={post._id} comments={post.comments} />
      </div>
    );
  }
  return (
    <div className="post">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <Link to="/feed" className="btn btn-light mb-3">
              Back To Feed{" "}
            </Link>
            {postContent}
          </div>
        </div>
      </div>
    </div>
  );
};

Post.propTypes = {
  getParticularPost: propTypes.func.isRequired,
  post: propTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  post: state.post,
});

export default connect(mapStateToProps, { getParticularPost })(Post);
