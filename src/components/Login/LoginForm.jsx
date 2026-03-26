import React from "react";
import {
    Box,
    Typography,
    TextField,
    Button,
    Checkbox,
    FormControlLabel,
    Link
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";

import { useNavigate } from "react-router-dom";

import LoginFormBg from '../../components/Login/LoginFormBg'
import LoginCardLogo from "./LoginCardLogo";
import LoadingDialog from "../Loading Screen/LoadingDialog";
const LoginForm = ({loginUser,email,setEmail,password,setPassword,loading,setLoading, error,setError,rememberMe,setRememberMe,showPassword,setShowPassword}) => {
     const navigate = useNavigate();
        const handleLogin = async (e) => {
        e.preventDefault();
        
        setError(null);

        try {
            setLoading(true);
           await loginUser(email, password);
           
          
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };
    return (
        <>
        <LoadingDialog open={loading}/>
            {/* RIGHT SIDE */}
            <Box
                sx={{
                    width: { xs: "100%", lg: "50%" },
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    p: 3,
                    position: "relative",
                }}
            >
                {/* Background blobs */}
                <LoginFormBg/>
                {/* Login Card */}
                <Box
                    sx={{
                        width: "100%",
                        maxWidth: 440,
                        p: { xs: 4, sm: 3, },
                        borderRadius: "1rem",
                        background: "rgba(255,255,255,0.03)",
                        backdropFilter: "blur(16px)",
                        border: "1px solid rgba(255,255,255,0.08)",
                        boxShadow: "0 4px 30px rgba(0,0,0,0.1)",
                        zIndex: 2,
                    }}
                >
                    {/* Logo */}
                   <LoginCardLogo/>

                    {/* Form */}
                    <Box component="form" sx={{ display: "flex", flexDirection: "column", gap: 2.5, p:1 }}>
                        <TextField
                            placeholder="Enter your email"
                            type="email"
                            value={email}
                            color="#0F1220"
                            onChange={(e) => setEmail(e.target.value)}
                            InputProps={{
                                startAdornment: (
                                    <span className="material-symbols-outlined" style={{ marginRight: 8 }}>
                                        mail
                                    </span>
                                ),
                            }}
                            sx={inputStyle}
                        />

                        <TextField
                            placeholder="Enter your password"
                            type={showPassword ? "text" : "password"}
                            value={password}
                            color="#0F1220"
                            onChange={(e) => setPassword(e.target.value)}
                            InputProps={{
                                startAdornment: (
                                    <span className="material-symbols-outlined" style={{ marginRight: 8 }}>
                                        lock
                                    </span>
                                ),
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            onClick={() => setShowPassword((prev) => !prev)}
                                            edge="end"
                                            sx={{ color: "#94a3b8" }}
                                        >
                                            {showPassword ? <Visibility /> : <VisibilityOff />}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                            sx={inputStyle}
                        />

                        <Box display="flex" justifyContent="space-between" alignItems="center">
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={rememberMe}
                                        onChange={(e) => setRememberMe(e.target.checked)}
                                        sx={{ color: "#64748b" }}
                                    />}
                                label="Remember me"
                            />
                            <Link
                                component="button"
                                underline="none"
                                color="#1337ec"
                                fontSize={14}
                                onClick={() => navigate("/forgot-password")}
                            >
                                Forgot password?
                            </Link>
                        </Box>
                        {error && (
                            <Typography color="error" fontSize={14} mt={2} textAlign="center">
                                {error}
                            </Typography>
                        )}

                        <Button
                            fullWidth
                            onClick={handleLogin}
                            disabled={loading}
                            sx={{
                                py: 1.6,
                                borderRadius: "0.75rem",
                                fontWeight: 700,
                                bgcolor: "#1337ec",
                                boxShadow: "0 0 20px rgba(19,55,236,0.3)",
                                "&:hover": {
                                    bgcolor: "#0f2fd1",
                                    boxShadow: "0 0 30px rgba(19,55,236,0.5)",
                                    transform: "translateY(-2px)",
                                },
                            }}
                        >
                            {loading ? "Logging in..." : "Login"}
                        </Button>
                    </Box>

                    <Typography textAlign="center" mt={4} color="#94a3b8" fontSize={14}>
                        Don&apos;t have an account?{" "}
                        <Link
                            component="button"
                            fontWeight={700}
                            color="#1337ec"
                            underline="none"
                            onClick={() => navigate("/register")}
                        >
                            Register
                        </Link>

                    </Typography>
                </Box>
            </Box>

        </>
    )
}
const inputStyle = {
    "& .MuiOutlinedInput-root": {
        bgcolor: "#151725",
        color: "#fff",
        borderRadius: "0.75rem",
        "& fieldset": { borderColor: "#334155" },
        "&:hover fieldset": { borderColor: "#1337ec" },
        "&.Mui-focused fieldset": { borderColor: "#1337ec" },
    },
};
export default LoginForm