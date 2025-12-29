import * as React from "react";
import { Box } from "@mui/material";
import DashBoard2 from "../app/components/dashboard/DashBoard2";
import Sidebar from "../app/components/Sidebar";


export default function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = React.useState(true);

  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "100vh",
        width: "100%",
        backgroundColor: "#050a10",
        overflow: "hidden"
      }}
    >
      {/* SIDEBAR */}
      <Sidebar
        open={sidebarOpen}
        onToggle={() => setSidebarOpen((prev) => !prev)}
      />

      {/* MAIN CONTENT */}
      <Box
        sx={{
          flexGrow: 1,
          minWidth: 0,
          overflow: "auto",
          transition: "all .25s ease"
        }}
      >
        <DashBoard2 />
      </Box>
    </Box>
  );
}



