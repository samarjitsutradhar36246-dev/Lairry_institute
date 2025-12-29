import React from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  MenuItem,
  Switch,
} from "@mui/material";

import LockIcon from "@mui/icons-material/Lock";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import PasswordIcon from "@mui/icons-material/Password";

export default function BankPayoutinfo4() {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        fontFamily: "Inter, sans-serif",
        color: "#fff",
        background:
          "linear-gradient(135deg, #050505 0%, #0a1020 50%, #05080f 100%)",
        position: "relative",
        overflowX: "hidden",
      }}
    >
      {/* Glow */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: 600,
          background:
            "radial-gradient(circle at 50% -20%, rgba(13,89,242,0.15), transparent 70%)",
          pointerEvents: "none",
        }}
      />

      {/* HEADER */}
      <Box
        sx={{
          position: "sticky",
          top: 0,
          zIndex: 30,
          px: { xs: 3, md: 6 },
          py: { xs: 2, md: 3 },
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          backdropFilter: "blur(12px)",
          bgcolor: "rgba(11,13,20,0.5)",
          borderBottom: "1px solid rgba(255,255,255,0.08)",
        }}
      >
        <Box display="flex" gap={2} alignItems="center">
          <Box
            sx={{
              width: { xs: 32, md: 40 },
              height: { xs: 32, md: 40 },
              borderRadius: "50%",
              backgroundImage:
                'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDhFy05v-_J1-dBqdcRL32NDrRgsbUfG8pla8Q-EjlGBAWG_tJNcC6EVCE0gMqE1WBSzh_OPNs3nhutN-9hxn9c0zVHvU0LWbOx4Mlw28kiHzAzJGx_Nz78OtkdKti92RU8EdyBDlF1tfslVV2OPF7iJ6ihb1hX3nkqEx-vylgfo_G6OwOpvz228XIoBmejzZp6HF0TLzbAaTNaRfIx9uOD2sC5Jl24lbZB9QieiyCkXmRkqcQT18dsllWr9uKQIdmwIdW6wONEivyk")',
              backgroundSize: "cover",
              backgroundPosition: "center",
              boxShadow: "0 0 20px rgba(13,89,242,0.2)",
            }}
          />
          <Box>
            <Typography fontWeight={700}>LAIRRY</Typography>
            <Typography
              fontSize={10}
              letterSpacing={1}
              color="#9ca6ba"
              display={{ xs: "none", md: "block" }}
            >
              INSTITUTE CONSOLE
            </Typography>
          </Box>
        </Box>

        <Box
          sx={{
            display: "flex",
            gap: 2,
            px: 2,
            py: 1,
            borderRadius: 2,
            border: "1px solid rgba(255,255,255,0.08)",
            bgcolor: "rgba(255,255,255,0.05)",
          }}
        >
          <Box
            sx={{
              width: 32,
              height: 32,
              borderRadius: "50%",
              backgroundImage:
                'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCY47LJIZdk0Pr-IgbOkMb2-QRatNRDkVRJxzmm8YIrknyWUMRfCPgZFhKfOgOWq1vSHn0YjE2vHD2aIE9u9-Asarnqutqo2VHNVK2BBHrcOGreQZEMNNspkrmR0CyQ33tjWd4pHEiopBCjAASnjv1zCgIM5fxoO0OuYdxSGrOfmQ_5S6FEGiK0m2RvbyhZLi_1R4VVGz8qVa5M9yu20OTPtDGEy9eMY5_z1enPenwgg0Pj1DBQwynikTLuTp_hrj1C5Twq94pbg_1p")',
              backgroundSize: "cover",
            }}
          />
          <Box display={{ xs: "none", sm: "block" }}>
            <Typography fontSize={14}>Dr. A. Sharma</Typography>
            <Typography fontSize={12} color="#9ca6ba">
              Admin
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* MAIN */}
      <Box
        sx={{
          px: { xs: 3, md: 6, lg: 10 },
          py: { xs: 4, md: 8 },
          maxWidth: 900,
          mx: "auto",
        }}
      >
        {/* Progress */}
        <Box mb={4}>
          <Box display="flex" justifyContent="space-between">
            <Typography fontSize={12} fontWeight={700} color="#0d59f2">
              STEP 4 OF 4
            </Typography>
            <Typography fontSize={12} color="#9ca6ba">
              100% Completed
            </Typography>
          </Box>
          <Box
            sx={{
              mt: 1,
              height: 6,
              bgcolor: "#282e39",
              borderRadius: 999,
            }}
          >
            <Box
              sx={{
                width: "100%",
                height: "100%",
                bgcolor: "#0d59f2",
                boxShadow: "0 0 10px #0d59f2",
                borderRadius: 999,
              }}
            />
          </Box>
        </Box>

        {/* Title */}
        <Typography variant="h4" fontWeight={800}>
          Final Step: Banking Details
        </Typography>
        <Typography color="#9ca6ba" maxWidth={640} mt={1} mb={4}>
          Provide your payout account details to receive earnings from paid exams.{" "}
          <Box component="span" color="#0d59f2">
            All data is encrypted.
          </Box>
        </Typography>

        {/* Glass Card */}
        <Box
          sx={{
            p: { xs: 4, md: 6 },
            borderRadius: 3,
            background: "rgba(20,25,35,0.4)",
            backdropFilter: "blur(12px)",
            border: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          {/* Secure */}
          <Box
            display="flex"
            justifyContent="flex-end"
            alignItems="center"
            gap={1}
            mb={3}
            color="#4ade80"
            fontSize={12}
          >
            <LockIcon fontSize="small" />
            256-bit SSL Secured
          </Box>

          {/* FORM */}
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
              gap: 3,
            }}
          >
            <Field label="Account Holder Name" value="Institute of Excellence Pvt Ltd" full />

            <SelectField label="Bank Name" options={["HDFC Bank", "ICICI Bank", "State Bank of India", "Axis Bank"]} />

            <Box>
              <Label>IFSC Code</Label>
              <Box position="relative">
                <StyledInput value="HDFC0000240" />
                <CheckCircleIcon sx={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", color: "#22c55e" }} />
              </Box>
              <Typography fontSize={12} color="#4ade80" mt={0.5}>
                ✓ Powai Branch, Mumbai
              </Typography>
            </Box>

            <Field label="Account Number" type="password" icon={<PasswordIcon />} value="1234567890" />
            <Field label="Confirm Account Number" />
            <Field label="UPI ID / VPA" optional full />
          </Box>

          {/* WARNING */}
          <Box
            mt={4}
            p={3}
            display="flex"
            gap={2}
            borderRadius={2}
            border="1px solid rgba(245,158,11,0.2)"
            bgcolor="rgba(245,158,11,0.05)"
          >
            <WarningAmberIcon sx={{ color: "#f59e0b" }} />
            <Box flex={1}>
              <Typography fontWeight={700} fontSize={14}>
                Admin Approval Required
              </Typography>
              <Typography fontSize={13} color="#9ca6ba">
                Changing bank details later will require a 48-hour approval period. ₹1 may be deposited to verify.
              </Typography>
            </Box>
            <Switch defaultChecked />
          </Box>
        </Box>

        {/* ACTIONS */}
        <Box mt={4} display="flex" gap={2} flexDirection={{ xs: "column-reverse", md: "row" }} justifyContent="space-between">
          <Button sx={{ border: "1px solid #3b4354", color: "#fff", px: 4, py: 1.5 }}>
            Back
          </Button>

          <Button
            endIcon={<ArrowForwardIcon />}
            sx={{
              px: 4,
              py: 1.5,
              fontWeight: 700,
              bgcolor: "#0d59f2",
              "&:hover": {
                boxShadow: "0 0 20px rgba(13,89,242,0.4)",
              },
            }}
          >
            Submit for Verification
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

/* ---------- Helpers ---------- */

function Label({ children }) {
  return (
    <Typography fontSize={14} color="#9ca6ba" mb={0.5}>
      {children}
    </Typography>
  );
}

function StyledInput(props) {
  return (
    <TextField
      fullWidth
      {...props}
      InputProps={{
        sx: {
          bgcolor: "#13161c",
          borderRadius: 2,
          color: "#fff",
        },
      }}
    />
  );
}

function Field({ label, optional, full, icon, ...props }) {
  return (
    <Box sx={{ gridColumn: full ? "1 / -1" : "auto" }}>
      <Box display="flex" justifyContent="space-between">
        <Label>{label}</Label>
        {optional && <Typography fontSize={12} color="#555f75">Optional</Typography>}
      </Box>
      <Box position="relative">
        {icon && (
          <Box sx={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", color: "#555f75" }}>
            {icon}
          </Box>
        )}
        <StyledInput sx={{ pl: icon ? 5 : 2 }} {...props} />
      </Box>
    </Box>
  );
}

function SelectField({ label, options }) {
  return (
    <Box>
      <Label>{label}</Label>
      <TextField
        select
        defaultValue={options[0]}
        fullWidth
        InputProps={{
          endAdornment: <ExpandMoreIcon sx={{ color: "#9ca6ba" }} />,
          sx: { bgcolor: "#13161c", borderRadius: 2, color: "#fff" },
        }}
      >
        {options.map((o) => (
          <MenuItem key={o} value={o}>{o}</MenuItem>
        ))}
      </TextField>
    </Box>
  );
}
