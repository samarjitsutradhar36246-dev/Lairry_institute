import * as React from "react";

import {
  Box,
  Typography,
  Card,
  Avatar,
  TextField,
  Button,
  Chip,
  Switch,
  Divider,
  Stack,
} from "@mui/material";
import { styled } from "@mui/material/styles";

// Icons
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import ShieldIcon from "@mui/icons-material/Shield";
import VisibilityIcon from "@mui/icons-material/Visibility";
import SaveIcon from "@mui/icons-material/Save";
import DevicesIcon from "@mui/icons-material/Devices";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { useNavigate } from "react-router-dom";
import { useInstituteSupabase } from "../../supabase/InstituteSupabaseProvider";


/* ------------------------------------------------------------------ */
/* Fonts (load once globally in your app root ideally) */
/*
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link
  href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&display=swap"
  rel="stylesheet"
/>
*/
/* ------------------------------------------------------------------ */

const GlassCard = styled(Card)(() => ({
  background:
    "linear-gradient(180deg, rgba(40,40,60,0.45), rgba(20,20,30,0.35))",
  backdropFilter: "blur(14px)",
  border: "1px solid rgba(255,255,255,0.08)",
  borderRadius: 16,
  boxShadow: "0 10px 40px rgba(0,0,0,0.35)",
}));

const GlassInput = styled(TextField)(() => ({
  "& .MuiOutlinedInput-root": {
    background: "rgba(20,17,24,0.65)",
    borderRadius: 12,
    color: "#fff",
    "& fieldset": {
      borderColor: "rgba(255,255,255,0.12)",
    },
    "&:hover fieldset": {
      borderColor: "rgba(255,255,255,0.25)",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#7b25f4",
      boxShadow: "0 0 0 2px rgba(123,37,244,0.25)",
    },
  },
  "& input": {
    color: "#fff",
    fontSize: 14,
  },
  "& label": {
    color: "#a89cba",
  },
}));

/* ------------------------------------------------------------------ */
/* MAIN COMPONENT */
/* ------------------------------------------------------------------ */

export default function SettingsSecurity() {
  const { logoutUser } = useInstituteSupabase();
    const navigate = useNavigate();


const handleLogout = async () => {
  try {
    await logoutUser();
    navigate("/institutes-login");
  } catch (err) {
    console.error("Logout failed", err);
  }
};
  return (
    <Box
      sx={{
        minHeight: "100vh",
        fontFamily: "'Space Grotesk', sans-serif",
        background:
          "linear-gradient(135deg, #0a0a16 0%, #111029 100%)",
        color: "#fff",
        px: { xs: 2, md: 2 },
        py: { xs: 4, md: 2 },
      }}
    >
      {/* PREVIEW WRAPPER */}
      <Box sx={{ maxWidth: 1200, mx: "auto" }}>
        {/* Header */}
        <Stack
          direction={{ xs: "column", md: "row" }}
          justifyContent="space-between"
          alignItems={{ xs: "flex-start", md: "flex-end" }}
          spacing={3}
          mb={5}
        >
          <Box>
            <Typography variant="h4" fontWeight={700} mb={1}>
              Settings & Security
            </Typography>
            <Typography sx={{ color: "#a89cba", maxWidth: 520 }}>
              Manage your institute profile, banking details, and security
              preferences.
            </Typography>
          </Box>

          <GlassCard sx={{ px: 2.5, py: 1.2 }}>
            <Stack direction="row" spacing={1.5} alignItems="center">
              <Box
                sx={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  bgcolor: "#22c55e",
                  boxShadow: "0 0 8px rgba(34,197,94,0.6)",
                }}
              />
              <Typography
                variant="caption"
                sx={{ color: "#a89cba", fontFamily: "monospace" }}
              >
                Last login: Today, 10:42 AM from 192.168.1.42
              </Typography>
            </Stack>
          </GlassCard>
        </Stack>

        {/* GRID */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", lg: "5fr 7fr" },
            gap: 4,
          }}
        >
          {/* LEFT COLUMN */}
          <Stack spacing={4}>
            {/* Institute Profile */}
            <GlassCard sx={{ p: 3, position: "relative" }}>
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                mb={3}
              >
                <Stack direction="row" spacing={1} alignItems="center">
                  <Typography fontWeight={700}>
                    Institute Profile
                  </Typography>
                  <LockOutlinedIcon sx={{ fontSize: 16, color: "#a89cba" }} />
                </Stack>
                <Chip
                  icon={<CheckCircleIcon />}
                  label="Verified"
                  sx={{
                    bgcolor: "rgba(34,197,94,0.1)",
                    border: "1px solid rgba(34,197,94,0.25)",
                    color: "#22c55e",
                    fontWeight: 700,
                    textTransform: "uppercase",
                  }}
                />
              </Stack>

              <Stack direction="row" spacing={3} mb={3}>
                <Avatar
                  variant="rounded"
                  sx={{
                    width: 80,
                    height: 80,
                    borderRadius: 3,
                    border: "2px solid rgba(255,255,255,0.1)",
                    backgroundImage:
                      'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCaDSs1yEXG-oml3ZL0AE1K-mUqwf9bZy4FAB1vrEymrY1qV02H8gxZdh00SJK8eZLO8ufZCkWiuKy8BTP85gUtSEiCgTAp2qa6F-wsHirnQF8fikJlzOzeyo8i9-_wge6N9BOjdgQUykRjCev43Qb5MfJoJyhp-bGMsET7LARr6c4hvMuQbQbsP9DJrBZ9b-u2aZTLXJu17ZTgioeRNK7k_RgeyKKSe7Akhqjt3Aib4C0XNyW_73C8QXUmhCTfz1zNIlGBMyvA_t4g")',
                    backgroundSize: "cover",
                  }}
                />
                <Box>
                  <Typography variant="h6" fontWeight={700}>
                    Apex Academy
                  </Typography>
                  <Typography variant="body2" sx={{ color: "#a89cba" }}>
                    Institute ID:{" "}
                    <Box component="span" sx={{ color: "#fff", fontFamily: "monospace" }}>
                      LRY-8821
                    </Box>
                  </Typography>
                </Box>
              </Stack>

              <Typography
                variant="caption"
                sx={{ color: "#a89cba", textTransform: "uppercase" }}
              >
                Registered Address
              </Typography>
              <Box
                sx={{
                  mt: 1,
                  p: 2,
                  borderRadius: 2,
                  bgcolor: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.06)",
                }}
              >
                <Typography variant="body2">
                  Block 42, Knowledge Park III,
                  <br />
                  Greater Noida, UP, 201306, India
                </Typography>
              </Box>

              <Stack
                direction="row"
                spacing={1}
                alignItems="center"
                mt={2}
                sx={{
                  bgcolor: "rgba(59,130,246,0.1)",
                  border: "1px solid rgba(59,130,246,0.2)",
                  borderRadius: 2,
                  p: 1.5,
                }}
              >
                <InfoOutlinedIcon sx={{ color: "#60a5fa" }} />
                <Typography variant="caption" sx={{ color: "#a89cba" }}>
                  Profile details are locked. Contact Super Admin for changes.
                </Typography>
              </Stack>
            </GlassCard>

            {/* Notification Preferences */}
            <GlassCard sx={{ p: 3 }}>
              <Stack direction="row" spacing={1.5} mb={3}>
                <NotificationsActiveIcon sx={{ color: "#7b25f4" }} />
                <Typography fontWeight={700} >
                  Notification Preferences
                </Typography>
              </Stack>

              {[
                [
                  "Exam Completion Alerts",
                  "Get notified when a batch finishes an exam",
                  true,
                ],
                [
                  "System Updates",
                  "Platform maintenance and feature news",
                  true,
                ],
                [
                  "Billing & Invoices",
                  "Receive monthly invoices via email",
                  false,
                ],
              ].map(([title, desc, checked]) => (
                <Stack
                  key={title}
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                  mb={2}
                >
                  <Box>
                    <Typography fontSize={14} fontWeight={500}>
                      {title}
                    </Typography>
                    <Typography fontSize={12} sx={{ color: "#a89cba" }}>
                      {desc}
                    </Typography>
                  </Box>
                  <Switch defaultChecked={checked} />
                </Stack>
              ))}
            </GlassCard>
          </Stack>

          {/* RIGHT COLUMN */}
          <Stack spacing={4}>
            {/* Bank Details */}
            <GlassCard sx={{ p: { xs: 3, md: 4 } }}>
              <Stack
                direction={{ xs: "column", md: "row" }}
                justifyContent="space-between"
                alignItems={{ xs: "flex-start", md: "center" }}
                mb={3}
                spacing={2}
              >
                <Stack direction="row" spacing={1.5}>
                  <AccountBalanceIcon sx={{ color: "#7b25f4" }} />
                  <Typography fontWeight={700}>Bank Details</Typography>
                </Stack>
                <Chip
                  icon={<ShieldIcon />}
                  label="PII Protected • 256-bit Encryption"
                  sx={{
                    bgcolor: "rgba(168,85,247,0.1)",
                    border: "1px solid rgba(168,85,247,0.25)",
                    color: "#d8b4fe",
                    fontSize: 10,
                    fontWeight: 700,
                    textTransform: "uppercase",
                  }}
                />
              </Stack>

              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
                  gap: 3,
                }}
              >
                <Box sx={{ gridColumn: "1 / -1" }}>
                  <GlassInput
                    fullWidth
                    label="Account Holder Name"
                    defaultValue="Apex Educational Trust"
                  />
                </Box>

                <Box sx={{ gridColumn: "1 / -1", position: "relative" }}>
                  <GlassInput
                    fullWidth
                    type="password"
                    label="Account Number"
                    defaultValue="987654321098"
                    InputProps={{
                      endAdornment: <VisibilityIcon sx={{ color: "#a89cba" }} />,
                    }}
                  />
                </Box>

                <GlassInput
                  label="IFSC / Routing Code"
                  defaultValue="HDFC0001234"
                />
                <GlassInput label="Bank Name" defaultValue="HDFC Bank" />

                <Box sx={{ gridColumn: "1 / -1", textAlign: "right", mt: 2 }}>
                  <Button
                    startIcon={<SaveIcon />}
                    sx={{
                      px: 4,
                      py: 1.5,
                      fontWeight: 700,
                      borderRadius: 3,
                      bgcolor: "#7b25f4",
                      "&:hover": { bgcolor: "#5e1dbd" },
                      boxShadow: "0 0 30px rgba(123,37,244,0.45)",
                    }}
                  >
                    Save Changes
                  </Button>
                </Box>
              </Box>
            </GlassCard>

            {/* Session Management */}
            <GlassCard
              sx={{
                p: 3,
                borderLeft: "4px solid rgba(239,68,68,0.6)",
              }}
            >
              <Stack direction="row" spacing={1.5} mb={2}>
                <DevicesIcon sx={{ color: "#f87171" }} />
                <Typography fontWeight={700} sx={{color:"white"}}>Session Management</Typography>
              </Stack>

              <Typography
                variant="body2"
                sx={{ color: "#a89cba", mb: 3, maxWidth: 520 }}
              >
                Manage active sessions. If you notice any suspicious activity,
                sign out of all other devices immediately.
              </Typography>

              <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                <Button
                  fullWidth
                  variant="outlined"
                  sx={{
                    borderColor: "rgba(255,255,255,0.2)",
                    color: "#fff",
                    py: 1.4,
                    borderRadius: 3,
                  }}
                >
                  Sign out of all devices
                </Button>
                <Button
                onClick={handleLogout}
                  fullWidth
                  startIcon={<PowerSettingsNewIcon />}
                  sx={{
                    py: 1.4,
                    borderRadius: 3,
                    bgcolor: "rgba(239,68,68,0.15)",
                    border: "1px solid rgba(239,68,68,0.35)",
                    color: "#f87171",
                    "&:hover": {
                      bgcolor: "rgba(239,68,68,0.25)",
                    },
                  }}
                >
                  Log Out Current Session
                </Button>
              </Stack>
            </GlassCard>
          </Stack>
        </Box>

        {/* Footer */}
        <Box sx={{ textAlign: "center", mt: 6 }}>
          <Typography variant="caption" sx={{ color: "#a89cba", opacity: 0.6 }}>
            © 2024 LAIRRY Exam Platform. All rights reserved • Privacy Policy •
            Terms of Service
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
