// App.js
import { BrowserRouter as Router } from "react-router-dom";
import InstituteRoutes from "./Routes/InstituteRoutes";

export default function App() {
  return (
    <Router>
      <InstituteRoutes />
    </Router>
  );
}
