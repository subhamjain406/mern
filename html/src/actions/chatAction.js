import { GET_CHATS, GET_ERRORS, CLEAR_ALL_USER, CLEAR_CHATS } from "./types";
import axios from "axios";

//get chat
export const getChat = () => (dispatch) => {
  axios
    .get("/api/chat")
    .then((res) => {
      dispatch({
        type: GET_CHATS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: GET_CHATS,
        payload: err.data,
      });
    });
};

export const getRoomChat = (receiver) => (dispatch) => {
  axios
    .get("/api/chat/" + receiver)
    .then((res) => {
      dispatch({
        type: GET_CHATS,
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

export const clearChat = () => (dispatch) => {
  dispatch({
    type: CLEAR_CHATS,
  });
};

export const clearUSERS = () => (dispatch) => {
  dispatch({
    type: CLEAR_ALL_USER,
  });
};
