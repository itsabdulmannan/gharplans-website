import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../layouts/RootLayout";
import Shop from "../components/Shop/Filters/Shop";
import ProductDetail from "../components/Shop/ProductDetails/ProductDetail";
import Cart from "../pages/Cart";
import LoginForm from "../components/Auth/LoginForm";
import SignupForm from "../components/Auth/SignupForm";
import ForgotPasswordForm from "../components/Auth/ForgotPasswordForm";
import VerifyOTPForm from "../components/Auth/VerifyOTPForm";
import ResetPasswordForm from "../components/Auth/ResetPasswordForm";
import UserProfile from "../pages/UserProfile";
import Checkout from "../pages/Checkout";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { path: "shop", element: <Shop /> },
      { path: "shop/product/:id", element: <ProductDetail /> },
      { path: "cart", element: <Cart /> },
      { path: "checkout", element: <Checkout /> },
      { path: "profile", element: <UserProfile /> },
      { path: "login", element: <LoginForm /> },
      { path: "signup", element: <SignupForm /> },
      { path: "forgot-password", element: <ForgotPasswordForm /> },
      { path: "verify-otp", element: <VerifyOTPForm /> },
      { path: "reset-password", element: <ResetPasswordForm /> },
    ],
  },
]);
