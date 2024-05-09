import axios from "axios";
import { getLocalStorage } from "../../utils/localStorage";

const https = import.meta.env.VITE_API_Key_USERHTTP;
console.log(https);

const user_id = getLocalStorage().id;
console.log(user_id);
export const http = axios.create({
  baseURL: https,
  headers: { Authorization: user_id },
});
