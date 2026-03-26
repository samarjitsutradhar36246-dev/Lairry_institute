import { useEffect, useState } from "react";
import { Box, Button, TextField, Typography,Snackbar,Alert } from "@mui/material";
import { supabase } from "../../services/supabaseClient";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [ready, setReady] = useState(false);
const [snackbar, setSnackbar] = useState({
  open: false,
  message: "",
  severity: "success", // "success" | "error"
});
  // ✅ Wait for Supabase to hydrate recovery session
  useEffect(() => {
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession();

      if (!data.session) {
        setSnackbar({
    open: true,
    message: "Invalid or expired reset link ❌",
    severity: "error",
  });
       
        window.location.replace("/login");
        return;
      }

      setReady(true);
    };

    checkSession();
  }, []);

  const handleReset = async () => {
    if (password.length < 8) {
      setSnackbar({
    open: true,
    message: "Password must be at least 8 characters ❌",
    severity: "error",
  });
      
      return;
    }

    setLoading(true);

    const { err } = await supabase.auth.updateUser({ password });

    if (err) {
      setLoading(false);
      setSnackbar({
    open: true,
    message: err.message || "Failed to update user ❌",
    severity: "error",
  });
     
      return;
    }

    // ✅ REQUIRED: logout after reset
    await supabase.auth.signOut();
    setSnackbar({
    open: true,
    message: "Password updated successfully. Please log in again. ✅",
    severity: "success",
  });
    
    window.location.replace("/login");
  };

  if (!ready) {
    return (
      <Box sx={{ minHeight: "100vh", display: "grid", placeItems: "center" }}>
        <Typography>Preparing password reset…</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ minHeight: "100vh", display: "grid", placeItems: "center" }}>
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
      <Box sx={{ width: 360 }}>
        <Typography variant="h5" mb={2}>
          Reset Password
        </Typography>

        <TextField
          fullWidth
          type="password"
          label="New Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Button
          fullWidth
          sx={{ mt: 2 }}
          onClick={handleReset}
          disabled={loading}
        >
          {loading ? "Updating..." : "Update Password"}
        </Button>
      </Box>
    </Box>
  );
};

export default ResetPassword;
