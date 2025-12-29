import * as React from "react";
import Sidebar from "../Sidebar";

import {
  ThemeProvider,
  createTheme,
  CssBaseline,
  AppBar,
  Toolbar,
  Box,
  Typography,
  IconButton,
  Avatar,
  TextField,
  Grid,
  Card,
  CardContent,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Stack,
  Divider,
} from "@mui/material";


import SearchIcon from "@mui/icons-material/Search";
import NotificationsIcon from "@mui/icons-material/Notifications";
import SettingsIcon from "@mui/icons-material/Settings";
import GroupIcon from "@mui/icons-material/Group";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import FavoriteIcon from "@mui/icons-material/Favorite";
import WarningIcon from "@mui/icons-material/Warning";
import MoreVertIcon from "@mui/icons-material/MoreVert";

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: { main: "#7f13ec" },
    background: {
      default: "#141118",
      paper: "#1e1926",
    },
    text: {
      primary: "#ffffff",
      secondary: "#ab9db9",
    },
  },
  typography: {
    fontFamily: "Space Grotesk, Noto Sans, sans-serif",
  },
});

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = React.useState(true);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      {/* FULL PAGE BACKGROUND */}
      <Box sx={{ minHeight: "100vh", bgcolor: "background.default" }}>
        {/* DASHBOARD SHELL */}
        <Box
          sx={{
            display: "flex",
            maxWidth: 1440,
            mx: "auto",
            minHeight: "100vh",
            borderLeft: "1px solid rgba(255,255,255,0.06)",
            borderRight: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          {/* hhhhhhhhhh */}
          {/* SIDEBAR */}
          {/* <Sidebar open={sidebarOpen} /> */}

          <Sidebar
            open={sidebarOpen}
            onToggle={() => setSidebarOpen((prev) => !prev)}
          />


          {/* MAIN CONTENT */}
          <Box sx={{ flexGrow: 1 }}>
            {/* TOP NAV */}
            <AppBar
              position="sticky"
              sx={{
                background: "rgba(30,25,38,0.75)",
                backdropFilter: "blur(12px)",
                borderBottom: "1px solid #302839",
              }}
            >
              <Toolbar sx={{ justifyContent: "space-between" }}>
                <Stack direction="row" spacing={2} alignItems="center">
                  <IconButton
                    onClick={() => setSidebarOpen((p) => !p)}
                    sx={{ color: "#ab9db9" }}
                  >
                   
                  </IconButton>

                  <Typography variant="h6" fontWeight={800}>
                    LAIRRY <span style={{ color: "#7f13ec" }}>Control</span>
                  </Typography>

                  <TextField
                    size="small"
                    placeholder="Search commands..."
                    InputProps={{
                      startAdornment: (
                        <SearchIcon sx={{ mr: 1, color: "#ab9db9" }} />
                      ),
                    }}
                    sx={{ bgcolor: "#30283980", borderRadius: 1, width: 260 }}
                  />
                </Stack>

                <Stack direction="row" spacing={1} alignItems="center">
                  <IconButton>
                    <NotificationsIcon sx={{ color: "#ab9db9" }} />
                  </IconButton>
                  <IconButton>
                    <SettingsIcon sx={{ color: "#ab9db9" }} />
                  </IconButton>
                  <Avatar src="https://i.pravatar.cc/100?img=12" />
                </Stack>
              </Toolbar>
            </AppBar>

            {/* UPDATE BAR */}
            <Box sx={{ bgcolor: "#7f13ec22", py: 1, textAlign: "center" }}>
              <Typography fontSize={13} color="#7f13ec">
                System Update: Version 2.4.1 Live – Performance improvements applied.
              </Typography>
            </Box>

            {/* CONTENT */}
            <Box sx={{ p: 4 }}>
              {/* HERO */}
              <Card sx={{ p: 4, mb: 4, border: "1px solid #302839" }}>
                <Chip label="System Online" color="success" size="small" />
                <Typography variant="h3" fontWeight={800} mt={2}>
                  Welcome back, Admin
                </Typography>
              </Card>

              {/* KPI */}
              <Grid container spacing={2} mb={4}>
                <KPI title="Total Students" value="1,240" icon={<GroupIcon />} />
                <KPI title="AI Models Active" value="8" icon={<SmartToyIcon />} />
                <KPI title="System Health" value="99.9%" icon={<FavoriteIcon />} />
                <KPI title="Alerts" value="2" icon={<WarningIcon />} />
              </Grid>

              {/* TABLE */}
              <TableContainer component={Paper} sx={{ border: "1px solid #302839" }}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Exam</TableCell>
                      <TableCell>Date</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell align="right">Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <ExamRow name="Mid-Term Physics" date="Oct 24" status="Live" />
                    <ExamRow name="AI Coding Test" date="Oct 25" status="Scheduled" />
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

function KPI({ title, value, icon }) {
  return (
    <Grid item xs={12} sm={6} md={3}>
      <Card sx={{ border: "1px solid #302839" }}>
        <CardContent>
          <Stack direction="row" justifyContent="space-between">
            <Typography fontSize={13} color="#ab9db9">
              {title}
            </Typography>
            {icon}
          </Stack>
          <Typography variant="h5" fontWeight={800}>
            {value}
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  );
}

function ExamRow({ name, date, status }) {
  return (
    <TableRow hover>
      <TableCell>{name}</TableCell>
      <TableCell>{date}</TableCell>
      <TableCell>
        <Chip label={status} size="small" />
      </TableCell>
      <TableCell align="right">
        <IconButton>
          <MoreVertIcon />
        </IconButton>
      </TableCell>
    </TableRow>
  );
}
