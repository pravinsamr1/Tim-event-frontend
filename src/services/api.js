import axios from "axios";

// All requests go through this single client so the base URL, headers,
// and error shape are defined in exactly one place.
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "/api",
  timeout: 15000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Normalize errors into a shape the UI can safely display without ever
// leaking raw Axios/HTTP internals to the user.
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error?.response?.status;
    const serverMessage = error?.response?.data?.message;
    return Promise.reject({
      status: status || 0,
      message: serverMessage || "Something went wrong. Please try again.",
      isNetworkError: !error?.response,
    });
  }
);

export default api;
