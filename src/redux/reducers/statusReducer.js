import produce from "immer";

import { GET_STATUS_LIST } from "utils/Constants/constants";

const initialState = {
	statusList: [],
};
const reducer = (state = initialState, action) => {
	switch (action.type) {
		case GET_STATUS_LIST:
			return produce(state, (draft) => {
				draft.statusList = action.payload;
			});
		default:
			return { ...state };
	}
};
export default reducer;
