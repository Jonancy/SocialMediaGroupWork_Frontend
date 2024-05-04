import * as Yup from "yup";

export const userRegisterSchema = Yup.object({
  username: Yup.string().required("Username is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  phone: Yup.string().required("Phone number is required"),
  gender: Yup.string().required("Gender is required"),
  password: Yup.string().required("Passowrd is required"),
});

export const userLoginSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string().required("Passowrd is required"),
});

export const passwordResetValidSchema = Yup.object({
  otp: Yup.string("Input must be a string").required("Please enter your code!"),
  newPassword: Yup.string("Input must be a string").required(
    "Please enter your newPassword!"
  ),
});
