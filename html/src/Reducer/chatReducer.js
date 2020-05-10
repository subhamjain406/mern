import { GET_CHATS, CLEAR_CHATS } from "../actions/types";

const initialState = {
  chats: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_CHATS:
      return {
        ...state,
        chats: action.payload,
      };
    case CLEAR_CHATS:
      return {
        ...state,
        chats: [],
      };
    default:
      return state;
  }
};
