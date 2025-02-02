import React from "react";
import { useNavigate } from "react-router-dom";

interface PrivateRouteProps {
  element: JSX.Element;
}

const ProtectedRoutes: React.FC<PrivateRouteProps> = ({ element }) => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  if (!token) {
    navigate("/login", { replace: true });
    return null;
  }
  return element;
};

export default ProtectedRoutes;
