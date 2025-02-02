import axios, {
  AxiosError,
  InternalAxiosRequestConfig,
  AxiosResponse,
} from "axios";
import Swal from "sweetalert2";

export const Request = axios.create({
  baseURL: "http://13.61.12.205",
});

const useHttp = () => {
  function configureHeader(): void {
    Request.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        const token = localStorage.getItem("token");
        console.log("token", token);
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error: AxiosError) => Promise.reject(error)
    );
  }

  function configureInterceptors(): void {
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
  }

  return { configureHeader, configureInterceptors };
};

export default useHttp;
