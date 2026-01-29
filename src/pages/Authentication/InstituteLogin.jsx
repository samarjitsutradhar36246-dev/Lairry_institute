// src/pages/InstituteLogin.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useInstituteSupabase } from "../../supabase/InstituteSupabaseProvider";
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Stack,
  Alert,
} from "@mui/material";

// ---------------- GLASS CARD ----------------
const GlassCard = ({ children, sx }) => (
  <Card
    sx={{
      background: "rgba(15,21,32,0.75)",
      backdropFilter: "blur(14px)",
      border: "1px solid rgba(255,255,255,0.08)",
      borderRadius: 3,
      color: "#e5e7eb",
      ...sx,
    }}
  >
    {children}
  </Card>
);

const InstituteLogin = () => {
  const [form, setForm] = useState({ institute_email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const { loginUser } = useInstituteSupabase();

  const handleChange = (field, value) => {
    setForm({ ...form, [field]: value });
    setErrors({ ...errors, [field]: "" });
  };

  const validate = () => {
    const errs = {};
    if (!form.institute_email) errs.institute_email = "Email is required";
    if (!form.password) errs.password = "Password is required";
    return errs;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) return setErrors(errs);

    setLoading(true);
    try {
      await loginUser(form.institute_email, form.password);
      navigate("/institute");
    } catch (err) {
      setErrors({ general: err.message || "Login failed" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        px: 2,
        background:
          "radial-gradient(circle at top left, rgba(19,127,236,0.15), transparent 40%), radial-gradient(circle at bottom right, rgba(168,85,247,0.15), transparent 40%), #050a10",
      }}
    >
      <GlassCard sx={{ width: { xs: "100%", sm: 400 }, p: 4, position: "relative" }}>
        <Typography variant="h5" fontWeight={700} color="white" mb={2} textAlign="center">
          Institute Login
        </Typography>

        {errors.general && <Alert severity="error">{errors.general}</Alert>}

        <CardContent sx={{ p: 0, mt: 2 }}>
          <Stack spacing={3} component="form" onSubmit={handleSubmit}>
            <TextField
              label="Email"
              type="email"
              variant="filled"
              value={form.institute_email}
              onChange={(e) => handleChange("institute_email", e.target.value)}
              error={!!errors.institute_email}
              helperText={errors.institute_email}
              fullWidth
              InputProps={{
                sx: {
                  background: "rgba(255,255,255,0.05)",
                  color: "white",
                  borderRadius: 1,
                },
              }}
              InputLabelProps={{ sx: { color: "#94a3b8" } }}
            />

            <TextField
              label="Password"
              type="password"
              variant="filled"
              value={form.password}
              onChange={(e) => handleChange("password", e.target.value)}
              error={!!errors.password}
              helperText={errors.password}
              fullWidth
              InputProps={{
                sx: {
                  background: "rgba(255,255,255,0.05)",
                  color: "white",
                  borderRadius: 1,
                },
              }}
              InputLabelProps={{ sx: { color: "#94a3b8" } }}
            />

            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={loading}
              sx={{
                py: 1.5,
                bgcolor: "#137fec",
                "&:hover": { bgcolor: "#0f6ed3" },
              }}
            >
              {loading ? "Logging in..." : "Login"}
            </Button>
          </Stack>
        </CardContent>
      </GlassCard>
    </Box>
  );
};

export default InstituteLogin;
