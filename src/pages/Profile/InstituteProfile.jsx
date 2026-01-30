import React, { useState } from "react";
import {
  Box,
  Typography,
  Card,
  Grid,
  Stack,
  Avatar,
  Button,
  CircularProgress,
  Chip,
  Divider,
} from "@mui/material";
import {
  Edit,
  Email,
  Phone,
  LocationOn,
  School,
  Person,
  Badge,
  BusinessCenter,
  Assessment,
  People,
  Settings,
} from "@mui/icons-material";
import { useInstituteSupabase } from "../../supabase/InstituteSupabaseProvider";
import EditInstituteProfileModal from "./EditInstituteProfileModal";

const GlassCard = ({ children, sx, hover = false }) => (
  <Card
    sx={{
      background: "rgba(15,21,32,0.85)",
      backdropFilter: "blur(20px)",
      border: "1px solid rgba(255,255,255,0.1)",
      borderRadius: 4,
      color: "#e5e7eb",
      transition: "all 0.3s ease",
      ...(hover && {
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: "0 20px 40px rgba(0,0,0,0.4)",
          borderColor: "rgba(255,255,255,0.15)",
        },
      }),
      ...sx,
    }}
  >
    {children}
  </Card>
);

const InfoRow = ({ icon: Icon, label, value, iconColor = "#22d3ee" }) => (
  <Stack
    direction="row"
    spacing={2}
    alignItems="center"
    sx={{
      py: 1.5,
      px: 2,
      borderRadius: 2,
      transition: "background 0.2s",
      "&:hover": {
        background: "rgba(255,255,255,0.03)",
      },
    }}
  >
    {Icon && (
      <Box
        sx={{
          width: 40,
          height: 40,
          borderRadius: 2,
          background: `linear-gradient(135deg, ${iconColor}20, ${iconColor}10)`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Icon sx={{ color: iconColor, fontSize: 20 }} />
      </Box>
    )}
    <Box flex={1}>
      {label && (
        <Typography fontSize={11} color="#64748b" fontWeight={500} mb={0.3}>
          {label}
        </Typography>
      )}
      <Typography fontSize={14} color="#e5e7eb" fontWeight={400}>
        {value || "Not provided"}
      </Typography>
    </Box>
  </Stack>
);

export default function InstituteProfile() {
  const { user, loading } = useInstituteSupabase();
  const [open, setOpen] = useState(false);

  const handleSave = (updatedUser) => {
    console.log("Updated Data", updatedUser);
    // TODO: Save to supabase here
  };

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
        <CircularProgress color="primary" size={48} />
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
        <Typography fontSize={16} color="#94a3b8">
          No institute data found.
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background:
          "radial-gradient(circle at 20% 20%, rgba(19,127,236,0.12), transparent 50%), radial-gradient(circle at 80% 80%, rgba(168,85,247,0.12), transparent 50%), #050a10",
        px: { xs: 2, md: 4 },
        py: { xs: 3, md: 5 },
      }}
    >
      <EditInstituteProfileModal
        open={open}
        onClose={() => setOpen(false)}
        user={user}
        onSave={handleSave}
      />

      <Box maxWidth="1400px" mx="auto" display="flex" flexDirection="column" gap={3}>
        {/* ---------------- INSTITUTE HEADER ---------------- */}
        <GlassCard sx={{ p: { xs: 3, md: 5 } }}>
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={3}
            alignItems={{ xs: "center", sm: "flex-start" }}
          >
            <Box
              sx={{
                position: "relative",
                "&::after": {
                  content: '""',
                  position: "absolute",
                  inset: -4,
                  borderRadius: "50%",
                  background:
                    "linear-gradient(135deg, #137fec, #a855f7)",
                  opacity: 0.3,
                  filter: "blur(12px)",
                  zIndex: -1,
                },
              }}
            >
              <Avatar
                sx={{
                  width: 120,
                  height: 120,
                  border: "4px solid rgba(255,255,255,0.1)",
                  boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
                }}
                src={
                  user.avatar_url ||
                  "https://images.unsplash.com/photo-1603415526960-f7e0328ee9b2?auto=format&fit=crop&w=400&q=80"
                }
              />
            </Box>

            <Box flex={1} textAlign={{ xs: "center", sm: "left" }}>
              <Typography
                fontSize={{ xs: 26, md: 32 }}
                fontWeight={700}
                color="white"
                letterSpacing={-0.5}
                mb={1}
              >
                {user.institute_display_name ||
                  user.institute_name ||
                  "Institute Name"}
              </Typography>

              <Stack
                direction="row"
                spacing={2}
                flexWrap="wrap"
                justifyContent={{ xs: "center", sm: "flex-start" }}
                mb={2}
              >
                <Chip
                  label={user.institute_type || "Institute"}
                  size="small"
                  sx={{
                    bgcolor: "rgba(168,85,247,0.15)",
                    color: "#a855f7",
                    border: "1px solid rgba(168,85,247,0.3)",
                    fontWeight: 600,
                    fontSize: 12,
                  }}
                />
                <Chip
                  icon={<LocationOn sx={{ fontSize: 16 }} />}
                  label={`${user.location_city}, ${user.location_state}`}
                  size="small"
                  sx={{
                    bgcolor: "rgba(34,211,238,0.15)",
                    color: "#22d3ee",
                    border: "1px solid rgba(34,211,238,0.3)",
                    fontWeight: 600,
                    fontSize: 12,
                  }}
                />
                {user.account_status && (
                  <Chip
                    label={user.account_status}
                    size="small"
                    sx={{
                      bgcolor: "rgba(34,197,94,0.15)",
                      color: "#22c55e",
                      border: "1px solid rgba(34,197,94,0.3)",
                      fontWeight: 600,
                      fontSize: 12,
                    }}
                  />
                )}
              </Stack>

              <Typography fontSize={14} color="#94a3b8" lineHeight={1.6}>
                {user.institute_display_name || user.institute_name
                  ? `A premier ${user.institute_type || "educational institution"} committed to excellence in education and student development.`
                  : "Committed to excellence in education."}
              </Typography>
            </Box>

            <Button
              variant="contained"
              size="large"
              sx={{
                bgcolor: "#137fec",
                "&:hover": {
                  bgcolor: "#0f6cd4",
                  boxShadow: "0 8px 24px rgba(19,127,236,0.4)",
                },
                color: "white",
                textTransform: "none",
                px: 4,
                py: 1.5,
                borderRadius: 2,
                fontWeight: 600,
                boxShadow: "0 4px 16px rgba(19,127,236,0.3)",
              }}
              startIcon={<Edit />}
              onClick={() => setOpen(true)}
            >
              Edit Profile
            </Button>
          </Stack>
        </GlassCard>
    
            {/* ---------------- ABOUT SECTION ---------------- */}
        <GlassCard sx={{ p: 4 }}>
          <Typography fontSize={20} fontWeight={700} color="white" mb={2}>
            About the Institute
          </Typography>
          <Typography
            color="#94a3b8"
            fontSize={15}
            lineHeight={1.8}
            sx={{
              px: 2,
              py: 2,
              borderRadius: 2,
              background: "rgba(255,255,255,0.02)",
              borderLeft: "3px solid #137fec",
            }}
          >
            {user.institute_display_name || user.institute_name
              ? `${user.institute_display_name || user.institute_name} is a ${user.institute_type || "leading educational"} institution dedicated to providing quality education and fostering academic excellence. Located in ${user.location_city}, ${user.location_state}, we are committed to shaping the future of our students through innovative teaching methodologies and comprehensive educational programs.`
              : "No description available. Please update your institute profile to add more information."}
          </Typography>
        </GlassCard>

      {/* ---------------- CONTACT INFORMATION ---------------- */}
      <GlassCard sx={{ p: 4,  }}>
        <Stack direction="row" spacing={2} mb={3}>
          <Email sx={{ color: "#22d3ee" }} />
          <Typography fontSize={20} fontWeight={700} color="white">
            Contact Information
          </Typography>
        </Stack>

        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <InfoRow icon={Email} label="Institute Email" value={user.institute_email} />
          </Grid>
          <Grid item xs={12} md={4}>
            <InfoRow icon={Email} label="Support Email" value={user.support_email} />
          </Grid>
          <Grid item xs={12} md={4}>
            <InfoRow icon={Phone} label="Primary Phone" value={user.contact_phone} />
          </Grid>
          <Grid item xs={12} md={4}>
            <InfoRow icon={Phone} label="Alternate Phone" value={user.contact_phone_alt} />
          </Grid>
          <Grid item xs={12} md={8}>
            <InfoRow
              icon={LocationOn}
              label="Address"
              value={`${user.location_city}, ${user.location_state}, ${user.location_country} ${user.location_pin}`}
            />
          </Grid>
        </Grid>
      </GlassCard>

      {/* ---------------- INSTITUTE DETAILS ---------------- */}
      <GlassCard sx={{ p: 4, }}>
        <Stack direction="row" spacing={2} mb={3}>
          <School sx={{ color: "#a855f7" }} />
          <Typography fontSize={20} fontWeight={700} color="white">
            Institute Details
          </Typography>
        </Stack>

        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <InfoRow icon={School} label="Institute Name" value={user.institute_name} iconColor="#a855f7" />
          </Grid>
          <Grid item xs={12} md={4}>
            <InfoRow icon={BusinessCenter} label="Institute Type" value={user.institute_type} iconColor="#a855f7" />
          </Grid>
          <Grid item xs={12} md={4}>
            <InfoRow icon={Badge} label="Account Status" value={user.account_status} iconColor="#a855f7" />
          </Grid>
          <Grid item xs={12} md={6}>
            <InfoRow
              icon={LocationOn}
              label="Latitude"
              value={user.latitude}
              iconColor="#a855f7"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <InfoRow
              icon={LocationOn}
              label="Longitude"
              value={user.longitude}
              iconColor="#a855f7"
            />
          </Grid>
        </Grid>
      </GlassCard>

      {/* ---------------- ADMINISTRATOR INFORMATION (UNCHANGED) ---------------- */}
      <GlassCard sx={{ p: 4 }}>
        <Stack direction="row" spacing={2} mb={3}>
          <Person sx={{ color: "#f97316" }} />
          <Typography fontSize={20} fontWeight={700} color="white">
            Administrator Information
          </Typography>
        </Stack>

        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <InfoRow icon={Person} label="Admin Name" value={user.contact_person_name} iconColor="#f97316" />
          </Grid>
          <Grid item xs={12} md={4}>
            <InfoRow icon={Badge} label="Designation" value={user.contact_person_designation} iconColor="#f97316" />
          </Grid>
          <Grid item xs={12} md={4}>
            <InfoRow icon={Phone} label="Contact Number" value={user.contact_phone} iconColor="#f97316" />
          </Grid>
        </Grid>
      </GlassCard>

        {/* ---------------- QUICK ACTIONS ---------------- */}
        <Box>
          <Typography
            fontSize={20}
            fontWeight={700}
            color="white"
            mb={3}
            px={1}
          >
            Quick Actions
          </Typography>
          <Grid container spacing={3}>
            {[
              {
                title: "Manage Exams",
                color: "#22c55e",
                icon: Assessment,
                description: "Create and manage examinations",
              },
              {
                title: "View Reports",
                color: "#f97316",
                icon: Assessment,
                description: "Access analytics and insights",
              },
              {
                title: "Manage Students",
                color: "#a855f7",
                icon: People,
                description: "Student records and enrollment",
              },
              {
                title: "Settings",
                color: "#137fec",
                icon: Settings,
                description: "Configure institute preferences",
              },
            ].map((action, i) => (
              <Grid item xs={12} sm={6} md={3} key={i}>
                <GlassCard
                  hover
                  sx={{
                    p: 3,
                    textAlign: "center",
                    cursor: "pointer",
                    border: `1px solid ${action.color}20`,
                  }}
                >
                  <Box
                    sx={{
                      width: 56,
                      height: 56,
                      borderRadius: 3,
                      background: `linear-gradient(135deg, ${action.color}30, ${action.color}15)`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      margin: "0 auto 16px",
                    }}
                  >
                    <action.icon sx={{ color: action.color, fontSize: 28 }} />
                  </Box>
                  <Typography
                    fontWeight={700}
                    fontSize={16}
                    color={action.color}
                    mb={1}
                  >
                    {action.title}
                  </Typography>
                  <Typography fontSize={12} color="#64748b">
                    {action.description}
                  </Typography>
                </GlassCard>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
    </Box>
  );
}