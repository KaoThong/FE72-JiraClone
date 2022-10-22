import { instance } from "api/instance";
import { GET_STATUS_LIST } from "utils/Constants/constants";

export const getAllStatusAction = async (next) => {
	try {
		const res = await instance.get("/api/Status/getAll");

		next({
			type: GET_STATUS_LIST,
			payload: res.data.content,
		});
	} catch (err) {
		console.log(err);
	}
};
