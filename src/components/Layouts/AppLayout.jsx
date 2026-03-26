import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import { useSupabase } from "../../contextProvider/SupabaseProvider";
import Navbar from '../AppBar/Navbar'
import SidebarGlobal from '../AppBar/SidebarGlobal'
import Footer from "../../components/Dashboard Component/Footer";

const AppLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
const [collapseTimer, setCollapseTimer] = useState(null);
  const { user, fetchUserProfile } = useSupabase();
  const [profileImage, setProfileImage] = useState("");

  useEffect(() => {
    const loadProfile = async () => {
      if (!user?.auth_user_id) return;
      try {
        const profile_data = await fetchUserProfile(user.auth_user_id);
        setProfileImage(profile_data.profile_image || "");
      } catch (err) {
        console.error("Failed to fetch profile", err);
      }
    };
    loadProfile();
  }, [user?.auth_user_id]);

  return (
    <Box
  sx={{
    bgcolor: "background.default",
    color: "text.primary",
    minHeight: "100vh",
    transition: "all 0.3s ease",
    overflowX: "hidden",   // ✅ ADD THIS
    width: "100%",         // ✅ ADD THIS
  }}
>

      {/* TOP BAR */}
      <Navbar profileImage={profileImage} setSidebarOpen={setSidebarOpen} />

    
      {/* BODY WRAPPER */}
<Box
  display="flex"
  pt="72px"
  onMouseEnter={() => {
    if (window.innerWidth >= 900) {
      if (collapseTimer) {
        clearTimeout(collapseTimer);
        setCollapseTimer(null);
      }
      setSidebarOpen(true);
    }
  }}
  onMouseLeave={() => {
    if (window.innerWidth >= 900) {
      const timer = setTimeout(() => {
        setSidebarOpen(false);
      }, 250); // 👈 premium delay (adjust 200–350ms if you want)

      setCollapseTimer(timer);
    }
  }}
>
  <SidebarGlobal
    isOpen={sidebarOpen}
    setIsOpen={setSidebarOpen}
  />

  {/* Backdrop for mobile */}
  {sidebarOpen && (
    <Box
      onClick={() => setSidebarOpen(false)}
      sx={{
        display: { xs: "block", md: "none" }, // only mobile
        position: "fixed",
        top: 72,
        left: 0,
        right: 0,
        bottom: 0,
        bgcolor: "rgba(0,0,0,0.4)",
        zIndex: 1100, // lower than sidebar (1200)
      }}
    />
  )}
</Box>


      {/* MAIN CONTENT */}
      <Box
        sx={{
          flex: 1,
          ml: { md: sidebarOpen ? "250px" : "70px" },

          p: { xs: 3, md: 6 },
          transition: "margin-left 0.25s ease",
          bgcolor: "background.default",
        }}
      >
        <Outlet context={{ setProfileImage }}/>
      </Box>

      {/* FOOTER */}
      <Box
        sx={{
          ml: { md: sidebarOpen ? "200px" : "10px" },
          px: { xs: 3, md: 6 },
          pb: 4,
          bgcolor: "background.default",
          borderTop: "1px solid",
          borderColor: "divider",
        }}
      >
        <Footer />
      </Box>
    </Box>
  );
};


export default AppLayout;
