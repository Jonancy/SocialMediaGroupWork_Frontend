import axios from "axios";

const https = import.meta.env.VITE_API_Key_USERHTTP;
console.log(https);
export const http = axios.create({
  baseURL: https,
});
