import React from "react";
import {
  Box,
  Typography,
  Button,
  Avatar,
  LinearProgress,
  Checkbox,
} from "@mui/material";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import SchoolIcon from "@mui/icons-material/School";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import TrainIcon from "@mui/icons-material/Train";
import CastForEducationIcon from "@mui/icons-material/CastForEducation";
import SecurityIcon from "@mui/icons-material/Security";
import MapIcon from "@mui/icons-material/Map";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

export default function ExamCatagories3() {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "#050a14",
        color: "#fff",
        fontFamily: "Inter, sans-serif",
        background:
          "radial-gradient(circle at top, #0f172a 0%, #050a14 55%, #000 100%)",
      }}
    >
      {/* ================= HEADER ================= */}
      <Box
        sx={{
          position: "sticky",
          top: 0,
          zIndex: 50,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          px: 3,
          py: 2,
          borderBottom: "1px solid rgba(255,255,255,0.05)",
          backdropFilter: "blur(12px)",
          bgcolor: "rgba(5,10,20,0.8)",
        }}
      >
        <Typography
          sx={{
            fontWeight: 700,
            letterSpacing: "-0.02em",
            background: "linear-gradient(to right, #fff, #9ca6ba)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          LAIRRY – Institute Console
        </Typography>

        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <HelpOutlineIcon sx={{ color: "#9ca6ba" }} />
          <Avatar
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDviQn6mMbrJmilCdmD8yfYBaBXgunJ1pcQ0942wzLJ57-1jd0AV6s5CnTbJK7mjweXq_MNFywq1CX10ndupPUqR2G_p7hgvYy-va95hfuscWFZ1Ss6TGgrHQn0a9gqPq6P9OeZPJfVtdekw9rBlJd-FSpgnK5tIgLMNsXnmj1NMmVU3e8jHDfQ4HlFNrsH12h0tTTd67-BT0T0nR3cAqfP_rjiwNFFvP7GDF1uhAS__kJ1OgP9jBz47Tbp0EEjGyC6d0RBgjfk0iUq"
            sx={{ width: 40, height: 40, border: "2px solid rgba(255,255,255,0.1)" }}
          />
        </Box>
      </Box>

      {/* ================= MAIN ================= */}
      <Box
        sx={{
          position: "relative",
          px: { xs: 2, md: 6 },
          py: { xs: 4, md: 6 },
          display: "flex",
          justifyContent: "center",
        }}
      >
        {/* Glow blobs */}
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: "25%",
            width: 380,
            height: 380,
            bgcolor: "rgba(13,89,242,0.2)",
            filter: "blur(120px)",
          }}
        />
        <Box
          sx={{
            position: "absolute",
            bottom: 0,
            right: "25%",
            width: 500,
            height: 500,
            bgcolor: "rgba(88,28,135,0.2)",
            filter: "blur(140px)",
          }}
        />

        <Box sx={{ width: "100%", maxWidth: 1100, zIndex: 1 }}>
          {/* Progress */}
          <Box sx={{ mb: 4 }}>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography>Step 3 of 4: Exam Categories</Typography>
              <Typography sx={{ color: "#9ca6ba" }}>75% completed</Typography>
            </Box>
            <LinearProgress
              variant="determinate"
              value={75}
              sx={{
                mt: 1.5,
                height: 8,
                borderRadius: 99,
                bgcolor: "#1e2330",
                "& .MuiLinearProgress-bar": {
                  borderRadius: 99,
                  background:
                    "linear-gradient(to right, #2563eb, #0d59f2)",
                  boxShadow: "0 0 12px rgba(13,89,242,0.6)",
                },
              }}
            />
          </Box>

          {/* Glass Card */}
          <Box
            sx={{
              borderRadius: 4,
              p: { xs: 3, md: 6 },
              background: "rgba(20,25,35,0.45)",
              backdropFilter: "blur(18px)",
              border: "1px solid rgba(255,255,255,0.08)",
              boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
            }}
          >
            <Typography variant="h4" fontWeight={700} align="center">
              What exams does your institute cover?
            </Typography>
            <Typography
              align="center"
              sx={{ mt: 1, mb: 5, color: "#9ca6ba" }}
            >
              Select all that apply. Lairry&apos;s AI will customize your dashboard.
            </Typography>

            {/* Cards */}
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: {
                  xs: "1fr",
                  sm: "1fr 1fr",
                  lg: "1fr 1fr 1fr",
                },
                gap: 3,
                mb: 5,
              }}
            >
              <CategoryCard selected icon={<SchoolIcon />} title="SSC Exams" desc="CGL, CHSL, MTS, CPO" />
              <CategoryCard selected icon={<AccountBalanceIcon />} title="Banking" desc="IBPS, SBI, RBI" />
              <CategoryCard icon={<TrainIcon />} title="Railways" desc="RRB NTPC, Group D" />
              <CategoryCard icon={<CastForEducationIcon />} title="Teaching" desc="CTET, KVS, NVS" />
              <CategoryCard icon={<SecurityIcon />} title="Defence" desc="NDA, CDS, AFCAT" />
              <CategoryCard icon={<MapIcon />} title="State Exams" desc="PSC, Police, Patwari" />
            </Box>

            {/* Checkbox */}
            <Box sx={{ display: "flex", alignItems: "center", mb: 4 }}>
              <Checkbox sx={{ color: "#9ca6ba" }} />
              <Typography sx={{ color: "#cbd5f5", fontSize: 14 }}>
                Select all relevant categories automatically
              </Typography>
            </Box>

            {/* Actions */}
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Button startIcon={<ArrowBackIcon />} sx={{ color: "#9ca6ba" }}>
                Back
              </Button>
              <Button
                endIcon={<ArrowForwardIcon />}
                sx={{
                  px: 4,
                  py: 1.5,
                  bgcolor: "#0d59f2",
                  color: "#fff",
                  fontWeight: 700,
                  "&:hover": {
                    bgcolor: "#2563eb",
                    boxShadow: "0 0 24px rgba(13,89,242,0.6)",
                  },
                }}
              >
                Save & Continue
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

/* ================= CARD COMPONENT ================= */

function CategoryCard({ icon, title, desc, selected }) {
  return (
    <Box
      sx={{
        position: "relative",
        p: 3,
        borderRadius: 3,
        cursor: "pointer",
        bgcolor: selected ? "rgba(13,89,242,0.12)" : "rgba(255,255,255,0.04)",
        border: selected
          ? "1px solid #0d59f2"
          : "1px solid rgba(255,255,255,0.1)",
        boxShadow: selected
          ? "0 0 16px rgba(13,89,242,0.35)"
          : "none",
        transition: "all .3s",
        "&:hover": { transform: "translateY(-4px)" },
      }}
    >
      {selected && (
        <CheckCircleIcon
          sx={{ position: "absolute", top: 12, right: 12, color: "#0d59f2" }}
        />
      )}

      <Box
        sx={{
          mb: 2,
          width: 48,
          height: 48,
          borderRadius: 2,
          bgcolor: selected ? "rgba(13,89,242,0.25)" : "rgba(255,255,255,0.06)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: selected ? "#0d59f2" : "#9ca6ba",
        }}
      >
        {icon}
      </Box>

      <Typography fontWeight={600}>{title}</Typography>
      <Typography sx={{ color: "#9ca6ba", fontSize: 14 }}>{desc}</Typography>
    </Box>
  );
}
