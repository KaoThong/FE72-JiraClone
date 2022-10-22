import produce from "immer";
import { EDIT_PROJECT } from "redux/actions/drawerModalActions";
import {
	GET_PROJECT_DETAIL,
	SET_PROJECT_LIST,
} from "redux/actions/projectActions";

const initialState = {
	projectList: [],
	// API update project
	projectEdit: {
		// id: 0,
		// projectName: "string",
		// creator: {
		// 	id: 0,
		// 	name: "string",
		// },
		// categoryId: 'string',
		// description: "stirng",
	},
	projectDetail: [],
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case SET_PROJECT_LIST:
			return produce(state, (draft) => {
				draft.projectList = action.payload;
			});
		case EDIT_PROJECT:
			return produce(state, (draft) => {
				draft.projectEdit = action.payload;
			});
		case GET_PROJECT_DETAIL:
			return produce(state, (draft) => {
				draft.projectDetail = action.payload;
			});
		default:
			return { ...state };
	}
};
export default reducer;
