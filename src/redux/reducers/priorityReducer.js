import produce from "immer";

import { GET_ALL_PRIORITY } from "utils/Constants/constants";

const initialState = {
	priorityList: [],
};
const reducer = (state = initialState, action) => {
	switch (action.type) {
		case GET_ALL_PRIORITY:
			return produce(state, (draft) => {
				draft.priorityList = action.payload;
			});
		default:
			return { ...state };
	}
};
export default reducer;
