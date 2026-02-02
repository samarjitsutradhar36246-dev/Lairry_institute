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
import { useInstituteSupabase } from "../../supabase/InstituteSupabaseProvider"

const TopBar = () => {
  const navigate=useNavigate();
  const {user} = useInstituteSupabase();
  return (
    <Box
      sx={{
        height: 64,
        px: { xs: 2, md: 8 },
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        backdropFilter: "blur(12px)",
        background:
          "linear-gradient(180deg, rgba(255,255,255,0.04), rgba(255,255,255,0.02))",
        borderBottom: "1px solid rgba(255,255,255,0.08)",
      }}
    >
      
      {/* -------- LEFT: Logo + Company Name -------- */}
      <Stack direction="row" alignItems="center" spacing={1}>
        {/* Optional Logo Image */}
        <Box
          component="img"
          src="/images/logo.png" 
          alt="L.AI.RRY Logo"
          sx={{ width: 36, height: 36, borderRadius: "50%" }}
        />

        {/* Company Name */}
        <Typography
          fontSize={20}
          fontWeight={700}
          color="white"
          letterSpacing={0.3}
        >
          L.AI.RRY
        </Typography>
      </Stack>

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
<IconButton onClick={() => navigate("/institute/institute-profile")}>
  <Avatar
    sx={{
      width: 34,
      height: 34,
      fontSize: 14,
      fontWeight: 600,
      border: "2px solid rgba(139, 92, 246, 0.6)", 
      boxSizing: "border-box",   
    }}
    src={user?.avatar_url}
  />
</IconButton>
      </Stack>
    </Box>
  );
};

export default TopBar;
