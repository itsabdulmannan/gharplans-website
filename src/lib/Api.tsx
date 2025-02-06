import { Request } from "../utils/useHttp";

export const Apis = {
  login: (email: string, password: string) =>
    Request.post("/user/login", { email, password }),

  register: (body: FormData) => {
    return Request.post("/user/register", body, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  },
  verifyOtp: (email: string, otp: string) =>
    Request.post("/user/verify-otp", { email, otp }),
  forgetPassword: (email: string) =>
    Request.post("/user/send-reset-password-otp", { email }),
  updatePassword: (body: any) =>
    Request.post("/user/reset-password", body, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }),

  // Products
  getProducts: (
    categoryId?: string,
    minPrice?: number,
    maxPrice?: number,
    offset: number = 0,
    limit: number = 10
  ) =>
    Request.get(
      `/product?${categoryId ? `categoryId=${categoryId}&` : ""}${
        minPrice ? `minPrice=${minPrice}&` : ""
      }${
        maxPrice ? `maxPrice=${maxPrice}&` : ""
      }offset=${offset}&limit=${limit}`
    ),

  getProductById: (id: string) => Request.get(`/product?id=${id}`),
  getFeaturedProducts: (id: string) =>
    Request.get(`/product/similar-products/${id}`),
  // Category
  getCategory: () => Request.get("/category"),
  getFeaturedProductsByCategory: () =>
    Request.get("/product/featured-products"),
  // User
  getUser: () =>
    Request.get("/user", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }),
  bankAccountDetails: () => {
    return Request.get("/bank/bankAccountDetails");
  },
  postReview: (body: any) => {
    return Request.post("/reviews", body, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
  },
  getReviews: (id: number, status: string) =>
    Request.get(`/reviews?productId=${id}&status=${status}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }),
  getOrder: (userId: number) =>
    Request.get(`/orders?userId=${userId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }),
};
