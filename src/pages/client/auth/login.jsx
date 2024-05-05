import React from "react";
import { login } from "../../../services/client/auth.service";
import { useFormik } from "formik";
import { userLoginSchema } from "../../../schema/authSchemas";
import { toast } from "react-toastify";
import { setLocalStorage } from "../../../utils/localStorage";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const initialValues = {
    email: "",
    password: "",
  };

  const {
    values,
    handleBlur,
    handleChange,
    handleSubmit,
    setFieldValue,
    errors,
    touched,
    resetForm,
  } = useFormik({
    initialValues: initialValues,
    validationSchema: userLoginSchema,

    onSubmit: async (values) => {
      console.log("pass");
      await loginUser(values);
    },
  });
  const loginUser = async (values) => {
    try {
      const res = await login(values);
      console.log(res.data);
      toast.success(res.data.message);
      let response = res.data.data;

      setLocalStorage({
        userName: response.username,
        image: null,
        role: response.role,
        id: response.userId,
      });
      navigate("/home");
    } catch (e) {
      console.log(e);
      toast.error(e.response.data.message);
    }
  };
  console.log(errors);
  return (
    <div className="flex items-center justify-center">
      <form
        className="relative space-y-3 rounded-md bg-white p-6 shadow-xl lg:p-10 border border-gray-100 m-10"
        onSubmit={handleSubmit}
      >
        <h1 className="text-xl font-semibold lg:text-2xl">Login</h1>
        <p className="pb-4 text-gray-500">Sign in to access your account</p>

        <div className="">
          <label className=""> Email Address </label>
          <input
            type="email"
            name="email"
            placeholder="Info@example.com"
            className="mt-2 h-12 w-full rounded-md bg-gray-100 px-3 outline-none focus:ring"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {touched.email && errors.email ? (
            <div className="text-red-500">{errors.email}</div>
          ) : null}
        </div>
        <div>
          <label className=""> Password </label>
          <input
            type="password"
            placeholder="******"
            name="password"
            className="mt-2 h-12 w-full rounded-md bg-gray-100 px-3 outline-none focus:ring"
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {touched.password && errors.password ? (
            <div className="text-red-500">{errors.password}</div>
          ) : null}
        </div>
        <p
          className="text-sm hover:underline cursor-pointer"
          onClick={() => navigate("/email-verification")}
        >
          Forgot password?
        </p>
        <div>
          <button
            type="submit"
            className="mt-5 w-full rounded-md bg-blue-600 p-2 text-center font-semibold text-white outline-none focus:ring"
          >
            Get Started
          </button>
          <p
            className="text-sm hover:underline cursor-pointer mt-2 text-center"
            onClick={() => navigate("/register")}
          >
            Have not registered yet, Register now?
          </p>
        </div>
      </form>
    </div>
  );
}
