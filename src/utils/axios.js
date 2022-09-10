import axios from "axios";

const local = null;

if (typeof window !== 'undefined') {
  local = localStorage.getItem('access_token')
  console.log(localStorage.getItem('access_token'))
}

export const axiosInstance = axios.create({
  baseURL: " http://127.0.0.1:8000/api",
  headers: {
    Authorization: `Bearer ${local}`,

    "Content-Type": "application/json",
    accept: "application/json",
  },
});

export default axiosInstance;
