import { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { useSupabase } from "../../contextProvider/SupabaseProvider";
import { useNavigate } from "react-router-dom";
import { Visibility, VisibilityOff } from "@mui/icons-material";

import LoadingDialog from "../Loading Screen/LoadingDialog";

const RegisterForm = () => {
  const navigate = useNavigate()
  const { signupInstitute } = useSupabase();
  const [form, setForm] = useState({

    email: "",
    temporaryPassword: "",
    newPassword: "",

  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showTemporaryPassword, setShowTemporaryPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  const handleChange = (field) => (e) => {
    const value =
      field === "terms" ? e.target.checked : e.target.value;

    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    setError("");

    const { email, temporaryPassword, newPassword } = form;

    /* ---------------- VALIDATIONS ---------------- */

    if (!email || !temporaryPassword || !newPassword) {
      return setError("All fields are required");
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      return setError("Enter a valid email address");
    }

    if (newPassword.length < 8) {
      return setError("Password must be at least 8 characters");
    }


    /* ---------------- REGISTER ---------------- */

    try {
      setLoading(true);

      await signupInstitute({

        email,
        temp_password: temporaryPassword,
        password: newPassword,
      });
setSnackbar({
    open: true,
    message: "Account created successfully. Please verify your email and login. ✅",
    severity: "success",
  });
      
      navigate("/login")
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
<LoadingDialog open={loading}/>

      {/* Inputs */}

      <Input
        label="Email Address"
        icon="mail"
        placeholder="name@example.com"
        value={form.email}
        onChange={handleChange("email")}
      />
      <TemporaryPasswordInput
        type={showTemporaryPassword ? "text" : "password"}
        label=" Temporary Password"
        icon="lock"
        placeholder="Enter your temporary password"

        value={form.temporaryPassword}
        onChange={handleChange("temporaryPassword")}
        showTemporaryPassword={showTemporaryPassword}
        setShowTemporaryPassword={setShowTemporaryPassword}
      />
      <NewPasswordInput
        label="Set a new Password"
        icon="lock"
        placeholder="Enter a new password"
        type={showNewPassword ? "text" : "password"}
        value={form.newPassword}
        onChange={handleChange("newPassword")}
        showNewPassword={showNewPassword}
        setShowNewPassword={setShowNewPassword}
      />

     
      
      {error && (
        <Typography color="error" fontSize={14} mt={1}>
          {error}
        </Typography>
      )}
      {/* Submit */}
      <Button
        fullWidth
        sx={submitBtn}
        onClick={handleSubmit}
        disabled={loading}
      >
        {loading ? "Please Wait..." : <>Create Account<span className="material-symbols-outlined" style={{ marginLeft: 8 }}>
          arrow_forward
        </span></>}

      </Button>


    </>
  )
}
/* ---------- Reusable UI ---------- */

const Input = ({ label, icon, placeholder, value, onChange, type = "text" }) => (
  <Box mb={2}>
    <Typography fontSize={14} color="#cbd5f5" mb={0.5}>
      {label}
    </Typography>
    <TextField
      fullWidth
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      InputProps={{
        startAdornment: (
          <span className="material-symbols-outlined" style={{ marginRight: 8 }}>
            {icon}
          </span>
        ),
      }}
      sx={inputStyle}
    />
  </Box>
);
const TemporaryPasswordInput = ({ label, icon, placeholder, value, onChange, type = "text", showTemporaryPassword, setShowTemporaryPassword, }) => (
  <Box mb={2}>
    <Typography fontSize={14} color="#cbd5f5" mb={0.5}>
      {label}
    </Typography>
    <TextField
      fullWidth
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      InputProps={{
        startAdornment: (
          <span className="material-symbols-outlined" style={{ marginRight: 8 }}>
            {icon}
          </span>
        ),
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              onClick={() => setShowTemporaryPassword((prev) => !prev)}
              edge="end"
              sx={{ color: "#94a3b8" }}
            >
              {showTemporaryPassword ? <Visibility /> : <VisibilityOff />}
            </IconButton>
          </InputAdornment>
        ),
      }}
      sx={inputStyle}
    />
  </Box>
);
const NewPasswordInput = ({ label, icon, placeholder, value, onChange, type = "text", showNewPassword, setShowNewPassword, }) => (
  <Box mb={2}>
    <Typography fontSize={14} color="#cbd5f5" mb={0.5}>
      {label}
    </Typography>
    <TextField
      fullWidth
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      InputProps={{
        startAdornment: (
          <span className="material-symbols-outlined" style={{ marginRight: 8 }}>
            {icon}
          </span>
        ),
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              onClick={() => setShowNewPassword((prev) => !prev)}
              edge="end"
              sx={{ color: "#94a3b8" }}
            >
              {showNewPassword ? <Visibility /> : <VisibilityOff />}
            </IconButton>
          </InputAdornment>
        ),
      }}
      sx={inputStyle}
    />
  </Box>
);




/* ---------- Styles ---------- */

const inputStyle = {
  "& .MuiOutlinedInput-root": {
    bgcolor: "#1c1d27",
    borderRadius: "0.75rem",
    color: "#fff",
    "& fieldset": { borderColor: "#3b3f54" },
    "&:hover fieldset": { borderColor: "#1337ec" },
    "&.Mui-focused fieldset": { borderColor: "#1337ec" },
  },
};



const submitBtn = {
  mt: 2,
  py: 1.5,
  borderRadius: "0.75rem",
  fontWeight: 700,
  bgcolor: "#1337ec",
  "&:hover": { bgcolor: "#0f2cb8" },
};




export default RegisterForm

