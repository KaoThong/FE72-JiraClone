import axios from "axios";
import { DOMAIN, TOKEN_CYBERSOFT } from "config/setting";
export const instance = axios.create({
	baseURL: DOMAIN,
	headers: {
		Authorization: "Bearer " + localStorage.getItem("token"),
		TokenCybersoft:TOKEN_CYBERSOFT,
	},
});

instance.interceptors.request.use((config) => {
	// chỉnh sửa config -> chỉnh xong return để đẩy tiếp tới BE
	config.headers = {
		...config.headers,
		Authorization: "Bearer " + localStorage.getItem("token"),
	};
	// console.log(localStorage.getItem('token'),typeof(localStorage.getItem('token')))

	return config;
});
