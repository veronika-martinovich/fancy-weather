import { createStore, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";
import combineReducers from "../reducers/rootReducer";
import { composeWithDevTools } from "redux-devtools-extension";

const store = createStore(
  combineReducers,
  composeWithDevTools(applyMiddleware(thunkMiddleware))
);

export default store;
