
import {
  Box,
  Typography,
  Button,
  TextField,
  Container,
  Stack,
  Divider,
} from "@mui/material";
import SchoolIcon from "@mui/icons-material/School";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import WarningAmberRoundedIcon from "@mui/icons-material/WarningAmberRounded";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import LockIcon from "@mui/icons-material/Lock";

/**
 * LoginRejected.jsx
 * MUI v5 – near pixel-perfect conversion from Tailwind HTML
 */

export default function LoginRejected() {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        fontFamily: "Inter, sans-serif",
        bgcolor: "#0f0808",
        color: "#fff",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Grid background */}
      <Box
        sx={{
          position: "fixed",
          inset: 0,
          backgroundImage: `
            radial-gradient(circle at 50% 0%, rgba(139,92,246,0.1), transparent 60%),
            linear-gradient(0deg, rgba(255,255,255,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)
          `,
          backgroundSize: "100% 100%, 40px 40px, 40px 40px",
          opacity: 0.15,
          zIndex: 0,
          pointerEvents: "none",
        }}
      />

      {/* Header */}
      <Box
        sx={{
          position: "relative",
          zIndex: 2,
          px: { xs: 3, lg: 6 },
          py: 4,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Stack direction="row" spacing={2} alignItems="center">
          <Box
            sx={{
              width: 40,
              height: 40,
              borderRadius: 2,
              background:
                "linear-gradient(135deg, #06b6d4, #8b5cf6)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 0 20px rgba(139,92,246,0.3)",
            }}
          >
            <SchoolIcon />
          </Box>
          <Box>
            <Typography fontWeight={800} lineHeight={1}>
              LAIRRY
            </Typography>
            <Typography
              variant="caption"
              sx={{ letterSpacing: 1, color: "grey.400" }}
            >
              INSTITUTE CONSOLE
            </Typography>
          </Box>
        </Stack>

        <Stack direction="row" spacing={1} alignItems="center" sx={{ opacity: 0.7 }}>
          <HelpOutlineIcon fontSize="small" />
          <Typography variant="body2">Need Help?</Typography>
        </Stack>
      </Box>

      {/* Main */}
      <Container
        maxWidth="sm"
        sx={{
          position: "relative",
          zIndex: 2,
          display: "flex",
          alignItems: "center",
          minHeight: "calc(100vh - 160px)",
        }}
      >
        <Box
          sx={{
            width: "100%",
            p: { xs: 4, sm: 5 },
            borderRadius: "24px",
            background: "rgba(26,18,18,0.6)",
            backdropFilter: "blur(14px)",
            border: "1px solid rgba(255,255,255,0.08)",
            boxShadow: "0 20px 60px rgba(0,0,0,0.6)",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Top gradient line */}
          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: 4,
              background:
                "linear-gradient(90deg, #06b6d4, #8b5cf6, #06b6d4)",
            }}
          />

          <Stack spacing={3}>
            {/* Title */}
            <Box textAlign="center">
              <Typography
                sx={{
                  display: "inline-block",
                  fontSize: 10,
                  fontWeight: 700,
                  letterSpacing: 2,
                  px: 2,
                  py: 0.5,
                  borderRadius: 10,
                  mb: 1,
                  color: "#06b6d4",
                  border: "1px solid rgba(255,255,255,0.1)",
                  bgcolor: "rgba(255,255,255,0.05)",
                }}
              >
                SECURE LOGIN
              </Typography>

              <Typography variant="h4" fontWeight={800}>
                Welcome Back
              </Typography>
              <Typography variant="body2" color="grey.400">
                Enter your registered mobile number to access your dashboard.
              </Typography>
            </Box>

            {/* Error Box */}
            <Box
              sx={{
                p: 2,
                borderRadius: 2,
                display: "flex",
                gap: 2,
                bgcolor: "rgba(239,68,68,0.1)",
                border: "1px solid rgba(239,68,68,0.25)",
              }}
            >
              <ErrorOutlineIcon sx={{ color: "#ef4444" }} />
              <Box>
                <Typography fontSize={14} fontWeight={700} color="#ef4444">
                  Authentication Failed
                </Typography>
                <Typography fontSize={12} color="rgba(239,68,68,0.7)">
                  The number you entered does not match our records. Please try
                  again.
                </Typography>
              </Box>
            </Box>

            {/* Input */}
            <Box>
              <Typography
                variant="caption"
                sx={{ letterSpacing: 1, fontWeight: 700, ml: 1 }}
              >
                MOBILE NUMBER
              </Typography>

              <Box sx={{ position: "relative", mt: 1 }}>
                <TextField
                  fullWidth
                  defaultValue="9876543210"
                  placeholder="Enter 10-digit number"
                  InputProps={{
                    startAdornment: (
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          pr: 2,
                        }}
                      >
                        <Typography sx={{ mr: 1, opacity: 0.6 }}>
                          +91
                        </Typography>
                        <Divider orientation="vertical" flexItem />
                      </Box>
                    ),
                    endAdornment: (
                      <WarningAmberRoundedIcon sx={{ color: "#ef4444" }} />
                    ),
                  }}
                  sx={{
                    input: { color: "#fff" },
                    "& .MuiOutlinedInput-root": {
                      borderRadius: 3,
                      bgcolor: "rgba(239,68,68,0.05)",
                    },
                  }}
                />
              </Box>
            </Box>

            {/* Button */}
            <Button
              fullWidth
              size="large"
              endIcon={<ArrowForwardIcon />}
              sx={{
                height: 48,
                fontWeight: 700,
                borderRadius: 3,
                background:
                  "linear-gradient(90deg, #8b5cf6, #06b6d4)",
                boxShadow: "0 0 25px rgba(139,92,246,0.35)",
              }}
            >
              Get OTP
            </Button>

            <Divider sx={{ opacity: 0.2 }}>OR</Divider>

            <Typography variant="caption" align="center" color="grey.400">
              Don&apos;t have an account?{" "}
              <Box
                component="span"
                sx={{ color: "#06b6d4", cursor: "pointer" }}
              >
                Apply for Partnership
              </Box>
            </Typography>
          </Stack>
        </Box>
      </Container>

      {/* Footer badges */}
      <Stack
        direction="row"
        spacing={4}
        justifyContent="center"
        sx={{ opacity: 0.4, pb: 6 }}
      >
        <Stack direction="row" spacing={1} alignItems="center">
          <VerifiedUserIcon fontSize="small" />
          <Typography variant="caption">ISO 27001 CERTIFIED</Typography>
        </Stack>
        <Stack direction="row" spacing={1} alignItems="center">
          <LockIcon fontSize="small" />
          <Typography variant="caption">256-BIT ENCRYPTION</Typography>
        </Stack>
      </Stack>
    </Box>
  );
}
