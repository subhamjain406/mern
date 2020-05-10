import {
  SET_CURRENT_USER,
  SET_CURRENT_USER_LOADING,
  GET_ALL_USER,
  CLEAR_ALL_USER,
} from "../actions/types";
import isEmpty from "../utility/empty";

const initailState = {
  isAuthenticate: false,
  user: {},
  loading: false,
  users: [],
};

export default function (state = initailState, action) {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticate: !isEmpty(action.payload),
        user: action.payload,
        loading: false,
      };
    case SET_CURRENT_USER_LOADING:
      return {
        ...state,
        loading: true,
      };
    case GET_ALL_USER:
      return {
        ...state,
        users: action.payload,
      };
    case CLEAR_ALL_USER: {
      return {
        ...state,
        users: [],
      };
    }
    default:
      return state;
  }
}
