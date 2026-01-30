import {
  Box,
  Stack,
  Typography,
  IconButton,
  InputBase,
  Avatar,
  Badge,
} from "@mui/material";
import {
  Search,
  NotificationsNone,
  LightModeOutlined,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const TopBar = () => {
  const navigate=useNavigate();
  return (
    <Box
      sx={{
        height: 64,
        px: { xs: 2, md: 4 },
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        backdropFilter: "blur(12px)",
        background:
          "linear-gradient(180deg, rgba(255,255,255,0.04), rgba(255,255,255,0.02))",
        borderBottom: "1px solid rgba(255,255,255,0.08)",
      }}
    >
      {/* -------- LEFT: Title -------- */}
      <Typography
        fontSize={20}
        fontWeight={700}
        color="white"
        letterSpacing={0.3}
      >
    
      </Typography>

      {/* -------- RIGHT: Actions -------- */}
      <Stack direction="row" spacing={1.5} alignItems="center">
        {/* Search */}
        <Box
          sx={{
            display: { xs: "none", md: "flex" },
            alignItems: "center",
            px: 1.5,
            py: 0.5,
            borderRadius: 2,
            backgroundColor: "rgba(255,255,255,0.06)",
            border: "1px solid rgba(255,255,255,0.08)",
            width: 220,
          }}
        >
          <Search sx={{ fontSize: 18, color: "#94a3b8" }} />
          <InputBase
            placeholder="Search…"
            sx={{
              ml: 1,
              fontSize: 14,
              color: "white",
              width: "100%",
            }}
          />
        </Box>

        {/* Theme Icon (optional) */}
        <IconButton
          sx={{
            color: "#94a3b8",
            bgcolor: "rgba(255,255,255,0.05)",
          }}
        >
          <LightModeOutlined fontSize="small" />
        </IconButton>

        {/* Notifications */}
        <IconButton
          sx={{
            color: "#94a3b8",
            bgcolor: "rgba(255,255,255,0.05)",
          }}
        >
          <Badge variant="dot" color="primary">
            <NotificationsNone fontSize="small" />
          </Badge>
        </IconButton>

        {/* Profile */}
        <IconButton onClick={()=>navigate("/institute/institute-profile")}>
        <Avatar
        
          sx={{
            width: 34,
            height: 34,
            bgcolor: "#137fec",
            fontSize: 14,
            fontWeight: 600,
            
          }}
          
        >
          A
        </Avatar>
        </IconButton>
      </Stack>
    </Box>
  );
};

export default TopBar;
