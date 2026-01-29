import React from "react";
import {
  Box,
  Typography,
  Card,
  Grid,
  Stack,
  Avatar,
  Button,
  CircularProgress,
} from "@mui/material";
import { Edit, Email, Phone, LocationOn, School } from "@mui/icons-material";
import { useInstituteSupabase } from "../supabase/InstituteSupabaseProvider";

/* ---------------- GLASS CARD ---------------- */
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

/* ---------------- INSTITUTE ADMIN PROFILE ---------------- */
export default function InstituteAdminProfile() {
  const { user, loading } = useInstituteSupabase();

  if (loading) {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          background: "#050a10",
        }}
      >
        <CircularProgress color="primary" />
      </Box>
    );
  }

  if (!user) {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          color: "white",
          background: "#050a10",
        }}
      >
        No institute data found.
      </Box>
    );
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background:
          "radial-gradient(circle at top left, rgba(19,127,236,0.15), transparent 40%), radial-gradient(circle at bottom right, rgba(168,85,247,0.15), transparent 40%), #050a10",
        px: { xs: 2, md: 4 },
        py: { xs: 2, md: 4 },
      }}
    >
      <Box maxWidth="1200px" mx="auto" display="flex" flexDirection="column" gap={3}>
        {/* ---------------- HEADER ---------------- */}
        <GlassCard sx={{ p: 4 }}>
          <Stack direction={{ xs: "column", sm: "row" }} spacing={3} alignItems="center">
            <Avatar
              sx={{ width: 96, height: 96 }}
              src={user.avatar_url || "https://images.unsplash.com/photo-1603415526960-f7e0328ee9b2?auto=format&fit=crop&w=400&q=80"}
            />
            <Box flex={1}>
              <Typography fontSize={24} fontWeight={700} color="white">
                {user.contact_person_name || "Admin Name"}
              </Typography>
              <Typography fontSize={14} color="#94a3b8" mt={0.5}>
                {user.contact_person_designation || "Institute Administrator"}
              </Typography>
              <Typography fontSize={12} color="#94a3b8" mt={0.5}>
                {user.institute_display_name || user.institute_name || "Institute Name"}
              </Typography>
            </Box>
            <Button
              variant="contained"
              sx={{
                bgcolor: "#137fec",
                "&:hover": { bgcolor: "#0f6cd4" },
                color: "white",
                textTransform: "none",
              }}
              startIcon={<Edit />}
            >
              Edit Profile
            </Button>
          </Stack>
        </GlassCard>

        {/* ---------------- BASIC INFO ---------------- */}
        <Grid container spacing={3}>
          {/* Contact Info */}
          <Grid item xs={12} md={6}>
            <GlassCard sx={{ p: 3 }}>
              <Typography fontSize={18} fontWeight={700} color="white" mb={2}>
                Contact Information
              </Typography>
              <Stack spacing={2}>
                {user.institute_email && (
                  <Stack direction="row" spacing={2} alignItems="center">
                    <Email sx={{ color: "#22d3ee" }} />
                    <Typography color="#e5e7eb">{user.institute_email}</Typography>
                  </Stack>
                )}
                {user.contact_phone && (
                  <Stack direction="row" spacing={2} alignItems="center">
                    <Phone sx={{ color: "#22d3ee" }} />
                    <Typography color="#e5e7eb">{user.contact_phone}</Typography>
                  </Stack>
                )}
                {user.contact_phone_alt && (
                  <Stack direction="row" spacing={2} alignItems="center">
                    <Phone sx={{ color: "#22d3ee" }} />
                    <Typography color="#e5e7eb">{user.contact_phone_alt}</Typography>
                  </Stack>
                )}
                {user.support_email && (
                  <Stack direction="row" spacing={2} alignItems="center">
                    <Email sx={{ color: "#22d3ee" }} />
                    <Typography color="#e5e7eb">{user.support_email}</Typography>
                  </Stack>
                )}
                {user.location_city && (
                  <Stack direction="row" spacing={2} alignItems="center">
                    <LocationOn sx={{ color: "#22d3ee" }} />
                    <Typography color="#e5e7eb">
                      {user.location_city}, {user.location_state}, {user.location_country} {user.location_pin}
                    </Typography>
                  </Stack>
                )}
              </Stack>
            </GlassCard>
          </Grid>

          {/* Institute Details */}
          <Grid item xs={12} md={6}>
            <GlassCard sx={{ p: 3 }}>
              <Typography fontSize={18} fontWeight={700} color="white" mb={2}>
                Institute Details
              </Typography>
              <Stack spacing={2}>
                {user.institute_name && (
                  <Stack direction="row" spacing={2} alignItems="center">
                    <School sx={{ color: "#a855f7" }} />
                    <Typography color="#e5e7eb">{user.institute_name}</Typography>
                  </Stack>
                )}
                {user.institute_type && (
                  <Stack direction="row" spacing={2} alignItems="center">
                    <Typography color="#94a3b8">Type:</Typography>
                    <Typography color="#e5e7eb">{user.institute_type}</Typography>
                  </Stack>
                )}
                {user.account_status && (
                  <Stack direction="row" spacing={2} alignItems="center">
                    <Typography color="#94a3b8">Status:</Typography>
                    <Typography color="#e5e7eb">{user.account_status}</Typography>
                  </Stack>
                )}
                {user.latitude && user.longitude && (
                  <Stack direction="row" spacing={2} alignItems="center">
                    <Typography color="#94a3b8">Coordinates:</Typography>
                    <Typography color="#e5e7eb">
                      {user.latitude}, {user.longitude}
                    </Typography>
                  </Stack>
                )}
              </Stack>
            </GlassCard>
          </Grid>
        </Grid>

        {/* ---------------- ABOUT / BIO ---------------- */}
        <GlassCard sx={{ p: 3 }}>
          <Typography fontSize={18} fontWeight={700} color="white" mb={2}>
            About
          </Typography>
          <Typography color="#94a3b8" fontSize={14}>
            {user.contact_person_name
              ? `${user.contact_person_name} serves as the ${user.contact_person_designation || "Administrator"} at ${user.institute_display_name || user.institute_name}.`
              : "No bio available."}
          </Typography>
        </GlassCard>

        {/* ---------------- QUICK ACTIONS ---------------- */}
        <Grid container spacing={3}>
          {[
            { title: "Manage Exams", color: "#22c55e" },
            { title: "View Reports", color: "#f97316" },
            { title: "Manage Students", color: "#a855f7" },
            { title: "Settings", color: "#137fec" },
          ].map((action, i) => (
            <Grid item xs={12} sm={6} md={3} key={i}>
              <GlassCard
                sx={{
                  p: 3,
                  textAlign: "center",
                  cursor: "pointer",
                  transition: "all 0.2s",
                  "&:hover": { borderColor: `${action.color}50` },
                }}
              >
                <Typography fontWeight={700} fontSize={14} color={action.color}>
                  {action.title}
                </Typography>
              </GlassCard>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
}
