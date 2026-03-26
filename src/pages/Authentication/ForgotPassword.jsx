import { useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useSupabase } from "../../contextProvider/SupabaseProvider";

const ForgotPassword = () => {
  const { resetPassword } = useSupabase();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSendLink = async () => {
    if (!email) {
      setMessage("Please enter your email");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      await resetPassword(email);
      setMessage("Password reset link sent to your email");
    } catch (err) {
      setMessage(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ minHeight: "100vh", display: "grid", placeItems: "center" }}>
      <Box sx={{ width: 360 }}>
        <Typography variant="h5" mb={2}>
          Forgot Password
        </Typography>

        <TextField
          fullWidth
          label="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        {message && (
          <Typography mt={2} color="info.main">
            {message}
          </Typography>
        )}

        <Button
          fullWidth
          sx={{ mt: 2 }}
          onClick={handleSendLink}
          disabled={loading}
        >
          {loading ? "Sending..." : "Send Reset Link"}
        </Button>
      </Box>
    </Box>
  );
};

export default ForgotPassword;
