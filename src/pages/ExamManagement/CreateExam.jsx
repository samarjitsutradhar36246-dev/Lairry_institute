import React from "react";
import {
  Box,
  Typography,
  Button,
  TextField,
  MenuItem,
  Chip,
  Divider,
  InputAdornment,
} from "@mui/material";

import EditDocumentIcon from "@mui/icons-material/EditDocument";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ScheduleIcon from "@mui/icons-material/Schedule";
import TranslateIcon from "@mui/icons-material/Translate";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import SaveIcon from "@mui/icons-material/Save";
import TableViewIcon from "@mui/icons-material/TableView";
import DownloadIcon from "@mui/icons-material/Download";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import LightbulbIcon from "@mui/icons-material/Lightbulb";

export default function CreateExam() {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "#0a0e17",
        color: "#fff",
        fontFamily: "Manrope, Noto Sans, sans-serif",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background glows */}
      <Glow sx={{ top: "-10%", left: "-10%", bgcolor: "rgba(19,127,236,0.25)" }} />
      <Glow sx={{ bottom: "-10%", right: "-10%", bgcolor: "rgba(168,85,247,0.18)" }} />

      {/* Content */}
      <Box sx={{ px: { xs: 3, md: 6, lg: 10 }, py: { xs: 4, md: 6 }, maxWidth: 1400, mx: "auto" }}>
        {/* Header */}
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            justifyContent: "space-between",
            gap: 4,
            mb: 6,
          }}
        >
          <Box>
            <Typography fontSize={14} color="#94a3b8" mb={1}>
              Home / Exams / <span style={{ color: "#fff" }}>Create New</span>
            </Typography>

            <Box display="flex" alignItems="center" gap={2}>
              <Typography variant="h4" fontWeight={900}>
                Create New Exam
              </Typography>
              <Chip
                label="Draft Mode"
                sx={{
                  bgcolor: "#1e293b",
                  border: "1px solid #334155",
                  color: "#cbd5f5",
                  fontSize: 12,
                  fontWeight: 700,
                }}
              />
            </Box>

            <Typography color="#94a3b8" maxWidth={640} mt={1}>
              Configure the essential details for your upcoming examination. Advanced question
              management is handled via Excel upload.
            </Typography>
          </Box>

          <Box display="flex" gap={2}>
            <Button
              startIcon={<SaveIcon />}
              sx={{
                px: 3,
                borderRadius: 2,
                height:"50%",
                border: "1px solid #475569",
                color: "#cbd5f5",
                "&:hover": { bgcolor: "#1e293b" },
              }}
            >
              Save Draft
            </Button>

            <Button
              endIcon={<ArrowForwardIcon />}
              sx={{
                px: 3,
                borderRadius: 2,
                color:"white",
                height:"50%",
                bgcolor: "#137fec",
                fontWeight: 700,
                boxShadow: "0 0 25px rgba(19,127,236,0.45)",
                "&:hover": {
                  bgcolor: "#0b5cb5",
                  boxShadow: "0 0 35px rgba(19,127,236,0.7)",
                },
              }}
            >
              Submit for Approval
            </Button>
          </Box>
        </Box>

        {/* Layout */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", lg: "2fr 1fr" },
            gap: 6,
          }}
        >
          {/* Left column */}
          <Box display="flex" flexDirection="column" gap={6}>
            {/* Exam Details */}
            <GlassCard>
              <Header icon={<EditDocumentIcon />} title="Exam Details" />

              <Field label="Exam Title">
                <StyledInput placeholder="e.g. JEE Mains Mock Test - Series A" />
              </Field>

              <TwoCol>
                <SelectField
                  label="Category"
                  options={["Select Exam Stream", "Engineering (JEE)", "Medical (NEET)", "Banking & SSC"]}
                />
                <SelectField
                  label="Language"
                  icon={<TranslateIcon />}
                  options={["English", "Hindi", "Marathi", "Tamil"]}
                />
              </TwoCol>

              <TwoCol>
                <Field label="Duration (minutes)" icon={<ScheduleIcon />}>
                  <StyledInput type="number" placeholder="180" />
                </Field>

                <Field label="Price (INR)" prefix="₹">
                  <StyledInput type="number" placeholder="499" />
                </Field>
              </TwoCol>
            </GlassCard>

            {/* Visibility */}
            <GlassCard>
              <Box display="flex" justifyContent="space-between" alignItems="center">
                <Box>
                  <Header icon={<VisibilityIcon />} title="Exam Visibility" />
                  <Typography fontSize={14} color="#94a3b8">
                    <b style={{ color: "#fff" }}>Public:</b> Listed on marketplace <br />
                    <b style={{ color: "#fff" }}>Private:</b> Direct link access
                  </Typography>
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    bgcolor: "#0f172a",
                    border: "1px solid rgba(255,255,255,0.08)",
                    borderRadius: 2,
                    p: 0.5,
                  }}
                >
                  <Button size="small" sx={{ color: "#94a3b8" }}>
                    Private
                  </Button>
                  <Button size="small" sx={{ bgcolor: "#137fec", color: "#fff", fontWeight: 700 }}>
                    Public
                  </Button>
                </Box>
              </Box>
            </GlassCard>
          </Box>

          {/* Right column */}
          <Box display="flex" flexDirection="column" gap={6}>
            {/* Questions */}
            <GlassCard>
              <Header icon={<TableViewIcon />} title="Questions & Sections" />

              <Typography color="#94a3b8" fontSize={14} mb={3}>
                Create your exam structure in our Excel template, then upload it.
              </Typography>

              <Button
                fullWidth
                startIcon={<DownloadIcon />}
                sx={{
                  mb: 2,
                  border: "1px dashed #475569",
                  color: "#cbd5f5",
                  "&:hover": { borderColor: "#137fec", bgcolor: "rgba(19,127,236,0.08)" },
                }}
              >
                Download Template
              </Button>

              <Divider sx={{ borderColor: "rgba(255,255,255,0.08)", mb: 2 }} />

              <Button
                fullWidth
                startIcon={<UploadFileIcon />}
                sx={{
                  bgcolor: "#1e293b",
                  "&:hover": { bgcolor: "#334155" },
                }}
              >
                Upload Excel File
              </Button>
            </GlassCard>

            {/* Summary */}
            <GlassCard>
              <Typography fontWeight={700} mb={2}>
                Summary
              </Typography>

              <SummaryRow label="Created By" value="Dr. A. Sharma" />
              <Divider sx={{ my: 1, borderColor: "rgba(255,255,255,0.06)" }} />
              <SummaryRow label="Creation Date" value="Oct 24, 2023" />
              <Divider sx={{ my: 1, borderColor: "rgba(255,255,255,0.06)" }} />
              <SummaryRow
                label="Status"
                value={
                  <Chip
                    label="DRAFT"
                    size="small"
                    sx={{
                      bgcolor: "rgba(234,179,8,0.12)",
                      color: "#facc15",
                      fontWeight: 700,
                    }}
                  />
                }
              />
            </GlassCard>

            {/* Pro Tip */}
            <Box
              sx={{
                p: 3,
                borderRadius: 3,
                bgcolor: "rgba(19,127,236,0.12)",
                border: "1px solid rgba(19,127,236,0.2)",
              }}
            >
              <Box display="flex" gap={2}>
                <LightbulbIcon sx={{ color: "#137fec" }} />
                <Box>
                  <Typography fontWeight={700} fontSize={14}>
                    Pro Tip
                  </Typography>
                  <Typography fontSize={13} color="#94a3b8">
                    Use concise titles for better visibility on mobile devices.
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

/* ---------- Helpers ---------- */

function Glow({ sx }) {
  return (
    <Box
      sx={{
        position: "absolute",
        width: "40%",
        height: "40%",
        borderRadius: "50%",
        filter: "blur(120px)",
        pointerEvents: "none",
        ...sx,
      }}
    />
  );
}

function GlassCard({ children }) {
  return (
    <Box
      sx={{
        p: { xs: 4, md: 5 },
        borderRadius: 3,
        bgcolor: "rgba(30,41,59,0.4)",
        backdropFilter: "blur(14px)",
        border: "1px solid rgba(255,255,255,0.08)",
        boxShadow: "0 10px 40px rgba(0,0,0,0.4)",
      }}
    >
      {children}
    </Box>
  );
}

function Header({ icon, title }) {
  return (
    <Box display="flex" alignItems="center" gap={2} mb={3}>
      <Box sx={{ color: "#137fec" }}>{icon}</Box>
      <Typography fontSize={20} fontWeight={800}>
        {title}
      </Typography>
    </Box>
  );
}

function TwoCol({ children }) {
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
        gap: 3,
        mt: 3,
      }}
    >
      {children}
    </Box>
  );
}

function Field({ label, children }) {
  return (
    <Box>
      <Typography fontSize={14} color="#cbd5f5" mb={1}>
        {label}
      </Typography>
      {children}
    </Box>
  );
}

function StyledInput({ icon, prefix, ...props }) {
  return (
    <TextField
      fullWidth
      {...props}
      slotProps={{
        input: {
          sx: {
            bgcolor: "#0f172a",
            borderRadius: 2,
            color: "#fff",
            paddingLeft: icon || prefix ? 0 : 2,
          },
        },
        root: {
          sx: {
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: "rgba(255,255,255,0.12)",
            },
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: "rgba(19,127,236,0.6)",
            },
          },
        },
        startAdornment: (
          <>
            {icon && (
              <InputAdornment position="start" sx={{ color: "#64748b" }}>
                {icon}
              </InputAdornment>
            )}
            {prefix && (
              <InputAdornment position="start" sx={{ color: "#64748b" }}>
                {prefix}
              </InputAdornment>
            )}
          </>
        ),
      }}
    />
  );
}

function SelectField({ label, options, icon }) {
  return (
    <Box>
      <Typography fontSize={14} color="#cbd5f5" mb={1}>
        {label}
      </Typography>

      <TextField
        select
        fullWidth
        defaultValue={options[0]}
        slotProps={{
          input: {
            sx: {
              bgcolor: "#0f172a",
              borderRadius: 2,
              color: "#fff",
              paddingLeft: icon ? 0 : 2,
            },
          },
          root: {
            sx: {
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "rgba(255,255,255,0.12)",
              },
              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: "rgba(19,127,236,0.6)",
              },
            },
          },
          select: {
            IconComponent: ExpandMoreIcon,
          },
        }}
      >
        {options.map((o) => (
          <MenuItem key={o} value={o}>
            {o}
          </MenuItem>
        ))}
      </TextField>
    </Box>
  );
}

function SummaryRow({ label, value }) {
  return (
    <Box display="flex" justifyContent="space-between" alignItems="center">
      <Typography color="#94a3b8">{label}</Typography>
      <Typography component="div" fontWeight={600}>
        {value}
      </Typography>
    </Box>
  );
}
