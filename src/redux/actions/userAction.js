import { instance } from "api/instance";
import { GET_USER_BY_PROJECT_ID } from "utils/Constants/constants";
import { notifyFunction } from "utils/Notification/Notification";

export const GET_USER = "user/GET_USER";
export const getUserAction = (keyword) => {
	return async (next) => {
		try {
			const res = await instance.request({
				url: "/api/Users/getUser",
				method: "GET",
				params: {
					keyword,
				},
			});
			console.log(res.data.content);
			next({
				type: GET_USER,
				payload: res.data.content,
			});
		} catch (err) {
			console.log(err);
		}
	};
};

// GET USER BY PROJECT ID
export const getUserByProjectIdAction = (id) => {
	return async (next) => {
		try {
			const res = await instance.get(
				`/api/Users/getUserByProjectId?idProject=${id}`
			);
			
			console.log(res);
			if(res.status===200){
				console.log('res data')
				next({
					type: GET_USER_BY_PROJECT_ID,
					payload: res.data.content,
				});
			}
			
		} catch (err) {
			console.log(err.response);
			if(err.response.status===404){
				notifyFunction("error", "This project don't have any user!");
				next({
					type: GET_USER_BY_PROJECT_ID,
					payload: [],
				});
			}
		}
	};
};
