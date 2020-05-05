import { SET_CURRENT_USER, SET_CURRENT_USER_LOADING } from "../actions/types";
import isEmpty from "../utility/empty";

const initailState = {
  isAuthenticate: false,
  user: {},
  loading: false,
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
    default:
      return state;
  }
}
