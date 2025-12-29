import {
  ThemeProvider,
  createTheme,
  CssBaseline,
  Box,
  Typography,
  Stack,
  Button,
  Avatar,
  LinearProgress,
  IconButton,
  Divider,
  Link
} from "@mui/material";

import SchoolIcon from "@mui/icons-material/School";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import HourglassTopIcon from "@mui/icons-material/HourglassTop";
import PendingIcon from "@mui/icons-material/Pending";
import RefreshIcon from "@mui/icons-material/Refresh";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import ScheduleIcon from "@mui/icons-material/Schedule";
import FactCheckIcon from "@mui/icons-material/FactCheck";
import ChatIcon from "@mui/icons-material/Chat";

const HEADER_HEIGHT = 64;
const FOOTER_HEIGHT = 72;

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: { main: "#259df4" },
    background: {
      default: "#0f1319",
      paper: "rgba(22,27,34,0.6)"
    },
    text: {
      primary: "#ffffff",
      secondary: "#9ca3af"
    }
  },
  typography: {
    fontFamily: "Inter, sans-serif"
  }
});

export default function LoginAndStatusgate3({ onnext }) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      {/* PAGE WRAPPER */}
      <Box
        sx={{
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          bgcolor: "background.default",
          overflow: "hidden"
        }}
      >
        {/* HEADER */}
        <Box
          sx={{
            height: HEADER_HEIGHT,
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            zIndex: 10,
            backdropFilter: "blur(10px)",
            bgcolor: "rgba(17,21,24,0.8)",
            borderBottom: "1px solid rgba(255,255,255,0.08)"
          }}
        >
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            sx={{ maxWidth: 1440, mx: "auto", px: 3, height: "100%" }}
          >
            <Stack direction="row" spacing={2} alignItems="center">
              <Avatar
                sx={{
                  width: 32,
                  height: 32,
                  bgcolor: "transparent",
                  background: "linear-gradient(135deg,#259df4,#a855f7)",
                  boxShadow: "0 0 12px rgba(37,157,244,.6)"
                }}
              >
                <SchoolIcon fontSize="small" />
              </Avatar>

              <Typography fontWeight={700}>
                LAIRRY
                <Box component="span" sx={{ mx: 1, color: "#6b7280" }}>
                  |
                </Box>
                <Box component="span" color="primary.main" fontWeight={500}>
                  Institute Console
                </Box>
              </Typography>
            </Stack>

            <Stack direction="row" spacing={3} alignItems="center">
              <Button
                startIcon={<HelpOutlineIcon />}
                sx={{
                  color: "#9ca3af",
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: 2,
                  textTransform: "none"
                }}
              >
                Help Center
              </Button>

              <Stack direction="row" spacing={1.5} alignItems="center">
                <Box textAlign="right">
                  <Typography fontSize={14} fontWeight={600}>
                    Aditya Birla
                  </Typography>
                  <Typography fontSize={12} color="text.secondary">
                    Admin
                  </Typography>
                </Box>
                <Avatar src="https://lh3.googleusercontent.com/aida-public/AB6AXuCIhSTvc2hIP7PcHzU48Z2MA5XvGBREeEFFu8bRsSIIgI-LiB3lZiW3Afuqo1b1TC8GK7mCChSsGWo2jEGcfnQu42odExC3nbe7AtDBfLK293JRgh5gABl-6CBwKO5zz4QwxAxqcHbmDkTRhF86dD130qXfUpKxrdIytV31Z78sjzRagFm7wu4360bkkDPZQvdmFeYQEco6erotjj28ximdoH0wdZo9_pxaSWkfYPxXezX1Ajj-zrVgEMDxbGgwv9PBbeU3lqiOiqVv" />
              </Stack>
            </Stack>
          </Stack>
        </Box>

        {/* MAIN */}
        <Box
          sx={{
            mt: `${HEADER_HEIGHT}px`,
            height: `calc(100vh - ${HEADER_HEIGHT}px - ${FOOTER_HEIGHT}px)`,
            px: 2,
            position: "relative",
            overflow: "hidden"
          }}
        >
          {/* BACKGROUND GLOW */}
          <Box
            sx={{
              position: "absolute",
              inset: 0,
              maxWidth: 900,
              mx: "auto",
              background:
                "radial-gradient(circle at top, rgba(37,157,244,.15), transparent 70%)",
              pointerEvents: "none"
            }}
          />

          <Stack
            height="100%"
            spacing={4}
            alignItems="center"
            justifyContent="center"
          >
            {/* PROGRESS */}
            <Box sx={{ width: "100%", maxWidth: 520 }}>
              <Stack direction="row" justifyContent="space-between" mb={1}>
                <Typography fontSize={13} fontWeight={600} color="primary.main">
                  ONBOARDING PROGRESS
                </Typography>
                <Typography fontSize={12} color="text.secondary">
                  Step 3 of 3
                </Typography>
              </Stack>
              <LinearProgress
                variant="determinate"
                value={100}
                sx={{
                  height: 6,
                  borderRadius: 3,
                  bgcolor: "#1b2227",
                  "& .MuiLinearProgress-bar": {
                    background: "linear-gradient(90deg,#259df4,#a855f7)",
                    boxShadow: "0 0 10px rgba(37,157,244,.6)"
                  }
                }}
              />
            </Box>

            {/* CARD */}
            <Box sx={{ width: "100%", maxWidth: 720 }}>
              <Box
                sx={{
                  p: { xs: 4, sm: 6 },
                  borderRadius: 3,
                  bgcolor: "rgba(17,21,24,.6)",
                  border: "1px solid rgba(255,255,255,.1)",
                  backdropFilter: "blur(14px)",
                  textAlign: "center"
                }}
              >
                {/* ICON */}
                <Box sx={{ position: "relative", display: "inline-flex", mb: 4 }}>
                  <Box
                    sx={{
                      position: "absolute",
                      inset: 0,
                      borderRadius: "50%",
                      bgcolor: "primary.main",
                      opacity: 0.2,
                      filter: "blur(30px)"
                    }}
                  />
                  <Box
                    sx={{
                      width: 96,
                      height: 96,
                      borderRadius: "50%",
                      bgcolor: "#1b2227",
                      border: "1px solid rgba(37,157,244,.4)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center"
                    }}
                  >
                    <HourglassTopIcon sx={{ fontSize: 48, color: "primary.main" }} />
                  </Box>
                  <Box
                    sx={{
                      position: "absolute",
                      bottom: -6,
                      right: -6,
                      bgcolor: "#1b2227",
                      border: "1px solid rgba(255,255,255,.2)",
                      borderRadius: "50%",
                      p: 0.5
                    }}
                  >
                    <PendingIcon sx={{ fontSize: 20, color: "#facc15" }} />
                  </Box>
                </Box>

                <Typography variant="h4" fontWeight={800} gutterBottom>
                  Verification in Progress
                </Typography>

                <Typography color="text.secondary" maxWidth={520} mx="auto">
                  Our AI compliance engine is currently reviewing your institute’s
                  credentials to ensure platform integrity.
                </Typography>

                {/* ACTIONS */}
                <Stack
                  direction={{ xs: "column", sm: "row" }}
                  spacing={2}
                  justifyContent="center"
                  mt={5}
                >
                  <Button
                    onClick={onnext}
                    startIcon={<RefreshIcon />}
                    variant="contained"
                    sx={{ px: 4 }}
                  >
                    Check Status
                  </Button>
                  <Button
                    startIcon={<SupportAgentIcon />}
                    sx={{
                      px: 4,
                      border: "1px solid rgba(255,255,255,.15)",
                      color: "#d1d5db"
                    }}
                  >
                    Contact Support
                  </Button>
                </Stack>
              </Box>
            </Box>

            <Typography fontSize={14} color="text.secondary">
              Need immediate assistance?{" "}
              <Link color="primary">Read our Verification FAQ</Link>
            </Typography>
          </Stack>
        </Box>

        {/* FOOTER */}
        <Box
          sx={{
            height: FOOTER_HEIGHT,
            borderTop: "1px solid rgba(255,255,255,.08)",
            display: "flex",
            alignItems: "center"
          }}
        >
          <Stack
            direction={{ xs: "column", md: "row" }}
            spacing={2}
            justifyContent="space-between"
            alignItems="center"
            maxWidth={960}
            mx="auto"
            px={3}
            width="100%"
          >
            <Typography fontSize={13} color="text.secondary">
              © 2024 LAIRRY EdTech. All rights reserved.
            </Typography>
            <Stack direction="row" spacing={3}>
              <Link color="text.secondary">Privacy Policy</Link>
              <Link color="text.secondary">Terms</Link>
              <Link color="text.secondary">Compliance</Link>
            </Stack>
          </Stack>
        </Box>

        {/* FLOATING CHAT */}
        <IconButton
          sx={{
            position: "fixed",
            bottom: 24,
            right: 24,
            bgcolor: "#1b2227",
            border: "1px solid rgba(37,157,244,.4)",
            color: "primary.main"
          }}
        >
          <ChatIcon />
        </IconButton>
      </Box>
    </ThemeProvider>
  );
}
