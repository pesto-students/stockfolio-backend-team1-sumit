import * as reducers from "./Reducers.js";
import { combineReducers } from "redux";

const Reducer = combineReducers({
  IT: reducers.ItReducer,
  DIVIDENT: reducers.DividentReducer,
  ItList: reducers.ItList,
  DividentList: reducers.DividentList,
  WATCHLIST: reducers.WatchList,
});
export default Reducer;
