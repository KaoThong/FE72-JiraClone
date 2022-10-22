import { notification } from "antd";
import { instance } from "api/instance";
import { SET_COMMENT_LIST, UPDATE_TASK_DETAIL } from "utils/Constants/constants";
import { notifyFunction } from "utils/Notification/Notification";
import { getProjectDetailAction } from "./projectActions";
export const SET_TASK_DETAIL = "taskDetail/SET_TASK_DETAIL";
// get task detail
export const getTaskDetailAction = (taskId) => {
	return async (next) => {
		try {
			const res = await instance.get(
				`/api/Project/getTaskDetail?taskId=${taskId}`
			);
			next({
				type: SET_TASK_DETAIL,
				payload: res.data.content,
			});
		} catch (err) {
			console.log(err);
		}
	};
};

// update  task
export const updateTaskDetailAction = (taskUpdate) => {
	return async (next) => {
		try {
			const res = await instance.post(
				"/api/Project/updateTask",
				taskUpdate
			);
			console.log(res.data.content, "update");
			console.log("taskUpdate", taskUpdate);
		
		} catch (err) {
			console.log(err);
			if(err.response.status===403){
				notifyFunction(
					"error",
					"Only assigned users can edit this task!"
				);
			}
		}
	};
};

// update status task detail
export const updateStatusTaskDetailAction = (status, dispatch, projectId) => {
	return async (next) => {
		try {
			const res = await instance.put("/api/Project/updateStatus", status);
			console.log(res.data.content);
			dispatch(getProjectDetailAction(projectId))
		} catch (err) {
			console.log(err,'err status');
			if(err.response.status===404){
				notifyFunction(
					"error",
					"Only assigned users can edit this task!"
				);
			}
		}
	};
};

// update status task detail
export const updatePriorityTaskDetailAction = (
	priority,
	dispatch,
	projectId
) => {
	return async (next) => {
		try {
			const res = await instance.put(
				"/api/Project/updatePriority",
				priority
			);
			console.log(res.data.content);
		} catch (err) {
			console.log(err);
			if(err.response.status===404){
				notifyFunction(
					"error",
					"Only assigned users can edit this task!"
				);
			}
		}
	};
};

// update description task detail
export const updateDescriptionTaskDetail = (description, dispatch) => {
	return async (next) => {
		try {
			const res = await instance.put(
				"/api/Project/updateDescription",
				description
			);
		} catch (err) {
			console.log(err);
			if (err.response.status === 404) {
				notifyFunction(
					"error",
					"Only assigned users can edit this task!"
				);
			}
		}
	};
};

// update estimate
export const updateEstimateTaskDetail = (estimate, dispatch) => {
	return async (next) => {
		try {
			const res = await instance.put(
				"/api/Project/updateEstimate",
				estimate
			);
		} catch (err) {
			console.log(err);
			if (err.response.status === 404) {
				notifyFunction(
					"error",
					"Only assigned users can edit this task!"
				);
			}
		}
	};
};

// update time tracking
export const updateTimeTrackingAction=(value)=>{
	return async(next)=>{
		try{
			const res=await instance.put('/api/Project/updateTimeTracking',value)
			console.log(res.data.content)
			console.log('time tracking',value)
		}catch(err){
			console.log(err)
			if (err.response.status === 404) {
				notifyFunction(
					"error",
					"Only assigned users can edit this task!"
				);
			}
		}
	}
}

// update assignes user
export const assignUserTaskAction = (user) => {
	return async () => {
		try {
			const res = await instance.post(
				"/api/Project/assignUserTask",
				user
			);
			console.log("user task", user);
			notifyFunction("success", "Add user to task successfully!");
			console.log(res.data.content);
		} catch (err) {
			console.log(err);
			if (err.response?.status === 404) {
				notifyFunction(
					"error",
					"Only user assigned can edit this task!"
				);
			}
		}
	};
};

// remove assignes user
export const removeUserFromTaskAction = (value) => {
	return async (next) => {
		try {
			const res=await instance.post('/api/Project/removeUserFromTask',value)
			console.log(res.data.content)
		} catch (err) {
			console.log(err);
		}
	};
};

// get all comment
export const getAllComment=(taskId)=>{
	return async(next)=>{
		try{
			const res=await instance.get(`/api/Comment/getAll?taskId=${taskId}`)
			console.log(res.data.content,'comment')
			next({
				type:SET_COMMENT_LIST,
				payload:res.data.content,
			})
		}catch(err){
			console.log(err)
		}
	}
}
// insert comment
export const insertCommentAction=(value,dispatch)=>{
	return async(next)=>{
		try{
			const res=await instance.post('/api/Comment/insertComment',value)
			console.log(res.data.content)
			dispatch(getAllComment(value.taskId))
		}catch(err){
			console.log(err)
		}
	}
}