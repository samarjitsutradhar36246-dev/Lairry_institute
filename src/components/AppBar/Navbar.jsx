import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  IconButton,
  Avatar,
  Badge
} from "@mui/material";
import { keyframes } from "@mui/system";
import NotificationsDialog from "../../pages/Notification/NotificationsDialog";
import { useNavigate } from "react-router-dom";
import { useAppTheme } from "../../theme/ThemeContext";
import { useSupabase } from "../../contextProvider/SupabaseProvider";

/* ---------------- Animations ---------------- */

const logoFloat = keyframes`
  0% {
    transform: translateY(0px) scale(1);
  }
  50% {
    transform: translateY(-6px) scale(1.05);
  }
  100% {
    transform: translateY(0px) scale(1);
  }
`;

const dropLetter = keyframes`
  0% {
    transform: translateY(-120%);
    opacity: 0;
  }
  20% {
    transform: translateY(0);
    opacity: 1;
  }
  80% {
    transform: translateY(0);
    opacity: 1;
  }
  100% {
    transform: translateY(-120%);
    opacity: 0;
  }
`;

const Navbar = ({ profileImage, setSidebarOpen }) => {
  const navigate = useNavigate();
  const { mode, toggleTheme } = useAppTheme();
  const [open, setOpen] = useState(false);

  const { fetchNotifications } = useSupabase();
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const loadNotifications = async () => {
      const data = await fetchNotifications();
      if (data) setNotifications(data);
    };

    loadNotifications();

    // Listen for updates from dialog
    const handleUpdate = async () => {
      const data = await fetchNotifications();
      if (data) setNotifications(data);
    };

    window.addEventListener("notificationsUpdated", handleUpdate);

    return () =>
      window.removeEventListener("notificationsUpdated", handleUpdate);
  }, []);

  const unreadCount = notifications.filter((n) => !n.is_read).length;

  const letters = [".", "a", "i", ".", "r", "r", "y"];

  return (
    <Box
      component="header"
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        width: "100%",
        overflowX: "hidden",
        height: 72,
        zIndex: 50,
        px: { xs: 2, md: 3 },
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        backdropFilter: "blur(12px)",
        backgroundColor: (theme) =>
          theme.palette.mode === "dark"
            ? "rgba(15,23,42,0.75)"
            : "rgba(255,255,255,0.75)",
        borderBottom: (theme) =>
          `1px solid ${theme.palette.divider}`,
      }}
    >
      {/* Left */}
      <Box display="flex" alignItems="center" gap={2}>
        <Box sx={{ display: { xs: "flex", md: "none" } }}>
          <IconButton
            sx={iconBtn}
            onClick={() => setSidebarOpen(prev => !prev)}
          >
            <span className="material-symbols-outlined">menu</span>
          </IconButton>
        </Box>


        <Box display="flex" alignItems="center" sx={{ ml: { xs: 1, md: 8 } }}>
          <Box sx={logoBox}>
            <Box
              component="img"
              src="/images/logo.svg"
              alt="Logo"
              sx={{
                width: 50,
                height: 40,
                animation: `${logoFloat} 3s ease-in-out infinite`,
                filter: (theme) =>
                  theme.palette.mode === "dark"
                    ? "drop-shadow(0 0 8px rgba(59,130,246,0.4))"
                    : "drop-shadow(0 0 6px rgba(37,99,235,0.25))",
              }}
            />
          </Box>

          {/* Animated Text */}
          <Typography
            fontFamily="Space Grotesk"
            fontWeight={700}
            fontSize={26}
            sx={{ display: "flex", overflow: "hidden" }}
          >
            {letters.map((letter, index) => (
              <Box
                key={index}
                component="span"
                sx={{
                  display: "inline-block",
                  animation: `${dropLetter} 3.5s infinite`,
                  animationDelay: `${index * 0.2}s`,
                  color: (theme) => {
                    if (index === 0) return theme.palette.primary.main;
                    if (index === 1) return theme.palette.primary.main;
                    if (index === 2) return theme.palette.primary.main;
                    if (index === 3) return theme.palette.error.main;
                    if (index === 4) return theme.palette.error.main;
                    if (index === 5) return theme.palette.error.main;
                    if (index === 6) return theme.palette.error.main;
                    return theme.palette.primary.main;
                  },
                }}
              >
                {letter}
              </Box>
            ))}
          </Typography>
        </Box>
      </Box>

      {/* Center */}
      <Box
        sx={{
          display: { xs: "none", md: "flex" },
          alignItems: "center",
          gap: 1,
          fontFamily: "Space Grotesk",
          fontSize: 14,
        }}
      />

      {/* Right */}
      <Box display="flex" alignItems="center" gap={1} sx={{ mr: { md: 10 } }}>
        <IconButton sx={iconBtn} onClick={toggleTheme}>
          <span className="material-symbols-outlined">
            {mode === "dark" ? "light_mode" : "dark_mode"}
          </span>
        </IconButton>

        <IconButton sx={iconBtn} onClick={() => setOpen(true)}>
          <Badge
            badgeContent={unreadCount}
            color="error"
            overlap="circular"
            invisible={unreadCount === 0}
          >
            <span className="material-symbols-outlined">
              notifications
            </span>
          </Badge>
        </IconButton>

        <NotificationsDialog
          open={open}
          onClose={() => setOpen(false)}
        />

        <Box
          display="flex"
          alignItems="center"
          gap={1}
          pl={2}
          sx={{
            borderLeft: (theme) => `1px solid ${theme.palette.divider}`,
          }}
        >
          <Avatar
            className="cursor-pointer"
            src={profileImage}
            sx={{
              width: 36,
              height: 36,
              border: (theme) =>
                `2px solid ${theme.palette.primary.main}`,
            }}
            onClick={() => navigate("/settings")}
          />
        </Box>
      </Box>
    </Box>
  );
};

const iconBtn = {
  color: (theme) => theme.palette.text.secondary,
  "&:hover": {
    bgcolor: (theme) =>
      theme.palette.mode === "dark"
        ? "rgba(255,255,255,0.08)"
        : "rgba(0,0,0,0.05)",
    color: (theme) => theme.palette.primary.main,
  },
};

const logoBox = {
  width: 32,
  height: 32,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: "8px",
};

export default Navbar;
