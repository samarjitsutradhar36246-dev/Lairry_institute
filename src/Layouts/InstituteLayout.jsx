import * as React from "react";
import { Box } from "@mui/material";
import Sidebar from "../pages/dashboard/Sidebar";
import TopBar from "../pages/dashboard/TopBar"; 
import { Outlet } from "react-router-dom";

export default function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = React.useState(false);

  return (
    <Box sx={{ display: "flex", width: "100%", minHeight: "100vh", backgroundColor: "#050a10" }}>
      {/* Sidebar fixed */}
      <Sidebar open={sidebarOpen} onToggle={() => setSidebarOpen((prev) => !prev)} />

      {/* Main content */}
      <Box
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          height: "100vh", // ensure it fills viewport height
          overflow: "hidden", // prevent entire page scrolling
        }}
      >
        {/* TopBar fixed at top */}
        <Box sx={{ flexShrink: 0 }}>
          <TopBar />
        </Box>

        {/* Scrollable page content */}
        <Box
          sx={{
            flexGrow: 1,
            overflowY: "auto", // only page content scrolls
            p: 2,
          }}
        >
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
}
