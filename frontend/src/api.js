import axios from "axios";

// Use environment variable for API URL
const API_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true, // send the httpOnly session cookie on every request
});

export default api;
