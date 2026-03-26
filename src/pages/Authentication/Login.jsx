import {
  Box,
} from "@mui/material";

import { useSupabase } from "../../contextProvider/SupabaseProvider";
import { useState } from "react";

import LoginForm from "../../components/Login/LoginForm";
import LoginLeftContent from "../../components/Login/LoginLeftContent";


const Login = () => {
  
      const { loginUser, resetPassword,user } = useSupabase();
  
      const [email, setEmail] = useState("");
      const [password, setPassword] = useState("");
      const [loading, setLoading] = useState(false);
      const [error, setError] = useState(null);
      const [rememberMe, setRememberMe] = useState(false);
      const [showPassword, setShowPassword] = useState(false);
  return (
    <Box sx={{minHeight: "100vh", overflow:"hidden", display: "flex",fontFamily: "'Space Grotesk', sans-serif",bgcolor: "#101322", color: "#fff",}}>
      {/* LEFT SIDE */}
     <LoginLeftContent/>
      {/* RIGHT SIDE */}
    <LoginForm 
    loginUser={loginUser}
  resetPassword={resetPassword}
  user={user}
  email={email}
  setEmail={setEmail}
  password={password}
  setPassword={setPassword}
  loading={loading}
  setLoading={setLoading}
  error={error}
  setError={setError}
  rememberMe={rememberMe}
  setRememberMe={setRememberMe}
  showPassword={showPassword}
  setShowPassword={setShowPassword}
    />
    </Box>
  );
};



export default Login;
