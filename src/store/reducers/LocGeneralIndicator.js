import * as actionTypes from "../actions/actionTypes";

const initialState = {};

const saveCurrentGeneralIndicator = (state, action) => ({
    ...state,
    CuurentGeneralIndicator: action.payload,
  });

const CurrentGeneralIndicator = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.CURRENT_GENERALINDICATOR:
    {
        state = saveCurrentGeneralIndicator(state,action);
        break;
    }
  }
  return state;
};

export default CurrentGeneralIndicator;