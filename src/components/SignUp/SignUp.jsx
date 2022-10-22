import { useFormik } from "formik";
import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { signUpAction } from "redux/actions/authActions";
import * as yup from "yup";
import { string } from "yup";

const schema = yup.object().shape({
	passWord: string("*Sai định dạng mật khẩu")
		.required("*Vui lòng nhập mật khẩu")
		.min(6, "*Tối thiểu 6 kí tự")
		.max(16, "*Tối đa 16 kí tự"),

	email: string("*Sai định dạng email")
		.required("*Vui lòng nhập email")
		.email("*Sai định dạng email"),
	phoneNumber: string("*Sai định dạng số điện thoại")
		.required("*Vui lòng nhập")
		.matches(/^[0-9]+$/g, "*Sai định dạng số điện thoại")
		.min(10, "*Sai định dạng số điện thoại")
		.max(11, "*Sai định dạng số điện thoại"),
	name: string("*Sai định dạng họ tên")
		.required("*Vui lòng nhập")
		.matches(
			/[^a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễếệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ]/u,
			"*Sai định dạng họ tên"
		),
});
function SignUp() {
	const dispatch=useDispatch()
	const history=useHistory()
	const formik = useFormik({
		initialValues: {
			email: "",
			passWord: "",
			name: "",
			phoneNumber: "",
		},
		onSubmit: (values) => {
			console.log(values);
			console.log("1");
			dispatch(signUpAction(values,history))
		},
		validationSchema: schema,
	});
	return (
		<section className="flex flex-col md:flex-row h-screen items-center">
			<div className="bg-indigo-600 hidden lg:block w-full md:w-1/2 xl:w-2/3 h-screen">
				<img
					src="https://source.unsplash.com/random"
					alt=""
					className="w-full h-full object-cover"
				/>
			</div>
			<div
				className="bg-white w-full md:max-w-md lg:max-w-full md:mx-auto md:w-1/2 xl:w-1/3 h-screen px-6 lg:px-16 xl:px-12
  flex items-center justify-center"
			>
				<div className="w-full h-100">
					<h1 className="text-xl md:text-2xl font-bold leading-tight mt-12">
						Sign up new account
					</h1>
					<form className="mt-6" onSubmit={formik.handleSubmit}>
						<div>
							<label className="block text-gray-700">Email</label>
							<input
								onChange={formik.handleChange}
								type="email"
								name="email"
								placeholder="Enter Email"
								className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
							/>
							{formik.touched.email && formik.errors.email && (
								<p className="text-red-600 italic mt-2">
									{formik.errors.email}
								</p>
							)}
						</div>
						<div className="mt-4">
							<label className="block text-gray-700">
								Password
							</label>
							<input
								onChange={formik.handleChange}
								type="password"
								name="passWord"
								placeholder="Enter Password"
					
								className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500
          focus:bg-white focus:outline-none"
							/>
							{formik.touched.passWord &&
								formik.errors.passWord && (
									<p className="text-red-600 italic mt-2">
										{formik.errors.passWord}
									</p>
								)}
						</div>
						<div className="mt-4">
							<label className="block text-gray-700">Name</label>
							<input
								onChange={formik.handleChange}
								type="text"
								name="name"
								placeholder="Enter Name"
								className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500
          focus:bg-white focus:outline-none"
							/>
							{formik.touched.name && formik.errors.name && (
								<p className="text-red-600 italic mt-2">
									{formik.errors.name}
								</p>
							)}
						</div>
						<div className="mt-4">
							<label className="block text-gray-700">
								Phone Number
							</label>
							<input
								onChange={formik.handleChange}
								type="text"
								name="phoneNumber"
								placeholder="Enter phone number"
								className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500
          focus:bg-white focus:outline-none"
							/>
							{formik.touched.phoneNumber &&
								formik.errors.phoneNumber && (
									<p className="text-red-600 italic mt-2">
										{formik.errors.phoneNumber}
									</p>
								)}
						</div>

						<button
							type="submit"
							className="w-full block bg-indigo-500 hover:bg-indigo-400 focus:bg-indigo-400 text-white font-semibold rounded-lg
        px-4 py-3 mt-6"
						>
							Sign Up
						</button>
					</form>
				</div>
			</div>
		</section>
	);
}

export default SignUp;
