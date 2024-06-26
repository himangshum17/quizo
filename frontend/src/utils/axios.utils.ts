import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_API_URL,
  headers: {
    "Content-type": "application/json; charset=UTF-8",
  },
});
export default axiosInstance;
