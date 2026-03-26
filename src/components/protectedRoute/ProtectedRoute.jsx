import { Navigate, Outlet,useLocation } from "react-router-dom";
import { useSupabase } from "../../contextProvider/SupabaseProvider";


const ProtectedRoute = () => {
  const location=useLocation()
  const { user,loading} = useSupabase();
   // ⛔ Wait for Supabase to restore session
  if (loading) {
    return null; // or <FullScreenLoader />
  }
  // ❌ Not logged in
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  
  return <Outlet />;
};

export default ProtectedRoute;
