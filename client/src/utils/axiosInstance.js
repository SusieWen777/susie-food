import axios from "axios";

// export const baseURL = "http://localhost:4000";
export const baseURL = "https://susie-food-backend.onrender.com";

const axiosInstance = axios.create({
  baseURL,
});

export default axiosInstance;
