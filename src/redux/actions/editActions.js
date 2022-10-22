import { instance } from "api/instance";
import { notifyFunction } from "utils/Notification/Notification";

export const SET_CATEGORY = "edit/SET_CATEGORY";
export const SET_CREATE_PROJECT = "edit/SET_CREATE_PROJECT";
// action get category
export const getAllCategoryAction = async (next) => {
	try {
		const res = await instance.get("/api/ProjectCategory");
		console.log(res.data.content);
		next({
			type: SET_CATEGORY,
			payload: res.data.content,
		});
	} catch (err) {
		console.log(err);
	}
};

// action create project
export const createProjectAction = (value) => {
	return async (next) => {
		try {
			const res = await instance.post(
				"/api/Project/createProjectAuthorize",
				value
			);
			next({
				type: SET_CREATE_PROJECT,
				payload: res.data.content,
			});
			notifyFunction("success", "Create project successfully!");
		} catch (err) {
			console.log(err);
			// notifyFunction("error", `${err.response.data?.message}`);
		}
	};
};
