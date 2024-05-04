import { http } from "../url/baseURL";

export const getUserDetails = (user_id) => {
  return http.get(`/User/specific-user/${user_id}`);
};

export const passwordChangeOTPEmail = (values) => {
  console.log(values);
  return http.post("/Email/reset-password", null, {
    params: {
      email: values.email,
      otp: values.otp,
      newPassword: values.newPassword,
    },
  });
};
