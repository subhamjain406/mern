import React from "react";
import { connect } from "react-redux";
import classnames from "classnames";
import { Link } from "react-router-dom";
import propTypes from "prop-types";
import { deletePost, likeAndUnlikePost } from "../../actions/postAction";

const PostItem = (props) => {
  const { post, auth, showAction } = props;

  const onDelete = (id) => {
    props.deletePost(id);
  };

  const likeAndUnlike = (id) => {
    props.likeAndUnlikePost(id);
  };

  const findUserLike = (likes) => {
    if (likes.filter((like) => like.user === auth.user.id).length > 0) {
      return true;
    } else {
      return false;
    }
  };
  return (
    <div className="card card-body mb-3">
      <div className="row">
        <div className="col-md-2">
          <a href="profile.html">
            <img
              className="rounded-circle d-none d-md-block"
              src={post.profile_img}
              alt=""
              style={{ width: "120px", height: "120px" }}
            />
          </a>
          <br />
          <p className="text-center">{post.name}</p>
        </div>
        <div className="col-md-10">
          <p className="lead">{post.text}</p>
          {showAction ? (
            <span>
              <button
                type="button"
                className="btn btn-light mr-1"
                onClick={() => likeAndUnlike(post._id)}
              >
                <i
                  className={classnames("fas fa-thumbs-up", {
                    "text-info": findUserLike(post.likes),
                  })}
                ></i>
                <span className="badge badge-light">{post.likes.length}</span>
              </button>
              <Link to={`/post/${post._id}`} className="btn btn-info mr-1">
                Comments
              </Link>
              {post.user === auth.user.id ? (
                <button
                  type="button"
                  className="btn btn-danger mr-1"
                  onClick={() => onDelete(post._id)}
                >
                  <i className="fas fa-times" />
                </button>
              ) : null}
            </span>
          ) : null}
        </div>
      </div>
    </div>
  );
};

PostItem.defaultProps = {
  showAction: true,
};

PostItem.propTypes = {
  deletePost: propTypes.func.isRequired,
  likeAndUnlikePost: propTypes.func.isRequired,
  post: propTypes.object.isRequired,
  auth: propTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { deletePost, likeAndUnlikePost })(
  PostItem
);
