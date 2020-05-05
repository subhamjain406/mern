import React, { useEffect } from "react";
import { connect } from "react-redux";
import PostsForm from "./PostsForm";
import Spinner from "../common/spinner";
import propTypes from "prop-types";
import { getPost } from "../../actions/postAction";
import PostFeed from "./PostFeed";

const Posts = (props) => {
  useEffect(() => {
    props.getPost();
  }, []);

  const { posts, loading } = props.post;

  let postContent;
  if (posts === null || loading) {
    postContent = <Spinner />;
  } else {
    postContent = <PostFeed posts={posts} />;
  }

  return (
    <div className="post">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <PostsForm />
            {postContent}
          </div>
        </div>
      </div>
    </div>
  );
};

Posts.propTypes = {
  post: propTypes.object.isRequired,
  getPost: propTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  post: state.post,
});

export default connect(mapStateToProps, { getPost })(Posts);
