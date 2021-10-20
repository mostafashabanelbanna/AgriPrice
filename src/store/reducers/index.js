import { combineReducers } from "redux";
import LocSearchRes from "./LocSearchRes";
import LocGeneralIndicator from "./LocGeneralIndicator";
import PortSearch from "./PortSearch";
import login from "./Auth";

export default combineReducers({
  LocSearchRes,
  LocGeneralIndicator,
  PortSearch,
  login,
});
