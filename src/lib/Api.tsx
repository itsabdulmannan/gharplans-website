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
    limit: number = 10,
    searchQuery: string = ""
  ) =>
    Request.get(
      `/product?${categoryId ? `categoryId=${categoryId}&` : ""}${
        minPrice ? `minPrice=${minPrice}&` : ""
      }${
        maxPrice ? `maxPrice=${maxPrice}&` : ""
      }offset=${offset}&limit=${limit}${
        searchQuery ? `&name=${searchQuery}` : ""
      }`
    ),
  addToFavourite: (productId: number) =>
    Request.post(
      `/favourites/add`,
      { productId },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
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
  // Favourite Products
  getFavouriteProducts: () =>
    Request.get(`/favourites/`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }),
  removeFavouriteProduct: (ProductId: number) =>
    Request.delete(`/favourites/remove`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      data: {
        ProductId,
      },
    }),
  addToCart: (body: any) => Request.post("/cart/add", body),
  getCart: () => Request.get("/cart/items"),
  removeFromCart: (productId: number) =>
    Request.delete(`/cart/delete`, { data: { productId } }),
  updateQuantity: (id: number, quantity: number, productId: number) =>
    Request.put(`/cart/update`, { id, quantity, productId }),
  createOrder: (body: any) => Request.post("/orders", body),
  getCaoruselItems: () => Request.get("/product/carousel-products"),
  getBannerItems: () => Request.get("/banners/get"),
};
