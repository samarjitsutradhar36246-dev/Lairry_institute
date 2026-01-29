import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useInstituteSupabase } from "../supabase/InstituteSupabaseProvider";

export default function ProtectedRoute() {
  const { session, loading } = useInstituteSupabase();
  // console.log("AUTH CHECK:", session);

  // Still checking auth state
  if (loading) {
    return null; // or a loader/spinner
  }

  // Not logged in
  if (!session) {
    return <Navigate to="/institutes-login" replace />;
  }

  // Logged in → allow access
  return <Outlet />;
}
