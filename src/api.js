import axios from "axios";

const API = axios.create({
  baseURL: "https://auto-parts-app-7wo2.onrender.com",
});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");

  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }

  return req;
});

export default API;