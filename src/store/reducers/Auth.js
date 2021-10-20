import * as actionTypes from "../actions/actionTypes";
const initialState = {};
const saveLoginData = (state = initialState, action) => ({
  ...state,
  CuurentLoginData: action.payload,
});

const CurrentLoginData = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LOGIN: {
      state = saveLoginData(state, action);
      break;
    }
  }
  return state;
};

export default CurrentLoginData;
