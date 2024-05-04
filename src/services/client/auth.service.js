import { http } from "../url/baseURL";

export const login = (form) => {
  return http.post("/User/login", form);
};

export const registerUser = (formData) => {
  return http.post("/User", formData);
};

export const sendOTPEmail = (email) => {
  return http.post("/Email/send-otp", null, { params: { email: email } });
};
