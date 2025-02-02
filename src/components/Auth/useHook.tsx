import { Apis } from "../../lib/Api";
import { AxiosResponse } from "axios";
import Swal from "sweetalert2";

export const useAuthHook = () => {
  const login = async (
    email: string,
    password: string
  ): Promise<AxiosResponse<any> | void> => {
    try {
      const response = await Apis.login(email, password);

      if (response.data?.token) {
        localStorage.setItem("token", response.data.token);
      }
      return response;
    } catch (error: any) {
      if (error.response?.status === 401) {
        Swal.fire({
          icon: "error",
          title: "Invalid Credentials",
          text: "Check your email and password and try again.",
          showConfirmButton: true,
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Login Failed",
          text: error.response?.data?.message || "Something went wrong!",
          showConfirmButton: true,
        });
      }
      throw error;
    }
  };
  const registerUser = async (
    body: any
  ): Promise<AxiosResponse<any> | void> => {
    try {
      const formData = new FormData();

      for (const key in body) {
        if (key === "profileImage" && body[key]) {
          formData.append("profileImage", body[key]);
        } else {
          formData.append(key, body[key]);
        }
      }

      const response = await Apis.register(formData);
      return response;
    } catch (error) {
      throw error;
    }
  };

  const veriftOtp = async (
    email: string,
    otp: string
  ): Promise<AxiosResponse<any> | void> => {
    try {
      const response = await Apis.verifyOtp(email, otp);

      if (response?.data?.token) {
        const existingToken = localStorage.getItem("token");

        if (existingToken) {
          localStorage.removeItem("token");
        }

        localStorage.setItem("token", response.data.token);
        return response;
      }
      return response;
    } catch (error) {
      throw error;
    }
  };
  const forgotPassword = async (
    email: string
  ): Promise<AxiosResponse<any> | void> => {
    try {
      const response = await Apis.forgetPassword(email);
      return response;
    } catch (error) {
      throw error;
    }
  };
  const resetPassword = async (
    password: string
  ): Promise<AxiosResponse<any> | void> => {
    try {
      const body = {
        newPassword: password,
      };
      const response = await Apis.updatePassword(body);
      return response;
    } catch (error) {
      throw error;
    }
  };

  return { login, registerUser, veriftOtp, forgotPassword, resetPassword };
};
