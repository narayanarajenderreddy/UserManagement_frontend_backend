import axios from "axios";

console.log(" axios.ts file loaded");

const api = axios.create({
  baseURL: "http://localhost:8000",
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  console.log("attaching token to request:", token);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
