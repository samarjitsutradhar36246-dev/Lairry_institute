import React from "react";
import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoute() {
  const isAuth = localStorage.getItem("auth") === "true";

  if (!isAuth) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />; // Render dashboard pages inside this
}
