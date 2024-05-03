import { http } from "../url/baseURL";

export const login = (form) => {
  return http.post("/User/login", form);
};

export const registerUser = (formData) => {
  return http.post("/User", formData);
};

export const heha = () => {
  return http.get("/User/hehe");
};
