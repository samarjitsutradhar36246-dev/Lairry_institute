import {
  Box,
  Typography,
  Snackbar,
  Alert
} from "@mui/material";
import { useNavigate,useLocation } from "react-router-dom";
import { useSupabase } from "../../contextProvider/SupabaseProvider"
import { useState } from "react";
import LoadingDialog from '../Loading Screen/LoadingDialog'
const SidebarGlobal = ({ isOpen, setIsOpen }) => {
  const navigate = useNavigate();
  const { logoutUser } = useSupabase();
  const location = useLocation();
const [loading,setLoading]=useState(false)
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "error",
  });

  const handleLogout = async () => {
    try {
      setLoading(true)
      await logoutUser();
      window.location.replace("/login");
    } catch (err) {
      setSnackbar({
        open: true,
        message: err.message || "Failed to sign out",
        severity: "error",
      });
    }finally{
      setLoading(false)
    }
  };

  return (
    <>
    <LoadingDialog open={loading}/>
      <Box
         sx={{
      display: "flex",
      flexDirection: "column",
      position: "fixed",
      top: 72,
      bottom: 0,
      pt: 5,
      bgcolor: "background.paper",
      borderRight: "1px solid",
      borderColor: "divider",
      overflowY: "auto",
      overflowX: "hidden",
      zIndex: 1200,
      transition: "width 0.25s cubic-bezier(0.4, 0, 0.2, 1)",

      width: {
        xs: 250,
        md: isOpen ? 250 : 70,
      },
    maxWidth:"100vw",
      transform: {
        xs: isOpen ? "translateX(0)" : "translateX(-100%)",
        md: "translateX(0)",
      },
      left:0,
    }}

      >
      <SidebarItem active={location.pathname === "/"} icon="dashboard" text="Dashboard" isOpen={isOpen} onClick={() => {navigate("/");  if (window.innerWidth < 900) setIsOpen(false);}} />
      <SidebarItem active={location.pathname === "/institute/exams-overview"} icon="analytics" text="Exams Overview" isOpen={isOpen} onClick={() => {navigate("/institute/exams-overview");  if (window.innerWidth < 900) setIsOpen(false);}} />
      <SidebarItem active={location.pathname === "/institute/exam/subjects-overview"} icon="library_books" text="Subjects Overview" isOpen={isOpen} onClick={() => {navigate("/institute/exam/subjects-overview");  if (window.innerWidth < 900) setIsOpen(false);}} />
      <SidebarItem active={location.pathname === "/institute/exam/subject/testpapers-overview"} icon="description" text="Test Paper Overview" isOpen={isOpen} onClick={() => {navigate("/institute/exam/subject/testpapers-overview");  if (window.innerWidth < 900) setIsOpen(false);}} />
      <SidebarItem active={location.pathname === "/institute/exam/subject/testpaper/questions-overview"} icon="checklist" text="Questions Overview" isOpen={isOpen} onClick={() => {navigate("/institute/exam/subject/testpaper/questions-overview");  if (window.innerWidth < 900) setIsOpen(false);}} />
      <SidebarItem active={location.pathname === "/settings"} icon="settings" text="Accounts & Settings" isOpen={isOpen} onClick={() => {navigate("/settings");  if (window.innerWidth < 900) setIsOpen(false);}} />
      <SidebarItem icon="logout" text="Sign Out" isOpen={isOpen} onClick={handleLogout} />
    </Box>

    <Snackbar
      open={snackbar.open}
      autoHideDuration={4000}
      onClose={() => setSnackbar({ ...snackbar, open: false })}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
    >
      <Alert
        severity={snackbar.severity}
        variant="filled"
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        {snackbar.message}
      </Alert>
    </Snackbar>
    </>
  );
};

const SidebarItem = ({ icon, text, active, onClick, isOpen }) => (
  <Box
    onClick={onClick}
    sx={(theme) => ({
      display: "flex",
      alignItems: "center",
      gap: isOpen ? 1.5 : 0,
      px: 2,
      py: 1.5,
      mx: 1,
      mt: 1,
      borderRadius: theme.shape.borderRadius,
      justifyContent: isOpen ? "flex-start" : "center",
      cursor: "pointer",
      whiteSpace: "nowrap",
      color: active
        ? theme.palette.primary.main
        : theme.palette.text.secondary,
      bgcolor: active
        ? theme.palette.action.selected
        : "transparent",
      "&:hover": {
        bgcolor: theme.palette.action.hover,
        color: theme.palette.text.primary,
      },
      transition: "width 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
    })}
  >
    <span className="material-symbols-outlined">{icon}</span>

    {isOpen && (
      <Typography fontSize={14} fontWeight={500}>
        {text}
      </Typography>
    )}
  </Box>
);

export default SidebarGlobal;