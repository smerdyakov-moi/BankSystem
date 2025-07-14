import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://banksystem-k2r2.onrender.com",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
