import produce from "immer";
import { SET_TASK_DETAIL } from "redux/actions/taskDetailAction";
import {
	CHANGE_ASSIGNESS,
	CHANGE_TASK_MODAL,
	REMOVE_USER_ASSIGN,
	SET_COMMENT_LIST,
	UPDATE_TASK_DETAIL,
} from "utils/Constants/constants";

const initialState = {
	taskDetailModal: {},
	commentList:[],
};
const reducer = (state = initialState, action) => {
	switch (action.type) {
		case SET_TASK_DETAIL:
			return produce(state, (draft) => {
				draft.taskDetailModal = action.payload;
			});
		case CHANGE_TASK_MODAL:
			const { name, value } = action;
			return produce(state, (draft) => {
				draft.taskDetailModal[name] = value;
			});
		case CHANGE_ASSIGNESS:
			return produce(state, (draft) => {
				draft.taskDetailModal.assigness.push(action.userAssign);
			});
		case REMOVE_USER_ASSIGN:
			return produce(state, (draft) => {
				draft.taskDetailModal.assigness =
					draft.taskDetailModal.assigness.filter(
						(user) => user.id !== action.userId
					);
			});
		case UPDATE_TASK_DETAIL:
			return produce(state, (draft) => {
				draft.taskDetailModal = action.payload;
			});
		case SET_COMMENT_LIST:
			return produce(state,draft=>{
				draft.commentList=action.payload
			})
		default:
			return { ...state };
	}
};
export default reducer;
