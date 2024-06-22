import { combineReducers } from "redux";
import storeReducer from "./storeReducer";

const reducer = combineReducers({
	reduxMainState: storeReducer,
});
export default reducer;
