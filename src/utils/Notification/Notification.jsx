import { notification } from "antd";
export const notifyFunction = (type, message, description) => {
	notification.config({
		duration: 2,
	})
	return notification[type]({
		message: message,
		description: description,
	});
};
