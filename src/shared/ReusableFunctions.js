import { useDispatch, useSelector } from "react-redux";

import store from "../reduxStore/store";

export const emailRegex = /^[a-zA-Z0-9._]+@[a-zA-Z0-9.]+\.[a-zA-Z]{2,}$/;

export const dateRegex = /^\d{2}\/\d{2}\/\d{4}-\d{2}\/\d{2}\/\d{4}$/;

export const allowOnlyNumber = (e) => {
	if (["e", "E", "+", "-", "."].includes(e.key)) {
		e.preventDefault();
	}
};

export const allowOnlyNumberWithDecimalPoint = (e) => {
	if (["e", "E", "+", "-"].includes(e.key)) {
		e.preventDefault();
	}
};

export const saveDataToStore = (payloadData, actionType) => {
	let action = {
		payload: payloadData,
		type: actionType,
	};
	store.dispatch(action);
};
