import { instance } from "api/instance";
import swal from "sweetalert";

export const SIGN_UP = "auth/SIGN_UP";
export const SIGN_IN = "auth/SIGN_IN";

export const signUpAction = (value, history) => {
	return async () => {
		try {
			const res = await instance.post("/api/Users/signup", value);
			console.log(res.data.content, "sign up");
			swal({
				title: "Sign up successfully! ",
				text: `You successfully signed up`,
				icon: "success",
				button: "OK",
				timer: 1500,
			});
			history.push("/signin");
		} catch (err) {
			console.log(err);
		}
	};
};
export const signInAction = (value, history) => {
	return async (next) => {
		try {
			const res = await instance.post("/api/Users/signin", value);
			console.log(res.data.content, "sign in");

			// lưu accessToken xuống local
			localStorage.setItem("token", res.data.content.accessToken);
			console.log(res.data.content, "sign in data");
			console.log(JSON.stringify(res.data.content), "JSON DATA");
			// lưu tt user xuống local
			localStorage.setItem("user", JSON.stringify(res.data.content));
			// lưu thông tin user lên store
			next({
				type: SIGN_IN,
				payload: res.data.content,
			});
			swal({
				title: "Sign in successfully! ",
				text: `Hi ${res.data.content.name}`,
				icon: "success",
				button: "OK",
				timer: 1500,
			});
			history.push("/");
		} catch (err) {
			swal({
				title: "Sign in failed! ",
				text: `Wrong password or email`,
				icon: "error",
				button: "OK",
				timer: 1500,
			});
		}
	};
};
