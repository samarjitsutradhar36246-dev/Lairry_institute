import React from "react";
import {
    Box,
    Typography,
    Avatar,
    Link,
 
} from "@mui/material";
import { useNavigate } from "react-router-dom";

import RegisterForm from "../../components/Register/RegisterForm";

const Register = () => {
    const navigate = useNavigate();

    return (
        <Box
            sx={{
                height: "100vh",
                display: "flex",
                flexDirection: { xs: "column", lg: "row" },
                fontFamily: "'Space Grotesk', sans-serif",
                bgcolor: "#101322",
                color: "#fff",
                overflow:"hidden"
            }}
        >
            {/* LEFT PANEL */}
            <Box
                sx={{
                    display: { xs: "none", lg: "flex" },
                    width: "50%",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    px: 6,
                    pt:6,
                    
                    mb:1,
                    position: "relative",
                    bgcolor: "#0b0c15",
                  
                }}
            >
                {/* Background */}
                <Box
                    component="img"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDqAvYkQe9bWi7020wTmGuiN4wkCNjSdiFIpdWJ7frIRK4J2KZidIgLBlkhdxKLBhua37YrL7Miw7Ja8uK1yoeEFEJvU9ySByUkiqtqbbj5sLpgX9Rk0cirR00e-mxUY0R_OpSSwiXFtAYa9m9TOoPrV607i75N1NgmRdRFTPy6sdX2sap8VleG4S5UzZ6MZrBRe2l8UDkjtvbvACbYV2SpNWoDSs6MwuX9_kBhe9P67xS7tFzYEl6dOuvryU6Qo5I5CYLF6leY9lU"
                    sx={{
                        position: "absolute",
                        inset: 0,
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        opacity: 0.6,
                    }}
                />

                {/* Overlays */}
                <Box sx={overlayTop} />
                <Box sx={overlaySide} />

                {/* Logo */}
                <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, zIndex: 1 }}>
                    {/* <Box sx={logoIcon}> */}
                        <Avatar
                                                  className="cursor-pointer"
                                                  src="/images/logo.svg"
                                                  sx={{
                                                    width: 40,
                                                    height: 40,
                                                    border: (theme) =>
                                                      `2px solid ${theme.palette.primary.main}`,
                                                  }}
                                                  onClick={() => navigate("/settings")}
                                                />
                    {/* </Box> */}
                    <Typography fontSize={20} fontWeight={700}>
                        Lairry - Online Institute Panel
                    </Typography>
                </Box>

                {/* Bottom Content */}
                <Box sx={{ maxWidth: 520, zIndex: 1 }}>
                    <Box sx={badge}>
                        <Box sx={pulseDot} />
                        <Typography fontSize={14}>
                            10k+ Institutes joined this week
                        </Typography>
                    </Box>

                    <Typography variant="h4" fontWeight={700} mb={2}>
                        Manage your exams with intelligent, personalized guidance.
                    </Typography>
                    <Typography color="#94a3b8" fontSize={18}>
                        Collaborate with us to analyze student's performance in real-time by generating custom mock tests that target weak points.
                    </Typography>
                </Box>
            </Box>

            {/* RIGHT PANEL */}
            <Box
                sx={{
                    flex: 1,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    px: 2,
                    py: 3,
                    position: "relative",
                    
                }}
            >
                {/* Mobile Header */}
                <Box
                    sx={{
                        display: { lg: "none" },
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: 260,
                        overflow: "hidden",
                    }}
                >
                    <Box
                        component="img"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuAB4ilX77i-gSlYY2vvJsJ9gp42xTawA9LmnssA1GJfW1BNCmIOYsyxktTtwnZV3YaAAunUps9T7d9O1xSG7t5CkqVvZDXDqveUOt1IDWxdXeJlEMIWB3cCgEVsVeHKiqbRbOMKNP1mxB5O-_wARye2oBHw2wT-ylEcHpCvU8hzxNLNNkh3XtbHfnsQCvU-gERsmrtNI0xs21njCYERA34Sm0dZS1NfcdVk0btXPvYz0GVZrXlMkyGdHbuyxWWcdcxJykmUaLnJbmI"
                        sx={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.4 }}
                    />
                    <Box sx={mobileGradient} />
                </Box>

                {/* FORM CARD */}
                <Box sx={card}>
                    <Typography variant="h4" fontWeight={700} mb={1}>
                        Create Your Account
                    </Typography>
                    <Typography color="#94a3b8" mb={4}>
                        Your test paper will guide for student's career growth with AI power.
                    </Typography>

                    {/* Role Selector, Inputs , Terms, Submit, Divider, Social,    */}
                    <RegisterForm />

                    <Typography textAlign="center" mt={4} color="#94a3b8">
                        Already have an account? {" "}
                        <Link
                            color="#1337ec"
                            onClick={() => navigate("/login")}
                            component="button"
                        >
                             Login here
                        </Link>
                    </Typography>
                </Box>
            </Box>
        </Box>
    );
};


/* ---------- Styles ---------- */

const card = {
    width: "100%",
    maxWidth: 480,
    p: { xs: 3, lg: 5 },
    borderRadius: "1rem",
    background: "rgba(28,29,39,0.7)",
    backdropFilter: "blur(12px)",
    border: "1px solid rgba(255,255,255,0.08)",
    boxShadow: "0 20px 60px rgba(0,0,0,0.5)",
    zIndex: 1,
};

const logoIcon = {
    height: 40,
    width: 40,
    bgcolor: "#1337ec",
    borderRadius: "0.75rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
};

const badge = {
    display: "inline-flex",
    alignItems: "center",
    px: 2,
    py: 1,
    mb: 2,
    borderRadius: "9999px",
    border: "1px solid rgba(255,255,255,0.1)",
    bgcolor: "rgba(255,255,255,0.05)",
};

const pulseDot = {
    height: 8,
    width: 8,
    borderRadius: "50%",
    bgcolor: "#22c55e",
    mr: 1,
};

const overlayTop = {
    position: "absolute",
    inset: 0,
    background:
        "linear-gradient(to top, #101322, rgba(16,19,34,0.8), rgba(19,55,236,0.1))",
};

const overlaySide = {
    position: "absolute",
    inset: 0,
    background: "linear-gradient(to right, rgba(16,19,34,0.9), transparent)",
};

const mobileGradient = {
    position: "absolute",
    inset: 0,
    background: "linear-gradient(to bottom, transparent, #101322)",
};

export default Register;
