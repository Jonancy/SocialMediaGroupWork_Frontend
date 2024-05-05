import { useFormik } from "formik";
import { userRegisterSchema } from "../../../schema/authSchemas";
import { registerUser } from "../../../services/client/auth.service";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function RegisterUser() {
  const user_id = 1;
  const initialValues = {
    username: "",
    email: "",
    phone: "",
    gender: "",
    password: "",
    Role: "user",
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
    validationSchema: userRegisterSchema,

    onSubmit: async (values) => {
      //   setIsLoading(true);
      await userRegister(values);
    },
  });

  const userRegister = async (values) => {
    try {
      const res = await registerUser(values);
      console.log(res.data);
      toast.success(res.data.message);
      navigate("/login");
    } catch (e) {
      console.log(e);
      toast.error(e.response.data.message);
    }
  };

  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="relative space-y-3 rounded-md bg-white p-6 shadow-xl lg:p-10 border border-gray-100 m-10"
      >
        <h1 className="text-xl font-semibold lg:text-2xl">Register</h1>
        <p className="pb-4 text-gray-500">Sign in to access your account</p>
        <div className="">
          <label className=""> User Name </label>
          <input
            type="text"
            placeholder="Hency sawan"
            name="username"
            value={values.username}
            onChange={handleChange}
            onBlur={handleBlur}
            className="mt-2 h-12 w-full rounded-md bg-gray-100 px-3 outline-none focus:ring"
          />
          {touched.username && errors.username ? (
            <div className="text-red-500">{errors.username}</div>
          ) : null}
        </div>
        <div className="">
          <label className=""> Email Address </label>
          <input
            type="email"
            name="email"
            placeholder="Info@example.com"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            className="mt-2 h-12 w-full rounded-md bg-gray-100 px-3 outline-none focus:ring"
          />
          {touched.email && errors.email ? (
            <div className="text-red-500">{errors.email}</div>
          ) : null}
        </div>
        <div className="">
          <label className=""> Phone Number </label>
          <input
            type="text"
            name="phone"
            placeholder="Info@example.com"
            value={values.phone}
            onChange={handleChange}
            onBlur={handleBlur}
            className="mt-2 h-12 w-full rounded-md bg-gray-100 px-3 outline-none focus:ring"
          />
          {touched.phone && errors.phone ? (
            <div className="text-red-500">{errors.phone}</div>
          ) : null}
        </div>
        <div className="">
          <label className=""> Password </label>
          <input
            type="password"
            name="password"
            placeholder="******"
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
            className="mt-2 h-12 w-full rounded-md bg-gray-100 px-3 outline-none focus:ring"
          />
          {touched.password && errors.password ? (
            <div className="text-red-500">{errors.password}</div>
          ) : null}
        </div>
        <div className="">
          <label className=""> Gender </label>
          <div className="mt-2 space-x-4">
            <label className="inline-flex items-center">
              <input
                type="radio"
                name="gender"
                value="male"
                checked={values.gender === "male"}
                onChange={handleChange}
                onBlur={handleBlur}
                className="form-radio h-5 w-5 text-blue-600 cursor-pointer"
              />
              <span className="ml-2">Male</span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="radio"
                name="gender"
                value="female"
                checked={values.gender === "female"}
                onChange={handleChange}
                onBlur={handleBlur}
                className="form-radio h-5 w-5 text-pink-600 cursor-pointer"
              />
              <span className="ml-2">Female</span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="radio"
                name="gender"
                value="other"
                checked={values.gender === "other"}
                onChange={handleChange}
                onBlur={handleBlur}
                className="form-radio h-5 w-5 text-purple-600 cursor-pointer"
              />
              <span className="ml-2">Other</span>
            </label>
          </div>
          {touched.gender && errors.gender ? (
            <div className="text-red-500">{errors.gender}</div>
          ) : null}
        </div>
        <p
          className="text-sm hover:underline cursor-pointer"
          onClick={() => navigate("/login")}
        >
          Already registered, Login now?
        </p>
        <div>
          <button
            type="submit"
            className="mt-5 w-full rounded-md bg-blue-600 p-2 text-center font-semibold text-white outline-none focus:ring"
          >
            Register
          </button>
        </div>
      </form>
    </div>
  );
}
