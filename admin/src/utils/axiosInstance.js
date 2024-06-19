import axios from "axios";

export const baseURL = "http://localhost:4000";

const axiosInstance = axios.create({
  baseURL,
});

export default axiosInstance;
