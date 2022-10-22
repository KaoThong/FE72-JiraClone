
import { instance } from "api/instance";
import { GET_ALL_PRIORITY} from "utils/Constants/constants";

export const getAllPriorityAction = async (next) => {
	try {
		const res = await instance.get("/api/Priority/getAll");

		next({
			type: GET_ALL_PRIORITY,
			payload: res.data.content,
		});
	} catch (err) {
		console.log(err);
	}
};
