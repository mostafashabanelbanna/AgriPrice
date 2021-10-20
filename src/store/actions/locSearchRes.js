import axios from "axios";
import * as actionTypes from "./actionTypes";

export const getSearchRes = (paylaod) => {
  return {
    type: actionTypes.SAVE_SEARCH_RES,
    payload: paylaod,
  };
};

export const saveSearchRes = (param) => {
  return (dispatch) => {
    dispatch(getSearchRes(param));
  };
};
