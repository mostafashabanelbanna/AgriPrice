import * as actionTypes from "../actions/actionTypes";

const initialState = {};

const savePortSearch = (state, action) => ({
    ...state,
    CurPortSearch: action.payload,
  });

const PortSearch = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.PORT_SEARCH:
    {
        state = savePortSearch(state,action);
        break;
    }
  }
  return state;
};

export default PortSearch;