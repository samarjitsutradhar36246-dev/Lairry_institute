import React from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Stack,
  Avatar,
  Divider,
  IconButton,
  Button,
} from "@mui/material";
import {
  Edit,
  Email,
  Phone,
  LocationOn,
  School,
} from "@mui/icons-material";

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
              src="https://images.unsplash.com/photo-1603415526960-f7e0328ee9b2?auto=format&fit=crop&w=400&q=80"
            />
            <Box flex={1}>
              <Typography fontSize={24} fontWeight={700} color="white">
                Dr. Ananya Sharma
              </Typography>
              <Typography fontSize={14} color="#94a3b8" mt={0.5}>
                Institute Administrator
              </Typography>
              <Typography fontSize={12} color="#94a3b8" mt={0.5}>
                IIT Delhi
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
          <Grid item xs={12} md={6}>
            <GlassCard sx={{ p: 3 }}>
              <Typography fontSize={18} fontWeight={700} color="white" mb={2}>
                Contact Information
              </Typography>
              <Stack spacing={2}>
                <Stack direction="row" spacing={2} alignItems="center">
                  <Email sx={{ color: "#22d3ee" }} />
                  <Typography color="#e5e7eb">ananya.sharma@iitd.ac.in</Typography>
                </Stack>
                <Stack direction="row" spacing={2} alignItems="center">
                  <Phone sx={{ color: "#22d3ee" }} />
                  <Typography color="#e5e7eb">+91 9876543210</Typography>
                </Stack>
                <Stack direction="row" spacing={2} alignItems="center">
                  <LocationOn sx={{ color: "#22d3ee" }} />
                  <Typography color="#e5e7eb">Hauz Khas, Delhi, India</Typography>
                </Stack>
              </Stack>
            </GlassCard>
          </Grid>

          <Grid item xs={12} md={6}>
            <GlassCard sx={{ p: 3 }}>
              <Typography fontSize={18} fontWeight={700} color="white" mb={2}>
                Institute Details
              </Typography>
              <Stack spacing={2}>
                <Stack direction="row" spacing={2} alignItems="center">
                  <School sx={{ color: "#a855f7" }} />
                  <Typography color="#e5e7eb">IIT Delhi</Typography>
                </Stack>
                <Stack direction="row" spacing={2} alignItems="center">
                  <Typography color="#94a3b8">Established:</Typography>
                  <Typography color="#e5e7eb">1961</Typography>
                </Stack>
                <Stack direction="row" spacing={2} alignItems="center">
                  <Typography color="#94a3b8">Students:</Typography>
                  <Typography color="#e5e7eb">11,500+</Typography>
                </Stack>
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
            Dr. Ananya Sharma has been serving as the Institute Administrator at IIT Delhi
            for 5 years. She oversees all academic and administrative operations,
            ensures the institute’s policies are implemented efficiently, and manages
            collaborations with research and educational partners globally.
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
