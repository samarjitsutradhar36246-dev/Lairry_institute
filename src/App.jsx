// App.js
import { BrowserRouter as Router } from "react-router-dom";
import InstituteRoutes from "./Routes/InstituteRoutes";
import { InstituteSupabaseProvider } from "./supabase/InstituteSupabaseProvider";

export default function App() {
  return (
    <Router>
      <InstituteSupabaseProvider>
      <InstituteRoutes />
      </InstituteSupabaseProvider>
    </Router>
  );
}
