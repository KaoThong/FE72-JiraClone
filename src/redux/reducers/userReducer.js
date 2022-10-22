import produce from "immer";
import { GET_USER } from "redux/actions/userAction";
import { GET_USER_BY_PROJECT_ID } from "utils/Constants/constants";

const initialState = {
	userList: [],
	arrUser: [], // SELECT ASSIGN CREATE FORM
};
const reducer = (state = initialState, action) => {
	switch (action.type) {
		case GET_USER:
			return produce(state, (draft) => {
				draft.userList = action.payload;
			});
		case GET_USER_BY_PROJECT_ID:
			return produce(state, (draft) => {
				draft.arrUser = action.payload;
			});
		default:
			return { ...state };
	}
};
export default reducer;
