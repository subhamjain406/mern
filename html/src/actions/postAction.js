import {
  ADD_POST,
  GET_ERRORS,
  GET_POSTS,
  POST_LOADING,
  DELETE_POST,
  GET_POST,
  CLEAR_ERRORS,
} from "./types";
import axios from "axios";

//Add post
export const addPost = (postData) => (dispatch) => {
  axios
    .post("/api/post", postData)
    .then((res) => {
      dispatch({
        type: ADD_POST,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      });
    });
};

//get post
export const getPost = () => (dispatch) => {
  dispatch(setLoadingState());
  axios
    .get("/api/post")
    .then((res) => {
      dispatch({
        type: GET_POSTS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: GET_POSTS,
        payload: {},
      });
    });
};

//get particular post
export const getParticularPost = (id) => (dispatch) => {
  dispatch(setLoadingState());
  axios
    .get("/api/post/" + id)
    .then((res) => {
      dispatch({
        type: GET_POST,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: GET_POST,
        payload: null,
      });
    });
};

//delete post
export const deletePost = (id) => (dispatch) => {
  axios
    .delete("/api/post/" + id)
    .then((res) => {
      dispatch({
        type: DELETE_POST,
        payload: id,
      });
    })
    .catch((err) => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      });
    });
};

//like and unlike post
export const likeAndUnlikePost = (id) => (dispatch) => {
  axios
    .post("/api/post/like/" + id)
    .then((res) => {
      dispatch(getPost());
    })
    .catch((err) => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      });
    });
};

//set loading state
export const setLoadingState = () => {
  return {
    type: POST_LOADING,
  };
};

//clear Error
export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS,
  };
};

//Add comment
export const addComment = (postId, commentData) => (dispatch) => {
  dispatch(clearErrors());
  axios
    .post("/api/post/comment/" + postId, commentData)
    .then((res) => {
      dispatch({
        type: GET_POST,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      });
    });
};

//delete commnet
export const deleteComment = (postId, commentId) => (dispatch) => {
  axios
    .delete("/api/post/comment/" + postId + "/" + commentId)
    .then((res) => {
      dispatch({
        type: GET_POST,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      });
    });
};
