import * as actionTypes from "../actions/actionTypes";

const initialState = {};

const saveSearchRes = (state, action) => ({
  ...state,
  searchData: action.payload,
});
const getSearchRes = (state, action) => ({
  ...state,
});

const SearchResults = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SAVE_SEARCH_RES:
      return saveSearchRes(state, action);
    case actionTypes.GET_SEARCH_RES:
      return getSearchRes(state, action);
    default:
      return state;
  }
};

export default SearchResults;
