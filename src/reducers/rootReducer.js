import { combineReducers } from "redux";
import appReducer from "./app/appReducer";
import locationReducer from "./location/locationReducer";
import weatherReducer from "./weather/weatherReducer";
import bgImageReducer from "./bgImage/bgImageReducer";

export default combineReducers({
  appReducer,
  locationReducer,
  weatherReducer,
  bgImageReducer,
});
