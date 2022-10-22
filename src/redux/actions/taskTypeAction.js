import { instance } from "api/instance";
import { GET_ALL_TASK_TYPE } from "utils/Constants/constants";

export const getAllTaskTypeAction = async (next) => {
	try {
		const res = await instance.get("/api/TaskType/getAll");
		console.log(res.data.content,'task');
		next({
			type: GET_ALL_TASK_TYPE,
			payload: res.data.content,
		});
	} catch (err) {
		console.log(err);
	}
};
