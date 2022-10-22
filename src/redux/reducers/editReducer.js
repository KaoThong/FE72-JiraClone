import produce from "immer";
import { SET_CATEGORY, SET_CREATE_PROJECT } from "redux/actions/editActions";

const initialState = {
	category: [],
	createProject: null,
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case SET_CATEGORY:
			return produce(state, (draft) => {
				draft.category = action.payload;
			});
		case SET_CREATE_PROJECT:
			return produce(state, (draft) => {
				draft.createProject = action.payload;
			});
		default:
			return { ...state };
	}
};
export default reducer;
