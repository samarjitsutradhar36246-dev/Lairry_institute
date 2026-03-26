import { Navigate,useLocation  } from "react-router-dom";
import { useSupabase } from "../../contextProvider/SupabaseProvider";
const PublicOnlyRoute = ({ children }) => {
  const { user, loading } = useSupabase();
const location=useLocation()
  if (loading) return null;

  // 🔒 Logged-in users should NOT see login/register
  if (user && (location.pathname === "/login" || location.pathname === "/register")) {
    return <Navigate to="/" replace />;
  } 
  return children;
};

export default PublicOnlyRoute;
