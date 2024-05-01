import { http } from "../url/baseURL";

export const getUserDetails = (user_id) => {
  return http.get(`/User/specific-user/${user_id}`);
};
