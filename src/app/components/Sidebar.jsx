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
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';



export default function Sidebar({ open, onToggle }) {
  const theme = useTheme();

  const navItems = [
    { label: "Dashboard", icon: <DashboardOutlined />  , active: false },
    { label: "Exams", icon: <ArticleOutlined />, active: false },
    { label: "students", icon: <GroupsOutlined />, active: false },
    { label: "Finance", icon: <AccountBalanceWalletIcon />, active: false },
    { label: "Onboarding", icon: <AppRegistration />, active: false },
    { label: "Settings", icon: <SettingsOutlined />, active: false }
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
        position: "relative",
        flexShrink: 0,
        
      }}
    >
      {/* TOGGLE */}
      <IconButton
        onClick={onToggle}
        sx={{
          position: "absolute",
          top: 14,
          right: open ? 12 : "50%",
          transform: open ? "none" : "translateX(50%)",
          bgcolor: "rgba(196, 191, 201, 1)",

          //bgcolor:"#101119",
          border: "1px solid rgba(255,255,255,0.08)",
          zIndex: 2
        }}
      >
        {open ? <ChevronLeft /> : <ChevronRight />}
      </IconButton>

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
            >
            <div className="text-white">Console</div>  
            </Typography>
          </Typography>
        )}
      </Stack>

      {/* NAV */}
      <Stack spacing={1} px={open ? 2 : 1}>
        {navItems.map((item) => (
          <Tooltip
            key={item.label}
            title={!open ? item.label : ""}
            placement="right"
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 2,
                px: open ? 2 : 0,
                py: 1.25,
                justifyContent: open ? "flex-start" : "center",
                borderRadius: 2,
                cursor: "pointer",
                color: item.active
                  ? theme.palette.primary.main
                  : "#F8F8F8",
                background: item.active
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
        ))}
      </Stack>

      {/* USER */}
      <Box sx={{ mt: "auto", p: 2 }}>
        <Stack
          direction="row"
          spacing={2}
          alignItems="center"
          justifyContent={open ? "flex-start" : "center"}
        >
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
  );
}
