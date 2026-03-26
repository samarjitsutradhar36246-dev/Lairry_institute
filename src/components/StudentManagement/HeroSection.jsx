import React from "react";
import { Box, Typography, Avatar } from "@mui/material";
import { useTheme } from "@mui/material/styles";

const HeroSection = ({ studentData }) => {
  const theme = useTheme();

  const student = studentData?.[0];

  return (
    <Box
      sx={{
        position: "relative",
        overflow: "hidden",
        borderRadius: 4,
        p: { xs: 4, md: 6 },
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        gap: 6,
        alignItems: "center",
        backgroundColor: "background.paper",
        border: (theme) => `1px solid ${theme.palette.divider}`,
        boxShadow:
          theme.palette.mode === "dark"
            ? "0 10px 40px rgba(0,0,0,0.4)"
            : "0 10px 40px rgba(0,0,0,0.06)",
      }}
    >
      {/* Gradient Glow */}
      <Box
        sx={{
          position: "absolute",
          top: -80,
          right: -80,
          width: 300,
          height: 300,
          background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
          opacity: 0.15,
          filter: "blur(120px)",
        }}
      />

      {/* Avatar */}
      <Box sx={{ position: "relative" }}>
        <Avatar
          src={student?.profile_image}
          alt="Student"
          sx={{
            width: { xs: 100, md: 120 },
            height: { xs: 100, md: 120 },
            border: `4px solid ${theme.palette.background.paper}`,
            background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
          }}
        />
        <Box
          sx={{
            position: "absolute",
            bottom: 5,
            right: 5,
            width: 18,
            height: 18,
            borderRadius: "50%",
            backgroundColor: theme.palette.success.main,
            border: `3px solid ${theme.palette.background.paper}`,
          }}
        />
      </Box>

      {/* Name + Info */}
      <Box sx={{ flex: 1, textAlign: { xs: "center", md: "left" } }}>
        <Typography
          variant="caption"
          sx={{
            textTransform: "uppercase",
            letterSpacing: 2,
            fontWeight: 600,
            color: "primary.main",
          }}
        >
          Student Profile
        </Typography>

        <Typography
          variant="h3"
          sx={{
            fontWeight: 800,
            mt: 1,
            color: "text.primary",
          }}
        >
          {student?.full_name}
        </Typography>

        <Typography
          variant="body2"
          sx={{
            mt: 1,
            color: "text.secondary",
          }}
        >
          ID: STU-{student?.id}
        </Typography>
      </Box>
    </Box>
  );
};

export default HeroSection;
