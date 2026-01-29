import React from "react";
import {
  Box,
  Typography,
  Container,
  Button,
  TextField,
  Avatar,
  LinearProgress,
  Divider,
  Stack,
} from "@mui/material";
import PsychologyIcon from "@mui/icons-material/Psychology";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import SchoolIcon from "@mui/icons-material/School";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import MapIcon from "@mui/icons-material/Map";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";

export default function InstituteDetails1() {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        fontFamily: "Inter, sans-serif",
        color: "#fff",
        backgroundColor: "#0B0D14",
        backgroundImage: `
          radial-gradient(at 0% 0%, rgba(37,71,244,0.15), transparent 50%),
          radial-gradient(at 100% 0%, rgba(0,240,255,0.08), transparent 50%),
          radial-gradient(at 100% 100%, rgba(37,71,244,0.1), transparent 50%)
        `,
      }}
    >
      {/* Header */}
      <Box
        sx={{
          position: "sticky",
          top: 0,
          zIndex: 50,
          backdropFilter: "blur(12px)",
          background: "rgba(22,25,34,0.7)",
          borderBottom: "1px solid #282b39",
        }}
      >
        <Container maxWidth="xl">
          <Box
            sx={{
              height: 64,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Stack direction="row" spacing={2} alignItems="center">
              <Box
                sx={{
                  width: 32,
                  height: 32,
                  borderRadius: 2,
                  background:
                    "linear-gradient(135deg, #2547f4, #7c3aed)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 0 15px rgba(37,71,244,0.5)",
                }}
              >
                <PsychologyIcon fontSize="small" />
              </Box>
              <Typography fontWeight={800}>
                LAIRRY{" "}
                <Typography
                  component="span"
                  fontSize={14}
                  color="grey.400"
                  fontWeight={500}
                >
                  | Institute Console
                </Typography>
              </Typography>
            </Stack>

            <Stack direction="row" spacing={3} alignItems="center">
              <Button
                startIcon={<HelpOutlineIcon />}
                sx={{
                  color: "grey.400",
                  textTransform: "none",
                  display: { xs: "none", md: "flex" },
                }}
              >
                Help & Support
              </Button>

              <Stack direction="row" spacing={2} alignItems="center">
                <Box textAlign="right" display={{ xs: "none", sm: "block" }}>
                  <Typography fontSize={14} fontWeight={600}>
                    Admin User
                  </Typography>
                  <Typography fontSize={12} color="grey.400">
                    Manage Account
                  </Typography>
                </Box>
                <Box position="relative">
                  <Avatar
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCouzOz3syC4KlaLUVEO9xevJ_VRQ5WFkzujdPWPTiyhqopM7XozIi7vOx6BwUNzFzR6QELXltGc8KUVAGLmADK75dn2vKOyv_B7N_xXXpLwJgEylMivgCfJy70qTqQW88zd_laM45Eo-5sRJCxJ8Eu0Lhy4wEhDuO9lHyRlfkKuDeg6UM1aKtPY9qF36PSgUSPvxXv3as4CUM7XJFWvEdPFaJu5qJIndeuDnyL7tzuZr6Vk8pw4UfpOia96tDeUOtaJaOASM7usRE5"
                    sx={{
                      width: 40,
                      height: 40,
                      border: "2px solid transparent",
                      "&:hover": {
                        borderColor: "#2547f4",
                      },
                    }}
                  />
                  <Box
                    sx={{
                      position: "absolute",
                      bottom: 2,
                      right: 2,
                      width: 10,
                      height: 10,
                      bgcolor: "#22c55e",
                      borderRadius: "50%",
                      border: "2px solid #161922",
                    }}
                  />
                </Box>
              </Stack>
            </Stack>
          </Box>
        </Container>
      </Box>

      {/* Main */}
      <Container maxWidth="md" sx={{ py: 8 }}>
        <Stack spacing={6}>
          {/* Heading */}
          <Box textAlign="center">
            <Typography variant="h3" fontWeight={900}>
              Welcome to LAIRRY.
            </Typography>
            <Typography color="grey.400" fontSize={18}>
              Let&apos;s set up your institute details to get started.
            </Typography>
          </Box>

          {/* Progress */}
          <Box>
            <Stack direction="row" justifyContent="space-between">
              <Typography
                color="#2547f4"
                fontWeight={700}
                fontSize={13}
              >
                STEP 1: INSTITUTE DETAILS
              </Typography>
              <Typography fontSize={13} color="grey.500">
                25% Complete
              </Typography>
            </Stack>

            <LinearProgress
              variant="determinate"
              value={25}
              sx={{
                mt: 1,
                height: 8,
                borderRadius: 5,
                bgcolor: "#1f2333",
                "& .MuiLinearProgress-bar": {
                  borderRadius: 5,
                  background:
                    "linear-gradient(90deg, #2547f4, #00f0ff)",
                  boxShadow: "0 0 10px rgba(37,71,244,0.6)",
                },
              }}
            />

            <Stack
              direction="row"
              justifyContent="space-between"
              mt={1}
              fontSize={12}
              color="grey.600"
            >
              <span style={{ color: "#fff" }}>1. Details</span>
              <span>2. Batches</span>
              <span>3. Admin</span>
              <span>4. Review</span>
            </Stack>
          </Box>

          {/* Card */}
          <Box
            sx={{
              p: { xs: 4, md: 6 },
              borderRadius: 3,
              background: "rgba(22,25,34,0.7)",
              backdropFilter: "blur(12px)",
              border: "1px solid rgba(255,255,255,0.08)",
              boxShadow: "0 8px 32px rgba(0,0,0,0.36)",
              position: "relative",
            }}
          >
            {/* Logo upload */}
            <Stack spacing={3}>
              <Typography fontWeight={600} color="grey.300">
                Institute Logo
              </Typography>

              <Stack direction={{ xs: "column", sm: "row" }} spacing={3}>
                <Box
                  sx={{
                    width: 96,
                    height: 96,
                    borderRadius: 3,
                    border: "1px dashed #475569",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    bgcolor: "#1c202d",
                    cursor: "pointer",
                    "&:hover": {
                      borderColor: "#2547f4",
                      bgcolor: "rgba(37,71,244,0.05)",
                    },
                  }}
                >
                  <AddPhotoAlternateIcon
                    sx={{ fontSize: 36, color: "#64748b" }}
                  />
                </Box>

                <Stack spacing={1}>
                  <Button
                    variant="outlined"
                    sx={{
                      borderColor: "#334155",
                      color: "#fff",
                      textTransform: "none",
                    }}
                  >
                    Upload Image
                  </Button>
                  <Typography fontSize={12} color="grey.500">
                    Must be at least 200×200px (PNG or JPG)
                  </Typography>
                  <Typography fontSize={12} color="grey.400">
                    This logo will appear on student reports and exam headers.
                  </Typography>
                </Stack>
              </Stack>

              <Divider />

              {/* Inputs */}
              <Stack spacing={3}>
                <InputField
                  label="Institute Name"
                  placeholder="e.g. Apex Academy of Science"
                  icon={<SchoolIcon />}
                  badge
                />
                <Stack direction={{ xs: "column", md: "row" }} spacing={3}>
                  <InputField
                    label="City"
                    placeholder="Enter city"
                    icon={<LocationCityIcon />}
                  />
                  <InputField
                    label="District"
                    placeholder="Enter district"
                    icon={<MapIcon />}
                  />
                </Stack>
              </Stack>

              {/* Actions */}
              <Stack
                direction={{ xs: "column-reverse", sm: "row" }}
                justifyContent="space-between"
                spacing={2}
                pt={3}
              >
                <Button sx={{ color: "grey.400" }}>
                  Save as Draft
                </Button>

                <Button
                  endIcon={<ArrowForwardIcon />}
                  sx={{
                    px: 4,
                    py: 1.5,
                    fontWeight: 700,
                    bgcolor: "#2547f4",
                    boxShadow:
                      "0 0 20px rgba(37,71,244,0.4)",
                    "&:hover": {
                      bgcolor: "#1e40af",
                    },
                  }}
                >
                  Continue to Batches
                </Button>
              </Stack>
            </Stack>
          </Box>

          {/* Footer help */}
          <Typography
            textAlign="center"
            fontSize={14}
            color="grey.500"
          >
            Need help with registration?{" "}
            <Box
              component="span"
              sx={{
                color: "#2547f4",
                textDecoration: "underline",
                cursor: "pointer",
              }}
            >
              Contact Support
            </Box>
          </Typography>
        </Stack>
      </Container>
    </Box>
  );
}

/* Reusable input */
function InputField({ label, placeholder, icon, badge }) {
  return (
    <Box>
      <Typography fontSize={14} fontWeight={500} color="grey.300">
        {label} <span style={{ color: "#f87171" }}>*</span>
      </Typography>

      <Box sx={{ position: "relative", mt: 1 }}>
        <TextField
          fullWidth
          placeholder={placeholder}
          InputProps={{
            startAdornment: (
              <Box sx={{ mr: 1, color: "#64748b" }}>{icon}</Box>
            ),
          }}
          sx={{
            "& .MuiOutlinedInput-root": {
              bgcolor: "#1c202d",
              borderRadius: 2,
              color: "#fff",
            },
          }}
        />

        {badge && (
          <Box
            sx={{
              position: "absolute",
              right: 12,
              top: "50%",
              transform: "translateY(-50%)",
              display: { xs: "none", sm: "flex" },
              alignItems: "center",
              gap: 0.5,
              px: 1,
              py: 0.5,
              borderRadius: 1,
              bgcolor: "rgba(37,71,244,0.1)",
              border: "1px solid rgba(37,71,244,0.2)",
              fontSize: 10,
              fontWeight: 700,
              color: "#2547f4",
            }}
          >
            <AutoAwesomeIcon sx={{ fontSize: 12 }} />
            AI Assist
          </Box>
        )}
      </Box>
    </Box>
  );
}
