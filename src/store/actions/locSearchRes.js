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

// export const fetchCompanyInfo = ( param ) => {
//     return dispatch => {
//         dispatch(loadCompanyInfo());
//         axios.get(CURRENT_URL+`${param}`)
//         .then(response => {
//             console.log(response.data.data)
//             // console.log(response.data.response.success);
//             if(!response.data.status) {
//                 throw new Error("Sorry, you are not subscribe");
//             }
//             localStorage.setItem('CID', response.data.data.cid);
//             localStorage.setItem('companyName', response.data.data.Name);
//             dispatch(companyInfoSuccess(param, response.data.data));
//         })
//         .catch(error => {
//             dispatch(companyInfoFail(error))
//         })
//     }
// }
