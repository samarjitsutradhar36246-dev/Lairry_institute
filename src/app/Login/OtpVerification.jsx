// LAIRRY Institute Console – OTP Verification (Step 2 of 3)
// React 18 + MUI v5 – Near pixel-perfect Tailwind → MUI conversion
// Single-file production-ready UI

import * as React from "react";
import {
  ThemeProvider,
  createTheme,
  CssBaseline,
  Box,
  Typography,
  Button,
  Stack,
  IconButton,
  TextField,
  LinearProgress
} from "@mui/material";

import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import LockPersonIcon from "@mui/icons-material/LockPerson";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import EditIcon from "@mui/icons-material/Edit";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: { main: "#259df4" },
    background: {
      default: "#000000",
      paper: "rgba(17,21,24,0.7)",
    },
    text: {
      primary: "#ffffff",
      secondary: "#94a3b8",
    },
  },
  typography: {
    fontFamily: "Inter, sans-serif",
  },
});

export default function LairryOTPVerification({onnext}) { 
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      {/* BACKGROUND */}
      <Box
        sx={{
          minHeight: "100vh",
          position: "relative",
          overflow: "hidden",
          bgcolor: "#000",
          background:
            "radial-gradient(ellipse at top, #131b26 0%, #0a0f13 40%, #000 100%)",
        }}
      >
        <Box sx={{ position: "absolute", inset: 0 }}>
          <Box sx={{ position: "absolute", top: "-10%", left: "-10%", width: "50vw", height: "50vw", borderRadius: "50%", bgcolor: "rgba(88,28,135,0.1)", filter: "blur(120px)" }} />
          <Box sx={{ position: "absolute", bottom: "-10%", right: "-10%", width: "40vw", height: "40vw", borderRadius: "50%", bgcolor: "rgba(37,157,244,0.1)", filter: "blur(100px)" }} />
        </Box>

        {/* HEADER */}
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          sx={{ px: { xs: 2, md: 4 }, py: 2, borderBottom: "1px solid rgba(255,255,255,0.05)", backdropFilter: "blur(10px)", position: "relative", zIndex: 2 }}
        >
          <Stack direction="row" spacing={2} alignItems="center">
            <Box sx={{ width: 32, height: 32, borderRadius: 1, bgcolor: "rgba(37,157,244,0.2)", color: "primary.main", display: "flex", alignItems: "center", justifyContent: "center" }}>L</Box>
            <Typography fontWeight={700}>LAIRRY <Typography component="span" color="text.secondary" fontSize={14}>Institute Console</Typography></Typography>
          </Stack>
          <Button startIcon={<HelpOutlineIcon />} sx={{ color: "#cbd5e1", border: "1px solid rgba(255,255,255,0.05)", bgcolor: "rgba(40,50,57,0.5)", borderRadius: 2, textTransform: "none" }}>Help Center</Button>
        </Stack>

        {/* CENTER CARD */}
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "calc(100vh - 72px)", px: 2, position: "relative", zIndex: 2 }}>
          <Box sx={{ width: "100%", maxWidth: 480 }}>

            <Box sx={{ p: 1, borderRadius: 3, background: "linear-gradient(145deg, rgba(255,255,255,0.08), rgba(255,255,255,0.02))" }}>
              <Box sx={{ p: { xs: 3, sm: 4 }, borderRadius: 2.5, bgcolor: "rgba(17,21,24,0.6)", backdropFilter: "blur(16px)", border: "1px solid rgba(255,255,255,0.08)", boxShadow: "0 8px 32px rgba(0,0,0,0.36)" }}>

                {/* PROGRESS */}
                <Stack spacing={1.5} mb={3}>
                  <Stack direction="row" justifyContent="space-between">
                    <Typography fontSize={12} color="primary.main">Step 2 of 3</Typography>
                    <Typography fontSize={12} color="text.secondary" sx={{ letterSpacing: 1 }}>VERIFICATION</Typography>
                  </Stack>
                  <LinearProgress variant="determinate" value={66} sx={{ height: 6, borderRadius: 3, bgcolor: "rgba(59,74,84,0.4)", '& .MuiLinearProgress-bar': { borderRadius: 3, boxShadow: "0 0 12px #259df4" } }} />
                </Stack>

                {/* HEADER */}
                <Stack alignItems="center" spacing={2} textAlign="center">
                  <Box sx={{ width: 56, height: 56, borderRadius: "50%", bgcolor: "linear-gradient(135deg,#1e293b,#0f172a)", display: "flex", alignItems: "center", justifyContent: "center", border: "1px solid rgba(255,255,255,0.05)" }}>
                    <LockPersonIcon sx={{ color: "primary.main", fontSize: 30 }} />
                  </Box>
                  <Typography variant="h4" fontWeight={800}>Verify Identity</Typography>
                  <Typography color="text.secondary" maxWidth={300}>
                    Enter the 6-digit code sent to<br />
                    <Box component="span" color="white" fontWeight={600}>+91 98765 43210</Box>
                    <IconButton size="small" sx={{ ml: 0.5 }}><EditIcon fontSize="small" /></IconButton>
                  </Typography>
                </Stack>

                {/* OTP */}
                <Stack direction="row" spacing={1.5} justifyContent="center" mt={4}>
                  {Array.from({ length: 6 }).map((_, i) => (
                    <TextField
                      key={i}
                      inputProps={{ maxLength: 1, style: { textAlign: "center", fontSize: 20, fontFamily: "monospace" } }}
                      sx={{ width: { xs: 42, sm: 52 }, '& .MuiOutlinedInput-root': { bgcolor: "rgba(11,16,21,0.8)", borderRadius: 2 } }}
                    />
                  ))}
                </Stack>

                {/* ACTIONS */}
                <Stack spacing={2.5} mt={4} alignItems="center">
                  <Typography fontSize={14} color="text.secondary">Resend code in <Box component="span" fontWeight={700} color="white">00:24</Box></Typography>
                
                  <Button  onClick={onnext}

                   fullWidth size="large" variant="contained" endIcon={<ArrowForwardIcon />} sx={{ height: 48, borderRadius: 3, fontWeight: 700, boxShadow: "0 0 20px rgba(37,157,244,0.4)" }}>Verify & Proceed</Button>
                  <Button startIcon={<ArrowBackIcon />} sx={{ color: "#94a3b8", textTransform: "none" }}>Back to Login</Button>
                </Stack>
              </Box>
            </Box>

            {/* FOOTER */}
            <Stack direction="row" spacing={1} justifyContent="center" alignItems="center" mt={3} opacity={0.6}>
              <VerifiedUserIcon sx={{ fontSize: 16, color: "#10b981" }} />
              <Typography fontSize={12}>Secured by LAIRRY Guard™</Typography>
            </Stack>

          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
