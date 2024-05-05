import { toast } from "react-toastify";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { TextField, Button } from "@mui/material";
import { RxCross1 } from "react-icons/rx";
import { passwordChangeProfile } from "../../../services/client/user.service";
import { getLocalStorage } from "../../../utils/localStorage";
import * as Yup from "yup";

//!This is for profile password change without OTP one
export default function PasswordResetProfile() {
  const user_id = getLocalStorage().id;

  //Password is the initial and newPassword is confirm password
  const initialValues = {
    password: "",
    newPassword: "",
  };

  const navigate = useNavigate();

  const passwordResetValidSchema = Yup.object().shape({
    password: Yup.string().required("Password is required"),
    newPassword: Yup.string().required("Confirm password is required"),
  });

  const { values, handleBlur, handleChange, handleSubmit, touched, errors } =
    useFormik({
      initialValues: initialValues,
      validationSchema: passwordResetValidSchema,
      onSubmit: async () => {
        console.log(values);
        await sendForm(values);
      },
    });

  const sendForm = async (values) => {
    try {
      console.log(values);
      const res = await passwordChangeProfile(values, user_id);
      console.log(res.data);
      toast.success(res.data.message);
      navigate(`/specific-user/${user_id}`);
    } catch (e) {
      toast.error(e.response.data.message);
    }
  };

  console.log(errors);

  const redirectLogin = () => {
    navigate(`/specific-user/${user_id}`);
  };

  return (
    <div className=" w-full flex flex-col items-center justify-center h-[100vh]">
      <form
        className=" rounded-xl absolute bg-white px-10 py-5  flex flex-col gap-4 w-[40%] shadow-md border"
        onSubmit={handleSubmit}
      >
        <div className="w-[60%]">
          <h1 className="text-2xl tracking-wide font-bold">Change Password</h1>
          <p className="text-sm font-semibold">
            Your password must be at least 6 characters and should include a
            combination of numbers, letters and special characters (!$@%).
          </p>
        </div>
        <div className="flex flex-col  w-[80%] h-[5rem] mt-6">
          <TextField
            label="Old Password"
            type="password"
            name="password"
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.password && !!errors.password}
            helperText={touched.password && errors.password}
          />
        </div>
        <div className="flex flex-col  w-[80%] h-[5rem] mt-6">
          <TextField
            label="New Password"
            type="password"
            name="newPassword"
            value={values.newPassword}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.newPassword && !!errors.newPassword}
            helperText={touched.newPassword && errors.newPassword}
          />
        </div>
        <div className="flex  justify-end">
          <div className="flex gap-4 items-center">
            <Button
              variant="outlined"
              onClick={redirectLogin}
              startIcon={<RxCross1 />}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              type="submit"
              sx={{ bg: "#6F52ED", color: "white" }}
            >
              Submit
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
