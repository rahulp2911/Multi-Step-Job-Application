import reducer from "./reducers/index";
import { configureStore } from "@reduxjs/toolkit";
const store = configureStore({ reducer: reducer });
export default store;
