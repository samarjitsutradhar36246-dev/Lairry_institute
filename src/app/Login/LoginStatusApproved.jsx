import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Avatar,
  Button,
  Container,
  CssBaseline,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import DescriptionIcon from "@mui/icons-material/Description";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: { main: "#259df4" },
    secondary: { main: "#a855f7" },
    background: {
      default: "#0f1318",
      paper: "rgba(24,32,39,0.6)",
    },
    text: {
      primary: "#ffffff",
      secondary: "#9cadba",
    },
  },
  typography: {
    fontFamily: "Inter, sans-serif",
  },
  shape: { borderRadius: 16 },
});

export default function LoginStatus({onnext}) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      {/* Ambient background */}
      <Box
        sx={{
          position: "fixed",
          inset: 0,
          zIndex: 0,
          background:
            "radial-gradient(60% 60% at 50% 20%, rgba(37,157,244,0.08), transparent), radial-gradient(40% 40% at 80% 80%, rgba(168,85,247,0.08), transparent)",
        }}
      />

      {/* Top Nav */}
      <AppBar
        position="relative"
        elevation={0}
        sx={{
          backdropFilter: "blur(12px)",
          background: "rgba(17,21,24,0.8)",
          borderBottom: "1px solid rgba(255,255,255,0.05)",
        }}
      >
        <Toolbar sx={{ maxWidth: 1280, mx: "auto", width: "100%" }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Box
              sx={{
                width: 32,
                height: 32,
                borderRadius: 1.5,
                bgcolor: "primary.main",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 0 12px rgba(37,157,244,0.6)",
              }}
            />
            <Typography fontWeight={700}>
              LAIRRY <Box component="span" sx={{ color: "#9cadba", fontWeight: 400, mx: 1 }}>|</Box>
              Institute Console
            </Typography>
          </Box>
          <Box sx={{ flexGrow: 1 }} />
          <IconButton>
            <NotificationsNoneIcon sx={{ color: "#9cadba" }} />
          </IconButton>
          <Avatar
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCViUi-S3xO0LnMBxbncFAA60-YYWwqgC5o22DbGrZOWnr1DzChZechNedIlsKaC1O1ZAHneSuCPuEL6tIH6kvtnPQCkV-5_5STKbUyB1JUKBBfWAaBFCteZ_0JHvsrPyd9AFnwMr2jSlOVrfN3EoAtN96DDSkexgN-we1NSv9LdRy7dMCzLmEpW1Pj02nLxLRSpNJmOfdDisqfMq-MmS-E95Yq9GWQ8oYhlmWLA9JlYN5IiR7eIDDy0C4CFXjeePNRtgutSwr3EndL"
            sx={{ border: "2px solid rgba(37,157,244,0.3)", ml: 1 }}
          />
        </Toolbar>
      </AppBar>

      {/* Main */}
      <Container
        maxWidth="sm"
        sx={{ position: "relative", zIndex: 1, mt: 10, mb: 10 }}
      >
        <Box
          sx={{
            p: 4,
            borderRadius: 4,
            textAlign: "center",
            backdropFilter: "blur(14px)",
            background: "linear-gradient(145deg, rgba(24,32,39,0.7), rgba(17,21,24,0.85))",
            border: "1px solid rgba(255,255,255,0.08)",
            boxShadow: "0 0 40px rgba(0,0,0,0.4)",
          }}
        >
          {/* Icon */}
          <Box sx={{ position: "relative", mb: 4 }}>
            <Box
              sx={{
                position: "absolute",
                inset: 0,
                borderRadius: "50%",
                bgcolor: "primary.main",
                opacity: 0.25,
                filter: "blur(32px)",
              }}
            />
            <Box
              sx={{
                position: "relative",
                width: 96,
                height: 96,
                borderRadius: "50%",
                mx: "auto",
                bgcolor: "#0b0f14",
                border: "1px solid rgba(37,157,244,0.4)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 0 30px rgba(37,157,244,0.3)",
              }}
            >
              <VerifiedUserIcon sx={{ fontSize: 56, color: "primary.main" }} />
            </Box>
          </Box>

          {/* Badge */}
          <Box
            sx={{
              display: "inline-flex",
              alignItems: "center",
              gap: 1,
              px: 3,
              py: 0.75,
              mb: 3,
              borderRadius: 999,
              bgcolor: "rgba(37,157,244,0.1)",
              border: "1px solid rgba(37,157,244,0.25)",
              color: "primary.main",
              fontSize: 12,
              fontWeight: 700,
              letterSpacing: 1.5,
            }}
          >
            <Box sx={{ width: 8, height: 8, borderRadius: "50%", bgcolor: "primary.main" }} />
            APPROVED
          </Box>

          <Typography variant="h4" fontWeight={700} gutterBottom>
            Welcome to Lairry
          </Typography>
          <Typography color="text.secondary" sx={{ mb: 4 }}>
            Your institute has been successfully verified. You now have full access to exam creation tools and analytics.
          </Typography>

          <Button onClick={onnext}
            fullWidth
            size="large"
            variant="contained"
            endIcon={<ArrowForwardIcon />}
            sx={{
              height: 48,
              fontWeight: 700,
              boxShadow: "0 0 24px rgba(37,157,244,0.45)",
              mb: 3,
            }}
          >
            Enter Dashboard
          </Button>

          <Box sx={{ display: "flex", justifyContent: "center", gap: 3, fontSize: 13 }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, color: "#6e7c87" }}>
              <DescriptionIcon fontSize="small" /> Documentation
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, color: "#6e7c87" }}>
              <SupportAgentIcon fontSize="small" /> Contact Support
            </Box>
          </Box>
        </Box>

        <Typography
          align="center"
          sx={{ mt: 3, color: "#56636d", fontSize: 14 }}
        >
          Step 3 of 3: Verification Complete
        </Typography>
      </Container>

      {/* Footer */}
      <Box
        sx={{
          textAlign: "center",
          py: 4,
          color: "#48535b",
          borderTop: "1px solid rgba(255,255,255,0.05)",
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "center", gap: 4, mb: 1 }}>
          <Typography variant="caption">Privacy Policy</Typography>
          <Typography variant="caption">Terms of Service</Typography>
          <Typography variant="caption">System Status</Typography>
        </Box>
        <Typography variant="caption">© 2024 LAIRRY Inc. All rights reserved.</Typography>
      </Box>
    </ThemeProvider>
  );
}
