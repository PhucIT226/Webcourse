import axios from "axios";
import { API_URL } from "../constant";
import { store } from "../redux/store";
const instance = axios.create({
  baseURL: "http://localhost:3000/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// Set config defaults when creating the instance

// Alter defaults after instance has been created
// instance.defaults.headers.common["Authorization"] = "AUTH_TOKEN";
// Add a request interceptor
instance.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    const access_token = store?.getState();
    // config.headers["Authorization"] = "Bearer " + access_token;
    console.log(access_token);
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    // If 401 and not already retried
    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      try {
        // Call refresh endpoint (assume refreshToken in cookie)
        await axios.post(
          `${API_URL}/auth/refresh`,
          {},
          { withCredentials: true }
        );
        // // After refresh, retry original request,
        // /* just use in case httpOnly set is false in BE side
        // const token = getCookie("accessToken");
        // if (token && originalRequest.headers) {
        //   originalRequest.headers.Authorization = `Bearer ${token}`;
        // }
        // */
        // store.dispatch(clearAuth());
        return instance(originalRequest);
      } catch (refreshError) {
        // Optionally: redirect to login or handle logout
        localStorage.removeItem("me");
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);
export default instance;
