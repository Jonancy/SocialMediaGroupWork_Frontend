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

export const getAllNotifications = (userId) => {
  return http.get(`/Notification/getNotifications/${userId}`);
};

export const getUnreadNotiCounts = (user_id) => {
  return http.get(`/Notification/getUnreadNotis/${user_id}`);
};

export const readUserNoti = (userId) => {
  return http.put(`/Notification/readNoti/${userId}`);
};

export const updateUserDetails = (userId, formData) => {
  return http.put(`/User/editProfile/${userId}`, formData);
};
