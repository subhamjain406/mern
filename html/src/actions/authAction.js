import {
  GET_ERRORS,
  SET_CURRENT_USER,
  SET_CURRENT_USER_LOADING,
  CLEAR_ERRORS,
  GET_ALL_USER,
} from "./types";
import axios from "axios";
import setAuthToken from "../utility/setAuthToken";
import jwt_decode from "jwt-decode";

//register User
export const registerUser = (userData, history) => (dispatch) => {
  axios
    .post("/api/user/register", userData)
    .then((data) => {
      console.log(data);
      dispatch({
        type: CLEAR_ERRORS,
      });
      history.push("/login");
    })
    .catch((err) => {
      console.log(err.response.data);
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      });
    });
};

//Login User
export const loginUser = (userData) => (dispatch) => {
  dispatch(setloginLoader());
  axios
    .post("/api/user/login", userData)
    .then((data) => {
      console.log(data);

      //Save to local Storage
      localStorage.setItem("token", data.data.token);

      //Set token to auth header
      setAuthToken(data.data.token);

      //decode token
      const decoded = jwt_decode(data.data.token);

      //get current user data
      axios
        .get("/api/user/current")
        .then((data) => {
          //set current user
          dispatch(setCurrentUser(data.data));
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => {
      console.log(err.response.data);
      dispatch({
        type: SET_CURRENT_USER,
        payload: {},
      });
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      });
    });
};

//setCurrent user function
export const setCurrentUser = (data) => {
  return {
    type: SET_CURRENT_USER,
    payload: data,
  };
};

//logouit current user
export const logoutUser = (history) => (dispatch) => {
  localStorage.removeItem("token");

  //remove auth header
  setAuthToken(false);

  // set current user to {}
  dispatch(setCurrentUser({}));

  history.push("/");
};

//set laoder for user login
export const setloginLoader = () => {
  return {
    type: SET_CURRENT_USER_LOADING,
  };
};

//get all user
export const getAllUser = () => (dispatch) => {
  axios
    .get("/api/user/all")
    .then((data) => {
      console.log(data);
      dispatch({
        type: GET_ALL_USER,
        payload: data.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      });
    });
};
