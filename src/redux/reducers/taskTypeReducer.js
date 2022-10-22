import produce from "immer";

import { GET_ALL_TASK_TYPE } from "utils/Constants/constants";

const initialState = {
	taskTypeList: [],
};
const reducer = (state = initialState, action) => {
	switch (action.type) {
		case GET_ALL_TASK_TYPE:
			return produce(state, (draft) => {
				draft.taskTypeList = action.payload;
			});
		default:
			return { ...state };
	}
};
export default reducer;
