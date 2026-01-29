
import { createBrowserRouter } from "react-router-dom";

import {
  ThemeProvider,
  createTheme,
  CssBaseline,
  Box,
  Typography,
  Card,
  CardContent,
  TextField,
  Button,
  Stack,
  Avatar,
  Link,
  Chip,
} from "@mui/material";

import LockIcon from "@mui/icons-material/Lock";
import SmartphoneIcon from "@mui/icons-material/Smartphone";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import SecurityIcon from "@mui/icons-material/Security";
import SmartToyIcon from "@mui/icons-material/SmartToy";

// ---------------- THEME ----------------
const theme = createTheme({
  palette: {
    mode: "dark",
    primary: { main: "#259df4" },
    background: {
      default: "#0B1120",
      paper: "rgba(17,24,39,0.6)",
    },
    text: {
      primary: "#ffffff",
      secondary: "#9ca3af",
    },
  },
  typography: {
    fontFamily: "Inter, sans-serif",
  },
});

export default function LairryInstituteLogin({onnext}) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      {/* BACKGROUND EFFECTS */}
      <Box sx={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none" }}>
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            opacity: 0.05,
            backgroundImage:
              "linear-gradient(to right, #1e293b 1px, transparent 1px), linear-gradient(to bottom, #1e293b 1px, transparent 1px)",
            backgroundSize: "50px 50px",
            maskImage: "radial-gradient(circle at center, black 30%, transparent 80%)",
            WebkitMaskImage:
              "radial-gradient(circle at center, black 30%, transparent 80%)",
          }}
        />
        <Box
          sx={{
            position: "absolute",
            top: "-20%",
            left: "-10%",
            width: "60vw",
            height: "60vw",
            bgcolor: "primary.main",
            opacity: 0.1,
            borderRadius: "50%",
            filter: "blur(140px)",
          }}
        />
        <Box
          sx={{
            position: "absolute",
            bottom: "-20%",
            right: "-10%",
            width: "60vw",
            height: "60vw",
            bgcolor: "#7c3aed",
            opacity: 0.1,
            borderRadius: "50%",
            filter: "blur(140px)",
          }}
        />
      </Box>

      {/* HEADER */}
      <Box sx={{ position: "relative", zIndex: 2, pt: 8, pb: 4, textAlign: "center" }}>
        <Stack direction="row" spacing={2} justifyContent="center" alignItems="center">
          <Avatar
            sx={{
              width: 44,
              height: 44,
              bgcolor: "transparent",
              background: "linear-gradient(135deg, #259df4, #7c3aed)",
              boxShadow: "0 0 20px rgba(37,157,244,.4)",
            }}
          >
            <SmartToyIcon />
          </Avatar>
          <Box textAlign="left">
            <Typography fontSize={28} fontWeight={800} lineHeight={1}>
              LAIRRY
            </Typography>
            <Typography
              fontSize={10}
              letterSpacing="0.3em"
              fontWeight={700}
              color="primary"
            >
              INSTITUTE CONSOLE
            </Typography>
          </Box>
        </Stack>
      </Box>

      {/* MAIN */}
      <Box
        sx={{
          position: "relative",
          zIndex: 2,
          minHeight: "70vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          px: 2,
        }}
      >
        <Card
          sx={{
            width: "100%",
            maxWidth: 420,
            borderRadius: 4,
            backdropFilter: "blur(24px)",
            background: "rgba(17,24,39,0.6)",
            border: "1px solid rgba(255,255,255,0.08)",
            boxShadow: "0 25px 50px -12px rgba(0,0,0,.5)",
          }}
        >
          <CardContent sx={{ p: 4 }}>
            <Stack spacing={3} alignItems="center" textAlign="center">
              <Avatar
                sx={{
                  width: 56,
                  height: 56,
                  bgcolor: "rgba(0,0,0,0.6)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  boxShadow: "inset 0 1px 1px rgba(255,255,255,.1)",
                }}
              >
                <LockIcon sx={{ color: "primary.main" }} />
              </Avatar>

              <Box>
                <Typography variant="h5" fontWeight={700}>
                  Secure Login
                </Typography>
                <Typography fontSize={14} color="text.secondary" mt={1}>
                  Enter your registered mobile number to proceed to the verification step.
                </Typography>
              </Box>

              <Box width="100%" textAlign="left">
                <Typography
                  fontSize={11}
                  fontWeight={700}
                  letterSpacing="0.15em"
                  color="text.secondary"
                  mb={1}
                >
                  PHONE NUMBER
                </Typography>
                <Stack direction="row" spacing={2}>
                  <TextField
                    value="+91"
                    InputProps={{ readOnly: true }}
                    sx={{
                      width: 72,
                      input: { textAlign: "center", fontWeight: 700 },
                      background: "rgba(11,17,32,0.5)",
                      borderRadius: 2,
                    }}
                  />
                  <TextField
                    fullWidth
                    placeholder="98765 43210"
                    InputProps={{
                      startAdornment: <SmartphoneIcon sx={{ mr: 1, color: "#6b7280" }} />,
                    }}
                    sx={{
                      background: "rgba(11,17,32,0.5)",
                      borderRadius: 2,
                      input: { fontWeight: 500, letterSpacing: "0.08em" },
                    }}
                  />
                </Stack>
              </Box>

              <Button 
                onClick={onnext}
                fullWidth
                size="large"
                variant="contained"
                endIcon={<ArrowForwardIcon />}
                sx={{
                  py: 1.6,
                  fontWeight: 700,
                  background: "linear-gradient(90deg, #259df4, #1a8cd8)",
                  boxShadow: "0 0 25px rgba(37,157,244,.4)",
                }}
              >
                Proceed to Verify
              </Button>

              <Stack spacing={2} alignItems="center" mt={2}>
                <Chip
                  icon={<SecurityIcon sx={{ color: "#34d399" }} />}
                  label="BANKING GRADE SECURITY"
                  sx={{
                    fontSize: 10,
                    letterSpacing: "0.2em",
                    bgcolor: "rgba(255,255,255,0.05)",
                  }}
                />
                <Typography fontSize={12} color="text.secondary">
                  New institute?{" "}
                  <Link href="#" color="primary" underline="hover">
                    Apply for access
                  </Link>
                </Typography>
              </Stack>
            </Stack>
          </CardContent>
        </Card>
      </Box>

      {/* STEP INDICATOR */}
      <Box sx={{ position: "relative", zIndex: 2, display: "flex", justifyContent: "center", mb: 4 }}>
        <Stack direction="row" spacing={1.5} alignItems="center" px={3} py={1.5} borderRadius={10} bgcolor="rgba(0,0,0,0.3)" border="1px solid rgba(255,255,255,0.05)">
          <Typography fontSize={10} fontWeight={700}>STEP 1 OF 3</Typography>
          <Stack direction="row" spacing={1}>
            <Box sx={{ width: 6, height: 6, borderRadius: "50%", bgcolor: "primary.main", boxShadow: "0 0 10px rgba(37,157,244,.6)" }} />
            <Box sx={{ width: 6, height: 6, borderRadius: "50%", bgcolor: "rgba(255,255,255,0.1)" }} />
            <Box sx={{ width: 6, height: 6, borderRadius: "50%", bgcolor: "rgba(255,255,255,0.1)" }} />
          </Stack>
        </Stack>
      </Box>

      {/* FOOTER */}
      <Box sx={{ position: "relative", zIndex: 2, py: 3, borderTop: "1px solid rgba(255,255,255,0.05)" }}>
        <Stack direction={{ xs: "column", md: "row" }} spacing={2} justifyContent="space-between" alignItems="center" maxWidth={1200} mx="auto" px={3}>
          <Typography fontSize={12} color="text.secondary">
            © 2024 LAIRRY EdTech Systems. All rights reserved.
          </Typography>
          <Stack direction="row" spacing={3}>
            <Link href="#" fontSize={12} color="text.secondary" underline="hover">Privacy Policy</Link>
            <Link href="#" fontSize={12} color="text.secondary" underline="hover">Terms of Service</Link>
            <Link href="#" fontSize={12} color="text.secondary" underline="hover">Help Center</Link>
          </Stack>
        </Stack>
      </Box>
    </ThemeProvider>
  );
}
