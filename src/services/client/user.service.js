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

export const deleteUser = (user_id) => {
  return http.delete(`/User/${user_id}`);
};

//!Password change through profile
export const passwordChangeProfile = (values, user_id) => {
  console.log(values);
  return http.put(`/User/passwordChangeProfile/${user_id}`, values);
};
