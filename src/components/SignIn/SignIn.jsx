import React from "react";
import { NavLink, useHistory } from "react-router-dom";
import { BsFacebook } from "react-icons/bs";
import { useFormik } from "formik";
import * as yup from "yup";
import { string } from "yup";
import { useDispatch } from "react-redux";
import { signInAction } from "redux/actions/authActions";

const schema = yup.object().shape({
  passWord: string("*Sai định dạng mật khẩu")
    .required("*Vui lòng nhập mật khẩu")
    .min(6, "*Tối thiểu 6 kí tự")
    .max(16, "*Tối đa 16 kí tự"),

  email: string("*Sai định dạng email")
    .required("*Vui lòng nhập email")
    .email("*Sai định dạng email"),
});
function SignIn() {
  const history = useHistory();
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      email: "",
      passWord: "",
    },
    onSubmit: (values) => {
      console.log(values);
      dispatch(signInAction(values, history));
    },
    validationSchema: schema,
  });
  console.log(formik.errors.projectId, "erros");
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
        className="bg-white w-full md:max-w-md lg:max-w-full md:mx-auto  md:w-1/2 xl:w-1/3 h-screen px-6 lg:px-16 xl:px-12
  flex items-center justify-center"
      >
        <div className="w-full h-100">
          <h1 className="text-xl md:text-2xl font-bold leading-tight mt-12">
            Log in to your account
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
              <label className="block text-gray-700">Password</label>
              <input
                onChange={formik.handleChange}
                type="password"
                name="passWord"
                placeholder="Enter Password"
                minLength={6}
                className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500
          focus:bg-white focus:outline-none"
              />
              {formik.touched.passWord && formik.errors.passWord && (
                <p className="text-red-600 italic mt-2">
                  {formik.errors.passWord}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full block bg-indigo-500 hover:bg-indigo-400 focus:bg-indigo-400 text-white font-semibold rounded-lg
        px-4 py-3 mt-6"
            >
              Log In
            </button>
          </form>
          <hr className="my-6 border-gray-300 w-full" />
          <button
            type="button"
            className="w-full block bg-white hover:bg-gray-100 focus:bg-gray-100 text-gray-900 font-semibold rounded-lg px-4 py-3 border border-gray-300"
          >
            <div className="flex items-center justify-center text-center">
              <BsFacebook className="text-2xl text-blue " />
              <span className="ml-3">Log in with Facebook</span>
            </div>
          </button>
          <p className="mt-8">
            Need an account?{" "}
            <NavLink
              to="/signup"
              className="text-blue-500 hover:text-blue-700 font-semibold"
            >
              Create an account
            </NavLink>
          </p>
        </div>
      </div>
    </section>
  );
}

export default SignIn;
