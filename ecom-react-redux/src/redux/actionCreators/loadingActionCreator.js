import { HIDE_LOADING, SHOW_LOADING } from "../actionTypes/loadingActionType";

export const AC_show_loading = () => {
  return {
    type: SHOW_LOADING,
    payload: true,
  };
};
export const AC_hide_loading = () => {
  return {
    type: HIDE_LOADING,
    payload: false,
  };
};
