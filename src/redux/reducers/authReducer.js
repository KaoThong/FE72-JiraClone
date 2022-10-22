import produce from "immer";
import { SIGN_IN } from "redux/actions/authActions";
let user={}
if (localStorage.getItem('user')) {
	user = JSON.parse(localStorage.getItem('user'));
}
const initialState = {
	userProfile: user,
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case SIGN_IN:
			return produce(state, (draft) => {
				draft.userProfile = action.payload;
			});
		default:
			return { ...state };
	}
};
export default reducer;
