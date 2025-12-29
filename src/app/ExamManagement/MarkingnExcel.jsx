import React from "react";
import {
  Box,
  Typography,
  Button,
  Chip,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";

import DownloadIcon from "@mui/icons-material/Download";
import TableViewIcon from "@mui/icons-material/TableView";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ScienceIcon from "@mui/icons-material/Science";

export default function MarkingnExcel() {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "#0b0e14",
        color: "#fff",
        fontFamily: "Manrope, Noto Sans, sans-serif",
        position: "relative",
        overflow: "hidden",
        pb: 12,
      }}
    >
      {/* Ambient glow */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: 400,
          background:
            "linear-gradient(to bottom, rgba(19,127,236,0.15), transparent)",
          pointerEvents: "none",
        }}
      />

      <Box sx={{ maxWidth: 1200, mx: "auto", px: { xs: 3, md: 6 }, pt: 6 }}>
        {/* Breadcrumb + Title */}
        <Box mb={6}>
          <Box display="flex" gap={1} alignItems="center" mb={1}>
            {["Exams", "Create New", "Configuration"].map((t, i) => (
              <Typography
                key={i}
                fontSize={12}
                color="#137fec"
                fontWeight={700}
                textTransform="uppercase"
              >
                {t}
                {i < 2 && " ›"}
              </Typography>
            ))}
          </Box>

          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="flex-end"
            gap={2}
          >
            <Box>
              <Typography variant="h4" fontWeight={900}>
                Exam Pattern & Marking
              </Typography>
              <Typography color="#94a3b8" maxWidth={640} mt={1}>
                Configure your exam structure using our Excel-first workflow.
                Download the template, fill it in, and upload to auto-populate
                settings.
              </Typography>
            </Box>

            <Chip
              icon={<ScienceIcon />}
              label="Beta Feature"
              sx={{
                bgcolor: "rgba(19,127,236,0.12)",
                color: "#137fec",
                border: "1px solid rgba(19,127,236,0.25)",
                fontWeight: 700,
              }}
            />
          </Box>
        </Box>

        {/* Step cards */}
        <Box
          display="grid"
          gridTemplateColumns={{ xs: "1fr", lg: "4fr 8fr" }}
          gap={4}
          mb={6}
        >
          {/* Step 1 */}
          <GlassCard>
            <Box display="flex" justifyContent="space-between" mb={2}>
              <IconBox>
                <DownloadIcon />
              </IconBox>
              <Typography fontSize={12} color="#64748b" fontWeight={700}>
                STEP 01
              </Typography>
            </Box>

            <Typography fontSize={20} fontWeight={800} mb={1}>
              Get the Template
            </Typography>
            <Typography fontSize={14} color="#94a3b8" mb={3}>
              Download the strictly formatted Excel file. Do not alter the header
              rows to ensure seamless parsing.
            </Typography>

            <Button
              fullWidth
              startIcon={<TableViewIcon />}
              sx={{
                mt: "auto",
                bgcolor: "#283039",
                border: "1px solid rgba(255,255,255,0.08)",
                color: "#fff",
                fontWeight: 700,
                py: 1.5,
                "&:hover": {
                  bgcolor: "#323c47",
                  borderColor: "rgba(19,127,236,0.3)",
                },
              }}
            >
              Download .xlsx Template
            </Button>

            <Typography
              textAlign="center"
              fontSize={12}
              color="#64748b"
              mt={2}
            >
              Version 2.4 (Latest)
            </Typography>
          </GlassCard>

          {/* Step 2 Upload */}
          <GlassCard
            sx={{
              p: 1,
              border: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            <Box
              sx={{
                height: "100%",
                borderRadius: 3,
                border: "2px dashed #334155",
                bgcolor: "rgba(11,14,20,0.4)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
                gap: 3,
                py: 8,
                "&:hover": {
                  borderColor: "#137fec",
                  bgcolor: "rgba(30,41,59,0.5)",
                },
              }}
            >
              <Box position="relative">
                <Box
                  sx={{
                    position: "absolute",
                    inset: 0,
                    bgcolor: "rgba(19,127,236,0.25)",
                    filter: "blur(24px)",
                    borderRadius: "50%",
                  }}
                />
                <IconBox sx={{ width: 80, height: 80 }}>
                  <CloudUploadIcon sx={{ fontSize: 40 }} />
                </IconBox>
                <Chip
                  label="READY"
                  size="small"
                  sx={{
                    position: "absolute",
                    bottom: -6,
                    right: -6,
                    bgcolor: "#22c55e",
                    color: "#0b0e14",
                    fontWeight: 800,
                    fontSize: 10,
                  }}
                />
              </Box>

              <Box textAlign="center">
                <Typography fontSize={22} fontWeight={800}>
                  Upload Configuration
                </Typography>
                <Typography fontSize={14} color="#94a3b8">
                  Drag & drop your filled Excel file here, or{" "}
                  <span style={{ color: "#137fec", fontWeight: 700 }}>
                    browse files
                  </span>
                </Typography>
                <Typography
                  fontSize={12}
                  color="#64748b"
                  textTransform="uppercase"
                  mt={1}
                >
                  Supports .xlsx, .csv • Max 5MB
                </Typography>
              </Box>
            </Box>
          </GlassCard>
        </Box>

        {/* Validation summary */}
        <Box mb={6}>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            mb={2}
          >
            <Typography
              fontSize={18}
              fontWeight={800}
              display="flex"
              alignItems="center"
              gap={1}
            >
              <CheckCircleIcon sx={{ color: "#22c55e" }} />
              Pattern Validation Summary
            </Typography>

            <Typography fontSize={12} color="#64748b" fontFamily="monospace">
              File: Physics_Chem_Math_Main.xlsx (24KB)
            </Typography>
          </Box>

          <GlassCard sx={{ p: 0 }}>
            {/* Warning */}
            <Box
              sx={{
                display: "flex",
                gap: 2,
                px: 3,
                py: 2,
                bgcolor: "rgba(234,179,8,0.12)",
                borderBottom: "1px solid rgba(234,179,8,0.25)",
              }}
            >
              <WarningAmberIcon sx={{ color: "#facc15", mt: "2px" }} />
              <Box>
                <Typography fontSize={14} fontWeight={700} color="#fde68a">
                  Admin Review Required
                </Typography>
                <Typography fontSize={12} color="#facc15">
                  All uploaded patterns remain in draft until approved.
                </Typography>
              </Box>
            </Box>

            {/* Table */}
            <Table>
              <TableHead>
                <TableRow sx={{ bgcolor: "rgba(255,255,255,0.04)" }}>
                  {[
                    "Section Name",
                    "Type",
                    "Questions",
                    "Marks/Q",
                    "Negative",
                    "Total Marks",
                    "Status",
                  ].map((h) => (
                    <TableCell
                      key={h}
                      sx={{
                        color: "#94a3b8",
                        fontSize: 12,
                        fontWeight: 700,
                        textTransform: "uppercase",
                      }}
                      align={h === "Section Name" || h === "Type" ? "left" : "center"}
                    >
                      {h}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>

              <TableBody>
                {rows.map((r) => (
                  <TableRow
                    key={r.section}
                    sx={{
                      "&:hover": { bgcolor: "rgba(255,255,255,0.04)" },
                    }}
                  >
                    <Cell bold>{r.section}</Cell>
                    <Cell>{r.type}</Cell>
                    <Cell center>{r.q}</Cell>
                    <Cell mono align="right">
                      +{r.marks}
                    </Cell>
                    <Cell mono align="right" color={r.neg < 0 ? "#f87171" : "#64748b"}>
                      {r.neg}
                    </Cell>
                    <Cell bold align="right">
                      {r.total}
                    </Cell>
                    <Cell center>
                      <Box
                        sx={{
                          width: 8,
                          height: 8,
                          bgcolor: "#22c55e",
                          borderRadius: "50%",
                          mx: "auto",
                        }}
                      />
                    </Cell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </GlassCard>
        </Box>
      </Box>

      {/* Bottom action bar */}
      <Box
        sx={{
          position: "fixed",
          bottom: 0,
          left: 0,
          width: "100%",
          bgcolor: "rgba(11,14,20,0.9)",
          backdropFilter: "blur(14px)",
          borderTop: "1px solid rgba(255,255,255,0.08)",
          py: 2,
        }}
      >
        <Box
          sx={{
            maxWidth: 1200,
            mx: "auto",
            px: { xs: 3, md: 6 },
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Button sx={{ color: "#94a3b8" }}>Discard Draft</Button>

          <Box display="flex" gap={2} alignItems="center">
            <Typography fontSize={12} color="#64748b">
              Last saved 2 mins ago
            </Typography>
            <Button
              sx={{
                bgcolor: "#283039",
                color: "#fff",
                fontWeight: 700,
                "&:hover": { bgcolor: "#323c47" },
              }}
            >
              Save as Draft
            </Button>
            <Button
              endIcon={<ArrowForwardIcon />}
              sx={{
                bgcolor: "#137fec",
                fontWeight: 800,
                boxShadow: "0 0 20px rgba(19,127,236,0.45)",
                "&:hover": { bgcolor: "#0b5cb5" },
              }}
            >
              Submit for Review
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

/* ---------------- helpers ---------------- */

const rows = [
  {
    section: "Physics - Section A",
    type: "MCQ (Single Correct)",
    q: 20,
    marks: 4,
    neg: -1,
    total: 80,
  },
  {
    section: "Physics - Section B",
    type: "Numerical Value",
    q: 10,
    marks: 4,
    neg: 0,
    total: 40,
  },
  {
    section: "Chemistry - Section A",
    type: "MCQ (Single Correct)",
    q: 20,
    marks: 4,
    neg: -1,
    total: 80,
  },
];

function GlassCard({ children, sx }) {
  return (
    <Box
      sx={{
        p: 4,
        borderRadius: 3,
        bgcolor: "rgba(30,41,59,0.4)",
        backdropFilter: "blur(14px)",
        border: "1px solid rgba(255,255,255,0.08)",
        boxShadow: "0 10px 40px rgba(0,0,0,0.4)",
        ...sx,
      }}
    >
      {children}
    </Box>
  );
}

function IconBox({ children, sx }) {
  return (
    <Box
      sx={{
        width: 48,
        height: 48,
        borderRadius: 2,
        bgcolor: "linear-gradient(135deg,#334155,#1e293b)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        border: "1px solid rgba(255,255,255,0.08)",
        color: "#fff",
        ...sx,
      }}
    >
      {children}
    </Box>
  );
}

function Cell({ children, bold, mono, center, align, color }) {
  return (
    <TableCell
      align={align || (center ? "center" : "left")}
      sx={{
        color: color || "#cbd5f5",
        fontWeight: bold ? 700 : 400,
        fontFamily: mono ? "monospace" : "inherit",
      }}
    >
      {children}
    </TableCell>
  );
}
