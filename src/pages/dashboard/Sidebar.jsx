import * as React from "react";
import {
  Box,
  Typography,
  Stack,
  Avatar,
  IconButton,
  Tooltip,
  useTheme
} from "@mui/material";
import {
  ChevronLeft,
  ChevronRight,
  DashboardOutlined,
  ArticleOutlined,
  GroupsOutlined,
  AppRegistration,
  SettingsOutlined
} from "@mui/icons-material";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import { useNavigate, useLocation } from "react-router-dom";

export default function Sidebar({ open, onToggle }) {
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { label: "Dashboard", icon: <DashboardOutlined />, path: "/institute" },
    { label: "Exams", icon: <ArticleOutlined />, path: "/institute/exams" },
    { label: "Students", icon: <GroupsOutlined />, path: "/institute/students" },
    { label: "Finance", icon: <AccountBalanceWalletIcon />, path: "/institute/sales" },
    { label: "Onboarding", icon: <AppRegistration />, path: "/onboarding/institute-details" },
    { label: "Settings", icon: <SettingsOutlined />, path: "/institute/settings" }
  ];

  return (
    <Box
      sx={{
        width: open ? 260 : 84,
        transition: "width .25s ease",
        background: "rgba(15,17,26,0.9)",
        backdropFilter: "blur(12px)",
        borderRight: "1px solid #1F2937",
        display: { xs: "none", lg: "flex" },
        flexDirection: "column",
        height: "100vh",
        flexShrink: 0
      }}
    >
      {/* LOGO */}
      <Stack
        direction="row"
        alignItems="center"
        spacing={2}
        sx={{ px: 3, py: 3 }}
        justifyContent={open ? "flex-start" : "center"}
      >
        <Box
          sx={{
            width: 36,
            height: 36,
            borderRadius: 2,
            background: "linear-gradient(135deg,#8B5CF6,#6D28D9)",
            color: "white",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          ◈
        </Box>

        {open && (
          <Typography fontWeight={700}>
            LAIRRY
            <Typography
              component="span"
              fontSize={11}
              color="#F8F8F8"
              ml={1}
              display="block"
            >
              Console
            </Typography>
          </Typography>
        )}
      </Stack>

      {/* NAV */}
      <Stack spacing={1} px={open ? 2 : 1}>
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;

          return (
            <Tooltip
              key={item.label}
              title={!open ? item.label : ""}
              placement="right"
            >
              <Box
                onClick={() => navigate(item.path)}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                  px: open ? 2 : 0,
                  py: 1.25,
                  justifyContent: open ? "flex-start" : "center",
                  borderRadius: 2,
                  cursor: "pointer",
                  color: isActive
                    ? theme.palette.primary.main
                    : "#F8F8F8",
                  background: isActive
                    ? "rgba(139,92,246,0.15)"
                    : "transparent",
                  "&:hover": {
                    background: "rgba(255,255,255,0.06)",
                    color: "#fff"
                  }
                }}
              >
                {item.icon}
                {open && (
                  <Typography fontSize={14}>{item.label}</Typography>
                )}
              </Box>
            </Tooltip>
          );
        })}
      </Stack>

      {/* BOTTOM SECTION */}
      <Box sx={{ mt: "auto", p: 2 }}>
        {/* TOGGLE BUTTON */}
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: open ? "flex-start" : "center",
            px: open ? 2 : 0,
            mb: 2
          }}
        >
          <IconButton
            onClick={onToggle}
            sx={{
              bgcolor: "rgba(196, 191, 201, 1)",
              border: "1px solid rgba(255,255,255,0.08)",
              transition: "transform .2s ease",
"&:hover": {
  background: "rgba(196, 191, 201, 1)",
  transform: "rotate(180deg)"
}
              
            }}
          >
            {open ? <ChevronLeft /> : <ChevronRight />}
          </IconButton>
        </Box>

        {/* USER */}
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: open ? "flex-start" : "center",
            px: open ? 2 : 0
          }}
        >
          <Stack direction="row" spacing={2} alignItems="center">
            <Avatar src="https://i.pravatar.cc/100?img=12" />
            {open && (
              <Box>
                <Typography fontSize={14}>Dr. A. Sharma</Typography>
                <Typography fontSize={12} color="#F8F8F8">
                  Admin
                </Typography>
              </Box>
            )}
          </Stack>
        </Box>
      </Box>
    </Box>
  );
}
