import * as actionTypes from "./actionTypes";

export const getPortSearch = (paylaod) => {
  return {
    type: actionTypes.PORT_SEARCH,
    payload: paylaod,
  };
};

export const savePortSearch = (param) => {
  return (dispatch) => {
    dispatch(getPortSearch(param));
  };
};