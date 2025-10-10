import axios, { AxiosError } from "axios";
import { API_URL } from "../constants";
import NProgress from "nprogress";

NProgress.configure({ showSpinner: false, trickleSpeed: 100 });

const axiosClient = axios.create({
  baseURL: API_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

// 🔹 Interceptor Request
axiosClient.interceptors.request.use(
  (config) => {
    NProgress.start();

    const me = localStorage.getItem("me");
    if (me) {
      const user = JSON.parse(me);
      if (user?.accessToken && config.headers) {
        config.headers.Authorization = `Bearer ${user.accessToken}`;
      }
    }

    return config;
  },
  (error) => {
    NProgress.done();
    return Promise.reject(error);
  }
);

// 🔹 Interceptor Response
axiosClient.interceptors.response.use(
  (response) => {
    NProgress.done();
    return response;
  },
  async (error: AxiosError & { config: any }) => {
    NProgress.done();
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !originalRequest.url.includes("/auth/refresh")
    ) {
      originalRequest._retry = true;
      try {
        const refreshRes = await axiosClient.post("/auth/refresh");

        if (refreshRes.data?.accessToken) {
          // Lưu accessToken mới vào localStorage
          const me = localStorage.getItem("me");
          const user = me ? JSON.parse(me) : {};
          user.accessToken = refreshRes.data.accessToken;
          localStorage.setItem("me", JSON.stringify(user));

          if (originalRequest.headers) {
            originalRequest.headers.Authorization = `Bearer ${refreshRes.data.accessToken}`;
          }
          return axiosClient(originalRequest);
        }
      } catch (refreshError) {
        localStorage.removeItem("me");
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosClient;
