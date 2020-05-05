import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import propTypes from "prop-types";
import { addComment } from "../../actions/postAction";
import classnames from "classnames";

const CommentForm = (props) => {
  const [state, setState] = useState({
    text: "",
    errors: {},
  });

  useEffect(
    (state) => {
      setState({ ...state, errors: props.errors });
    },
    [props.errors]
  );

  const onChangeField = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const { user } = props.auth;
    const { postId } = props;

    const newComment = {
      text: state.text,
      name: user.name,
      profile_img: user.profile_img,
    };

    props.addComment(postId, newComment);

    setState({ ...state, text: "" });
  };

  const { errors } = state;
  return (
    <div className="post-form mb-3">
      <div className="card card-info">
        <div className="card-header bg-info text-white">Make a comment...</div>
        <div className="card-body">
          <form onSubmit={onSubmit}>
            <div className="form-group">
              <textarea
                className={classnames("form-control form-control-lg", {
                  "is-invalid": errors && errors.text,
                })}
                placeholder="Replt to post"
                name="text"
                value={state.text}
                onChange={onChangeField}
              ></textarea>
              <div className="invalid-feedback">{errors.text}</div>
            </div>
            <button type="submit" className="btn btn-dark">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

CommentForm.propTypes = {
  errors: propTypes.object.isRequired,
  addPost: propTypes.func.isRequired,
  auth: propTypes.object.isRequired,
  postId: propTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});

export default connect(mapStateToProps, { addComment })(CommentForm);
