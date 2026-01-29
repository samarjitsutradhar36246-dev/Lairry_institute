import React from "react";
import {
  Box,
  Typography,
  Container,
  Button,
  TextField,
  Stack,
  Divider,
} from "@mui/material";

import SchoolIcon from "@mui/icons-material/School";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import PersonIcon from "@mui/icons-material/Person";
import SmartphoneIcon from "@mui/icons-material/Smartphone";
import MailIcon from "@mui/icons-material/Mail";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import LockIcon from "@mui/icons-material/Lock";

export default function OwnerDetails2() {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        color: "#fff",
        fontFamily: `"Space Grotesk", sans-serif`,
        background:
          "radial-gradient(circle at 50% 0%, #1a1f3c 0%, #050b2b 60%, #000 100%)",
        position: "relative",
        overflowX: "hidden",
      }}
    >
      {/* GRID OVERLAY */}
      <Box
        sx={{
          position: "fixed",
          inset: 0,
          opacity: 0.03,
          pointerEvents: "none",
          backgroundImage:
            "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
          backgroundSize: "40px 40px",
          zIndex: 0,
        }}
      />

      {/* HEADER */}
      <Box
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          backdropFilter: "blur(12px)",
          background: "rgba(5,11,43,0.8)",
          borderBottom: "1px solid rgba(255,255,255,0.05)",
          px: { xs: 3, md: 6, lg: 14 },
          py: 2,
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
              borderRadius: 1,
              bgcolor: "rgba(13,51,242,0.2)",
              border: "1px solid rgba(13,51,242,0.3)",
              boxShadow: "0 0 15px rgba(13,51,242,0.3)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <SchoolIcon sx={{ color: "#3d5cff" }} />
          </Box>
          <Typography fontWeight={700}>
            LAIRRY{" "}
            <Typography
              component="span"
              fontSize={12}
              fontWeight={400}
              color="white"
              sx={{ opacity: 0.5, ml: 0.5, letterSpacing: 1 }}
            >
              CONSOLE
            </Typography>
          </Typography>
        </Stack>

        <Button
          startIcon={<HelpOutlineIcon />}
          sx={{
            bgcolor: "rgba(255,255,255,0.05)",
            border: "1px solid rgba(255,255,255,0.05)",
            color: "white",
            textTransform: "none",
            "&:hover": {
              bgcolor: "rgba(255,255,255,0.1)",
            },
          }}
        >
          Need Help?
        </Button>
      </Box>

      {/* MAIN */}
      <Container
        maxWidth="md"
        sx={{
          pt: 16,
          pb: 10,
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* BACKGROUND GLOWS */}
        <Box
          sx={{
            position: "absolute",
            top: "25%",
            left: -120,
            width: 380,
            height: 380,
            bgcolor: "rgba(13,51,242,0.1)",
            filter: "blur(100px)",
            borderRadius: "50%",
            zIndex: 0,
          }}
        />
        <Box
          sx={{
            position: "absolute",
            bottom: -100,
            right: -140,
            width: 500,
            height: 500,
            bgcolor: "rgba(188,19,254,0.05)",
            filter: "blur(120px)",
            borderRadius: "50%",
            zIndex: 0,
          }}
        />

        <Stack spacing={6}>
          {/* PROGRESS */}
          <Box>
            <Stack
              direction="row"
              justifyContent="space-between"
              fontSize={14}
              sx={{ opacity: 0.7 }}
            >
              <span>Step 2 of 4</span>
              <span style={{ color: "#fff" }}>Owner Details</span>
            </Stack>

            <Box
              sx={{
                mt: 1.5,
                height: 6,
                bgcolor: "rgba(255,255,255,0.08)",
                borderRadius: 999,
                position: "relative",
                overflow: "hidden",
              }}
            >
              <Box
                sx={{
                  height: "100%",
                  width: "50%",
                  bgcolor: "#0d33f2",
                  boxShadow: "0 0 10px rgba(13,51,242,0.8)",
                  borderRadius: 999,
                }}
              />
              <Box
                sx={{
                  position: "absolute",
                  left: "50%",
                  top: 0,
                  bottom: 0,
                  width: 16,
                  bgcolor: "rgba(255,255,255,0.5)",
                  filter: "blur(2px)",
                  ml: -1,
                }}
              />
            </Box>

            <Stack
              direction="row"
              justifyContent="space-between"
              mt={2}
              fontSize={12}
              sx={{ opacity: 0.4, display: { xs: "none", sm: "flex" } }}
            >
              <Stack direction="row" spacing={1} color="#0d33f2">
                <CheckCircleIcon fontSize="small" />
                <span>Institute Info</span>
              </Stack>
              <Stack direction="row" spacing={1} color="white">
                <Box
                  sx={{
                    width: 8,
                    height: 8,
                    bgcolor: "#0d33f2",
                    borderRadius: "50%",
                    animation: "pulse 1.5s infinite",
                  }}
                />
                <span>Owner Details</span>
              </Stack>
              <span>Batches</span>
              <span>Review</span>
            </Stack>
          </Box>

          {/* CARD */}
          <Box
            sx={{
              p: { xs: 4, md: 6 },
              borderRadius: 3,
              background: "rgba(17,18,24,0.6)",
              backdropFilter: "blur(12px)",
              border: "1px solid rgba(255,255,255,0.08)",
              boxShadow: "0 20px 60px rgba(0,0,0,0.6)",
              position: "relative",
            }}
          >
            <Box
              sx={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: 1,
                background:
                  "linear-gradient(90deg, transparent, rgba(13,51,242,0.5), transparent)",
              }}
            />

            <Stack spacing={5}>
              {/* HEADING */}
              <Box>
                <Typography variant="h4" fontWeight={700}>
                  Who is managing this institute?
                </Typography>
                <Typography
                  sx={{
                    mt: 1,
                    color: "white",
                    opacity: 0.5,
                    fontFamily: `"Noto Sans", sans-serif`,
                  }}
                >
                  Please provide the details of the primary account holder. This
                  will be the main contact for administrative purposes.
                </Typography>
              </Box>

              {/* FORM */}
              <Stack spacing={4}>
                <Input
                  label="Full Name"
                  placeholder="e.g. Rahul Verma"
                  icon={<PersonIcon />}
                />

                {/* MOBILE */}
                <Box>
                  <Typography fontSize={14} sx={{ opacity: 0.7, ml: 1 }}>
                    Mobile Number
                  </Typography>
                  <Stack direction="row" mt={1}>
                    <Box
                      sx={{
                        px: 2,
                        display: "flex",
                        alignItems: "center",
                        bgcolor: "#0a0c14",
                        border: "1px solid rgba(255,255,255,0.1)",
                        borderRight: "none",
                        borderRadius: "12px 0 0 12px",
                        color: "white",
                        opacity: 0.6,
                        minWidth: 70,
                      }}
                    >
                      +91
                    </Box>
                    <TextField
                      fullWidth
                      placeholder="98765 43210"
                      InputProps={{
                        endAdornment: <SmartphoneIcon sx={{ opacity: 0.4 }} />,
                      }}
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          bgcolor: "#0a0c14",
                          borderRadius: "0 12px 12px 0",
                          color: "#fff",
                        },
                      }}
                    />
                  </Stack>
                  <Stack
                    direction="row"
                    spacing={1}
                    mt={1}
                    fontSize={12}
                    sx={{ opacity: 0.4 }}
                  >
                    <LockIcon fontSize="inherit" />
                    <span>We will send an OTP for verification later.</span>
                  </Stack>
                </Box>

                <Input
                  label="Email Address (Optional)"
                  placeholder="rahul.verma@institute.com"
                  icon={<MailIcon />}
                />
              </Stack>

              {/* ACTIONS */}
              <Divider />

              <Stack
                direction={{ xs: "column-reverse", sm: "row" }}
                justifyContent="space-between"
                spacing={2}
              >
                <Button
                  startIcon={<ArrowBackIcon />}
                  sx={{
                    border: "1px solid rgba(255,255,255,0.1)",
                    color: "white",
                    opacity: 0.7,
                    "&:hover": { opacity: 1 },
                  }}
                >
                  Back
                </Button>

                <Button
                  endIcon={<ArrowForwardIcon />}
                  sx={{
                    px: 4,
                    py: 1.5,
                    bgcolor: "#0d33f2",
                    fontWeight: 700,
                    boxShadow: "0 0 20px rgba(13,51,242,0.5)",
                    "&:hover": {
                      bgcolor: "#3d5cff",
                    },
                  }}
                >
                  Continue
                </Button>
              </Stack>
            </Stack>
          </Box>

          {/* FOOTER */}
          <Typography
            textAlign="center"
            fontSize={13}
            sx={{ opacity: 0.3, fontFamily: `"Noto Sans", sans-serif` }}
          >
            By clicking "Continue", you agree to our{" "}
            <span style={{ textDecoration: "underline" }}>
              Terms of Service
            </span>{" "}
            and{" "}
            <span style={{ textDecoration: "underline" }}>
              Privacy Policy
            </span>
            .
          </Typography>
        </Stack>
      </Container>
    </Box>
  );
}

/* REUSABLE INPUT */
function Input({ label, placeholder, icon }) {
  return (
    <Box>
      <Typography fontSize={14} sx={{ opacity: 0.7, ml: 1 }}>
        {label}
      </Typography>
      <TextField
        fullWidth
        placeholder={placeholder}
        InputProps={{
          startAdornment: <Box sx={{ mr: 1, opacity: 0.4 }}>{icon}</Box>,
        }}
        sx={{
          mt: 1,
          "& .MuiOutlinedInput-root": {
            bgcolor: "#0a0c14",
            borderRadius: 3,
            color: "#fff",
          },
        }}
      />
    </Box>
  );
}
