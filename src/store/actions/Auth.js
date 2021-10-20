import { axios } from "../../components/Axios/Axios";
import * as actionTypes from "./actionTypes";
export const getLoginData = (paylaod) => {
  return {
    type: actionTypes.LOGIN,
    payload: paylaod,
  };
};

export const saveLoginData = (param) => {
  return (dispatch) => {
    dispatch(getLoginData(param));
  };
};
