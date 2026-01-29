import React from "react";
import {
  Box,
  Typography,
  Button,
  Stack,
  Chip,
  Divider,
} from "@mui/material";

import SchoolIcon from "@mui/icons-material/School";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import HourglassTopIcon from "@mui/icons-material/HourglassTop";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import LockIcon from "@mui/icons-material/Lock";

export default function SubmissionConfirmation({onnext}) {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        fontFamily: "Inter, sans-serif",
        bgcolor: "#05080f",
        color: "#d1d5db",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background glow blobs */}
      <Glow
        sx={{
          top: "-10%",
          left: "10%",
          width: 500,
          height: 500,
          bgcolor: "rgba(37,99,235,0.12)",
        }}
      />
      <Glow
        sx={{
          bottom: "-10%",
          right: "10%",
          width: 400,
          height: 400,
          bgcolor: "rgba(6,182,212,0.12)",
        }}
      />
      <Glow
        sx={{
          top: "40%",
          right: "30%",
          width: 300,
          height: 300,
          bgcolor: "rgba(168,85,247,0.12)",
        }}
      />

      {/* Header */}
      <Box
        sx={{
          px: 4,
          py: 3,
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          justifyContent: "space-between",
          alignItems: "center",
          gap: 3,
          borderBottom: "1px solid rgba(255,255,255,0.05)",
          backdropFilter: "blur(10px)",
          bgcolor: "rgba(5,8,15,0.5)",
          zIndex: 2,
        }}
      >
        <Stack direction="row" spacing={2} alignItems="center">
          <Box
            sx={{
              width: 36,
              height: 36,
              borderRadius: 2,
              background:
                "linear-gradient(135deg, #06b6d4, #2563eb)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 0 15px rgba(6,182,212,0.3)",
            }}
          >
            <SchoolIcon sx={{ color: "#fff" }} />
          </Box>

          <Box>
            <Typography fontWeight={700} color="#fff">
              LAIRRY
            </Typography>
            <Typography
              fontSize={10}
              letterSpacing={2}
              fontWeight={600}
              color="#22d3ee"
            >
              INSTITUTE CONSOLE
            </Typography>
          </Box>
        </Stack>

        <Stack direction="row" spacing={3} alignItems="center">
          <Box textAlign="right" display={{ xs: "none", md: "block" }}>
            <Stack
              direction="row"
              spacing={1}
              alignItems="center"
              justifyContent="flex-end"
            >
              <Typography
                fontSize={11}
                fontWeight={700}
                color="#22d3ee"
                letterSpacing={1}
              >
                ONBOARDING COMPLETE
              </Typography>
              <Box
                sx={{
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  bgcolor: "#22d3ee",
                  animation: "pulse 1.5s infinite",
                }}
              />
            </Stack>

            <Box
              sx={{
                mt: 1,
                height: 6,
                width: 180,
                bgcolor: "#1f2937",
                borderRadius: 999,
                overflow: "hidden",
                ml: "auto",
              }}
            >
              <Box
                sx={{
                  height: "100%",
                  width: "100%",
                  background:
                    "linear-gradient(90deg, #06b6d4, #2563eb)",
                  boxShadow: "0 0 10px rgba(6,182,212,0.6)",
                }}
              />
            </Box>
          </Box>

          <Chip
            icon={<CheckCircleIcon sx={{ color: "#22d3ee" }} />}
            label="100%"
            sx={{
              bgcolor: "rgba(255,255,255,0.05)",
              color: "#fff",
              border: "1px solid rgba(255,255,255,0.05)",
            }}
          />
        </Stack>
      </Box>

      {/* Main */}
      <Box
        sx={{
          flex: 1,
          minHeight: "calc(100vh - 120px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          px: 3,
          zIndex: 1,
        }}
      >
        <Box
          sx={{
            maxWidth: 520,
            width: "100%",
            p: { xs: 4, md: 5 },
            borderRadius: 3,
            background: "rgba(17,24,39,0.6)",
            backdropFilter: "blur(16px)",
            border: "1px solid rgba(255,255,255,0.08)",
            boxShadow: "0 25px 50px rgba(0,0,0,0.5)",
            textAlign: "center",
            position: "relative",
          }}
        >
          {/* top neon line */}
          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: "25%",
              right: "25%",
              height: 1,
              background:
                "linear-gradient(90deg, transparent, rgba(6,182,212,0.6), transparent)",
            }}
          />

          {/* Icon */}
          <Box
            sx={{
              mx: "auto",
              mb: 4,
              width: 96,
              height: 96,
              borderRadius: "50%",
              background:
                "linear-gradient(to bottom, rgba(6,182,212,0.1), rgba(37,99,235,0.05))",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
            }}
          >
            <Box
              sx={{
                position: "absolute",
                inset: 0,
                borderRadius: "50%",
                border: "1px solid rgba(6,182,212,0.2)",
                animation: "pulse 2s infinite",
              }}
            />
            <VerifiedUserIcon
              sx={{
                fontSize: 48,
                color: "#22d3ee",
                filter:
                  "drop-shadow(0 0 10px rgba(34,211,238,0.6))",
              }}
            />
          </Box>

          <Typography
            variant="h4"
            fontWeight={800}
            color="#fff"
            mb={2}
          >
            Submission Received
          </Typography>

          <Chip
            icon={<CheckCircleIcon sx={{ color: "#4ade80" }} />}
            label="Payment Complete"
            sx={{
              mb: 3,
              bgcolor: "rgba(34,197,94,0.1)",
              color: "#4ade80",
              border: "1px solid rgba(34,197,94,0.25)",
              fontWeight: 700,
              fontSize: 12,
              letterSpacing: 1,
            }}
          />

          <Typography
            fontSize={16}
            color="#9ca3af"
            mb={4}
            lineHeight={1.6}
          >
            Thank you! Your institute details have been securely encrypted and
            submitted for verification.
          </Typography>

          {/* Pending status */}
          <Box
            sx={{
              p: 3,
              mb: 4,
              borderRadius: 2,
              bgcolor: "rgba(245,158,11,0.08)",
              border: "1px solid rgba(245,158,11,0.25)",
            }}
          >
            <HourglassTopIcon
              sx={{ fontSize: 32, color: "#f59e0b", mb: 1 }}
            />
            <Typography
              fontSize={13}
              fontWeight={700}
              letterSpacing={2}
              color="#fbbf24"
            >
              STATUS: PENDING ADMIN APPROVAL
            </Typography>
            <Typography
              fontSize={13}
              color="#d1d5db"
              mt={1}
              maxWidth={360}
              mx="auto"
            >
              Our team is verifying your credentials. You&apos;ll be notified
              when your dashboard is fully active.
            </Typography>
          </Box>

          {/* Actions */}
          <Stack spacing={2}>
            <Button    onClick={onnext}
              fullWidth
              size="large"
              endIcon={<ArrowForwardIcon />}
              sx={{
                py: 1.8,
                fontWeight: 700,
                color: "#fff",
                background:
                  "linear-gradient(90deg, #2563eb, #06b6d4)",
                boxShadow: "0 0 25px rgba(6,182,212,0.4)",
                "&:hover": {
                  background:
                    "linear-gradient(90deg, #3b82f6, #22d3ee)",
                },
              }}
            >
              Go to Dashboard
            </Button>

            <Button
              fullWidth
              sx={{
                py: 1.5,
                color: "#9ca3af",
                "&:hover": {
                  bgcolor: "rgba(255,255,255,0.05)",
                  color: "#fff",
                },
              }}
            >
              View Submitted Details
            </Button>
          </Stack>

          <Divider sx={{ my: 3, borderColor: "rgba(255,255,255,0.08)" }} />

          <Stack
            direction="row"
            spacing={1}
            justifyContent="center"
            alignItems="center"
            fontSize={12}
            color="#6b7280"
          >
            <LockIcon sx={{ fontSize: 14, color: "rgba(34,197,94,0.7)" }} />
            <Typography fontFamily="monospace">
              256-bit SSL Encrypted & Secure Connection
            </Typography>
          </Stack>
        </Box>
      </Box>

      {/* Footer links */}
      <Stack
        direction="row"
        spacing={3}
        justifyContent="center"
        mb={4}
        fontSize={14}
        color="#6b7280"
      >
        <Box sx={{ cursor: "pointer", "&:hover": { color: "#22d3ee" } }}>
          Help Center
        </Box>
        <Box sx={{ width: 4, height: 4, borderRadius: "50%", bgcolor: "#374151", mt: 1 }} />
        <Box sx={{ cursor: "pointer", "&:hover": { color: "#22d3ee" } }}>
          Contact Support
        </Box>
      </Stack>
    </Box>
  );
}

/* Glow helper */
function Glow({ sx }) {
  return (
    <Box
      sx={{
        position: "absolute",
        borderRadius: "50%",
        filter: "blur(120px)",
        pointerEvents: "none",
        ...sx,
      }}
    />
  );
}
