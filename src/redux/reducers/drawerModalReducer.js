import produce from "immer";
import {
	CLOSE_DRAWER,
	OPEN_DRAWER,
	OPEN_FORM_EDIT_PROJECT,
	SET_SUBMIT_BUTTON,
	SET_SUBMIT_CREATE_TASK,
	SET_SUBMIT_EDIT_PROJECT,
} from "redux/actions/drawerModalActions";
import React from "react";
import { OPEN_FORM_ADD_TASK } from "utils/Constants/constants";

const initialState = {
	open: false,
	componentContentDrawer: <p>Default content</p>,
	// xử lí sự kiện submit drawer modal
	callBackSubmit: () => {
		alert("click demo");
	},
	title: "",
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case OPEN_DRAWER:
			return produce(state, (draft) => {
				draft.open = true;
			});
		case CLOSE_DRAWER:
			return produce(state, (draft) => {
				draft.open = false;
			});
		case OPEN_FORM_EDIT_PROJECT:
			return produce(state, (draft) => {
				draft.open = true;
				draft.componentContentDrawer = action.Component;
				draft.title = action.title;
			});

		case SET_SUBMIT_EDIT_PROJECT:
			return produce(state, (draft) => {
				draft.callBackSubmit = action.submitFunction;
			});
		case OPEN_FORM_ADD_TASK:
			return produce(state, (draft) => {
				draft.open = true;
				draft.componentContentDrawer = action.Component;
				draft.title = action.title;
			});
		case SET_SUBMIT_CREATE_TASK:
			return produce(state, (draft) => {
				draft.callBackSubmit = action.submitFunction;
			});
		default:
			return { ...state };
	}
};
export default reducer;
