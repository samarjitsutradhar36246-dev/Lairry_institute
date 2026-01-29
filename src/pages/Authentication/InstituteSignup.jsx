// src/pages/InstituteSignup.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useInstituteSupabase } from "../../supabase/InstituteSupabaseProvider";
import {
  Box,
  Typography,
  Card,
  CardContent,
  TextField,
  Button,
  Stack,
  Alert,
} from "@mui/material";

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

const InstituteSignup = () => {
  const [form, setForm] = useState({
    institute_email: "",
    temp_password: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const { signupInstitute } = useInstituteSupabase(); // Use provider signup

  const handleChange = (field, value) => {
    setForm({ ...form, [field]: value });
    setErrors({ ...errors, [field]: "" });
  };

  const validate = () => {
    const errs = {};
    if (!form.institute_email) errs.institute_email = "Required";
    if (!form.temp_password) errs.temp_password = "Required";
    if (!form.password || form.password.length < 6)
      errs.password = "Password must be 6+ chars";
    return errs;
  };

const handleSubmit = async (e) => {
  e.preventDefault();
    console.log("form:", form);
  console.log("institute_email:", form?.institute_email);

  if (!form) {
    setErrors({ general: "Form data is missing." });
    return;
  }

  const email = (form.institute_email ?? "").trim().toLowerCase();
  const tempPassword = form.temp_password ?? "";
  const password = form.password ?? "";

  const errs = validate();
  if (Object.keys(errs).length > 0) {
    setErrors(errs);
    return;
  }

  setLoading(true);

 try {
    await signupInstitute({
      email: form.institute_email,
      temp_password: form.temp_password,
      password: form.password,
    });
    alert("Signup successful! Check your email for verification, then login.");
    navigate("/institutes-login");
  } catch (err) {
    setErrors({ general: err.message || "Signup failed" });
  } finally {
    setLoading(false);
  }
};


  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        px: 2,
        background:
          "radial-gradient(circle at top left, rgba(19,127,236,0.1), transparent 40%), radial-gradient(circle at bottom right, rgba(168,85,247,0.1), transparent 40%), #050a10",
      }}
    >
      <GlassCard sx={{ maxWidth: 400, width: "100%", p: 4 }}>
        <CardContent>
          <Typography
            variant="h5"
            fontWeight={700}
            color="white"
            textAlign="center"
            mb={2}
          >
            Institute Signup
          </Typography>

          {errors.general && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {errors.general}
            </Alert>
          )}

          <Stack spacing={2} component="form" onSubmit={handleSubmit}>
            <TextField
              label="Email"
              type="email"
              fullWidth
              value={form.institute_email}
              onChange={(e) => handleChange("institute_email", e.target.value)}
              error={!!errors.institute_email}
              helperText={errors.institute_email}
              sx={{
                input: { color: "white" },
                label: { color: "#94a3b8" },
                "& .MuiOutlinedInput-root": {
                  bgcolor: "rgba(255,255,255,0.05)",
                  "& fieldset": { borderColor: "rgba(255,255,255,0.1)" },
                  "&:hover fieldset": { borderColor: "#22d3ee" },
                },
              }}
            />

            <TextField
              label="Temp Password"
              type="password"
              fullWidth
              value={form.temp_password}
              onChange={(e) => handleChange("temp_password", e.target.value)}
              error={!!errors.temp_password}
              helperText={errors.temp_password}
              sx={{
                input: { color: "white" },
                label: { color: "#94a3b8" },
                "& .MuiOutlinedInput-root": {
                  bgcolor: "rgba(255,255,255,0.05)",
                  "& fieldset": { borderColor: "rgba(255,255,255,0.1)" },
                  "&:hover fieldset": { borderColor: "#22d3ee" },
                },
              }}
            />

            <TextField
              label="Set Your Password"
              type="password"
              fullWidth
              value={form.password}
              onChange={(e) => handleChange("password", e.target.value)}
              error={!!errors.password}
              helperText={errors.password}
              sx={{
                input: { color: "white" },
                label: { color: "#94a3b8" },
                "& .MuiOutlinedInput-root": {
                  bgcolor: "rgba(255,255,255,0.05)",
                  "& fieldset": { borderColor: "rgba(255,255,255,0.1)" },
                  "&:hover fieldset": { borderColor: "#22d3ee" },
                },
              }}
            />

            <Button
              type="submit"
              variant="contained"
              color="info"
              fullWidth
              disabled={loading}
              sx={{ py: 1.5 }}
            >
              {loading ? "Signing up..." : "Sign Up"}
            </Button>
          </Stack>
        </CardContent>
      </GlassCard>
    </Box>
  );
};

export default InstituteSignup;
