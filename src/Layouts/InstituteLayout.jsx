import * as React from "react";
import { Box } from "@mui/material";
import Sidebar from "../pages/dashboard/Sidebar";
import TopBar from "../pages/dashboard/TopBar"; 
import { Outlet } from "react-router-dom";

export default function InstituteLayout() {
  const [sidebarOpen, setSidebarOpen] = React.useState(false);

  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
        minHeight: "100vh",
        backgroundColor: "#050a10",
      }}
    >
      {/* Sidebar fixed */}
      {/* <Sidebar open={sidebarOpen} onToggle={() => setSidebarOpen((prev) => !prev)} />  */}

      {/* Main content */}
      <Box
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          height: "100vh", // keep viewport height
          overflow: "hidden", // prevent outer scroll
        }}
      >
        {/* TopBar fixed at top */}
        <Box sx={{ flexShrink: 0 }}>
          <TopBar />
        </Box>

        {/* Scrollable page content BELOW TopBar */}
        <Box
          sx={{
            flexGrow: 1,
            overflowY: "auto", // scroll only page content
            px: 2,
            py: 2,
            boxSizing: "border-box",
          }}
        >
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
}
