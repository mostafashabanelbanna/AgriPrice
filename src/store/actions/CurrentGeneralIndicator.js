import axios from "axios";
import * as actionTypes from "./actionTypes";

export const getCuurentGeneralIndicator = (paylaod) => {
  return {
    type: actionTypes.CURRENT_GENERALINDICATOR,
    payload: paylaod,
  };
};

export const saveCurrentGeneralIndicator = (param) => {
  return (dispatch) => {
    dispatch(getCuurentGeneralIndicator(param));
  };
};