// utils/useHttp.ts
import axios, {
  AxiosError,
  InternalAxiosRequestConfig,
  AxiosResponse,
} from "axios";
import Swal from "sweetalert2";

export const Request = axios.create({
  baseURL: "http://localhost:3005",
});

Request.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: AxiosError) => Promise.reject(error)
);

Request.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError) => {
    const backendMessage =
      (error.response?.data as { message?: string })?.message ||
      "Something went wrong";
    const statusCode = error.response?.status || 500;
    Swal.fire({
      icon: "error",
      title: "Error",
      text: backendMessage,
      showConfirmButton: true,
    });
    console.error(
      `API Error (status: ${statusCode}):`,
      error.response?.data || error
    );
    return Promise.reject(error);
  }
);

export default Request;
