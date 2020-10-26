import { HIDE_LOADING, SHOW_LOADING } from "../actionTypes/loadingActionType";

const initialState = {
  showLoading: false,
};
export const globalLoadingReducer = (state = initialState, action) => {
  switch (action.type) {
    case SHOW_LOADING:
      return {
        ...state,
        showLoading: action.payload,
      };
    case HIDE_LOADING:
      return {
        ...state,
        showLoading: action.payload,
      };

    default:
      return state;
  }
};
