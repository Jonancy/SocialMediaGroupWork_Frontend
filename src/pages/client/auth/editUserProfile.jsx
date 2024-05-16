import { useFormik } from "formik";
// import { registerUser } from "../../../services/client/auth.service";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { getLocalStorage } from "../../../utils/localStorage";
import {
  getUserDetails,
  updateUserDetails,
} from "../../../services/client/user.service";
import { useEffect } from "react";

export default function EditUserProfile() {
  const initialValues = {
    userName: "",
    phone: "",
    gender: "",
  };
  const user_id = getLocalStorage().id;

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
    // validationSchema: userRegisterSchema,

    onSubmit: async (values) => {
      //   setIsLoading(true);
      await updateUser(values);
    },
  });

  const getUserDetail = async () => {
    try {
      const res = await getUserDetails(user_id);
      console.log(res.data);
      setFieldValue("userName", res.data.data.userName);
      setFieldValue("phone", res.data.data.phone);
      setFieldValue("gender", res.data.data.gender);
    } catch (e) {
      console.log(e);
    }
  };
  const updateUser = async (values) => {
    try {
      const res = await updateUserDetails(user_id, values);
      console.log(res.data);
      toast.success(res.data.message);
      navigate("/login");
    } catch (e) {
      console.log(e);
      toast.error(e.response.data.message);
    }
  };

  useEffect(() => {
    getUserDetail();
  }, []);

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
            name="userName"
            value={values.userName}
            onChange={handleChange}
            onBlur={handleBlur}
            className="mt-2 h-12 w-full rounde  d-md bg-gray-100 px-3 outline-none focus:ring"
          />
          {touched.userName && errors.userName ? (
            <div className="text-red-500">{errors.userName}</div>
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

        <div>
          <button
            type="submit"
            className="mt-5 w-full rounded-md bg-blue-600 p-2 text-center font-semibold text-white outline-none focus:ring"
          >
            Update user
          </button>
        </div>
      </form>
    </div>
  );
}
