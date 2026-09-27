import axios from "axios";

// All requests go through this single client so the base URL, headers,
// and error shape are defined in exactly one place.
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:5001/api",
  timeout: 15000,
  withCredentials: true,
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
    const serverMessage =
      error?.response?.data?.message ||
      error?.response?.data?.error ||
      (error?.message === "Network Error"
        ? "Unable to connect to server. Please check your network or ensure the backend is running."
        : undefined);
    return Promise.reject({
      status: status || 0,
      message: serverMessage || "Something went wrong. Please try again.",
      isNetworkError: !error?.response,
    });
  }
);

export default api;
