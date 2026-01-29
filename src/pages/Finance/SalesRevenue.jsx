import React from "react";
import {
  Box,
  Typography,
  Button,
  Chip,
  Stack,
  Divider,
} from "@mui/material";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import DownloadIcon from "@mui/icons-material/Download";
import VisibilityIcon from "@mui/icons-material/Visibility";

export default function SalesRevenue() {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "#0b1017",
        color: "#fff",
        fontFamily: "Space Grotesk, Manrope, sans-serif",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* ambient glow */}
      <Glow top={-120} left={-120} color="#137fec" />
      <Glow bottom={-160} right={-120} color="#6d28d9" />

      <Box sx={{ maxWidth: 1320, mx: "auto", px: 5, py: 4 }}>
        {/* HEADER */}
        <Box mb={4}>
          <Typography fontSize={13} color="#94a3b8">
            Home / Finance / <b style={{ color: "#fff" }}>Revenue</b>
          </Typography>

          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            mt={1}
          >
            <Typography fontSize={26} fontWeight={800}>
              Sales & Revenue
            </Typography>

            <Stack
              direction="row"
              sx={{
                bgcolor: "#111827",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: 999,
                p: 0.5,
              }}
            >
              {["Monthly", "Quarterly", "Yearly"].map((t, i) => (
                <Button
                  key={t}
                  size="small"
                  sx={{
                    px: 2,
                    fontWeight: 700,
                    color: i === 0 ? "#0b1017" : "#94a3b8",
                    bgcolor: i === 0 ? "#137fec" : "transparent",
                    borderRadius: 999,
                  }}
                >
                  {t}
                </Button>
              ))}
            </Stack>
          </Stack>
        </Box>

        {/* OVERVIEW */}
        <Stack direction="row" justifyContent="space-between" mb={4}>
          <Typography color="#94a3b8">
            Overview for <b style={{ color: "#fff" }}>October 2023</b>
          </Typography>

          <Stack direction="row" spacing={2}>
            <Button startIcon={<CalendarMonthIcon />} sx={dateBtn}>
              Oct 1, 2023 – Oct 31, 2023
            </Button>
            <Button startIcon={<DownloadIcon />} sx={primaryBtn}>
              Download Report
            </Button>
          </Stack>
        </Stack>

        {/* STAT CARDS */}
        <Box display="grid" gridTemplateColumns="repeat(4,1fr)" gap={3} mb={4}>
          <StatCard title="Gross Revenue" value="₹1,20,500" badge="+12.5%" />
          <StatCard
            title="Your Net Earnings"
            value="₹60,250"
            highlight
            badge="50% Share"
          />
          <StatCard title="Platform Fee (LAIRRY)" value="₹60,250" />
          <StatCard title="Total Enrollments" value="241" />
        </Box>

        {/* CHART + PAYOUT */}
        <Box display="grid" gridTemplateColumns="2fr 1fr" gap={3} mb={4}>
          {/* REVENUE TREND */}
          <GlassCard>
            <Stack direction="row" justifyContent="space-between" mb={2}>
              <Typography fontWeight={700}>Revenue Trend</Typography>
              <Stack direction="row" spacing={1} alignItems="center">
                <Box
                  sx={{
                    width: 8,
                    height: 8,
                    bgcolor: "#137fec",
                    borderRadius: "50%",
                  }}
                />
                <Typography fontSize={12} color="#94a3b8">
                  Revenue
                </Typography>
              </Stack>
            </Stack>

            <Box sx={{ display: "flex" }}>
              {/* Y axis */}
              <Stack
                justifyContent="space-between"
                sx={{ height: 260, pr: 2 }}
              >
                {["80k", "60k", "40k", "20k", "0"].map((v) => (
                  <Typography key={v} fontSize={12} color="#64748b">
                    {v}
                  </Typography>
                ))}
              </Stack>

              {/* bars */}
              <Box
                sx={{
                  flex: 1,
                  display: "flex",
                  alignItems: "flex-end",
                  height: 260,
                  gap: 2,
                }}
              >
                {chart.map((h, i) => (
                  <Box
                    key={i}
                    sx={{
                      flex: 1,
                      height: "100%",
                      bgcolor: "rgba(255,255,255,0.04)",
                      borderRadius: "12px",
                      display: "flex",
                      alignItems: "flex-end",
                      p: 1,
                    }}
                  >
                    <Box
                      sx={{
                        width: "100%",
                        height: `${h}%`,
                        bgcolor: "#137fec",
                        borderRadius: "10px",
                      }}
                    />
                  </Box>
                ))}
              </Box>
            </Box>

            {/* X axis */}
            <Stack
              direction="row"
              justifyContent="space-between"
              sx={{ mt: 2, ml: 5 }}
            >
              {["Oct 1", "Oct 8", "Oct 15", "Oct 22", "Oct 29"].map((d) => (
                <Typography key={d} fontSize={12} color="#64748b">
                  {d}
                </Typography>
              ))}
            </Stack>
          </GlassCard>

          {/* LATEST PAYOUT */}
          <GlassCard>
            <Stack direction="row" justifyContent="space-between" mb={2}>
              <Typography fontWeight={700}>Latest Payout</Typography>
              <Chip
                label="PROCESSING"
                size="small"
                sx={{
                  bgcolor: "rgba(234,179,8,0.15)",
                  color: "#facc15",
                  fontWeight: 700,
                }}
              />
            </Stack>

            <Typography fontSize={13} color="#94a3b8">
              Estimated Amount
            </Typography>
            <Typography fontSize={28} fontWeight={800}>
              ₹45,200.00
            </Typography>
            <Typography fontSize={12} color="#64748b" mb={3}>
              Expected by Nov 2, 2023
            </Typography>

            <Stack spacing={1.5} mb={3}>
              <PayoutRow active label="Oct 1–15 Cycle" />
              <PayoutRow label="Oct 16–31 Cycle (Current)" />
            </Stack>

            <Button fullWidth startIcon={<DownloadIcon />} sx={outlineBtn}>
              Download Tax Invoice
            </Button>
          </GlassCard>
        </Box>

        {/* EXAM WISE SALES */}
        <GlassCard>
          <Typography fontWeight={700} mb={2}>
            Exam-Wise Sales
          </Typography>

          {/* TABLE HEAD */}
          <Stack
            direction="row"
            spacing={2}
            sx={{ color: "#64748b", fontSize: 12, mb: 1 }}
          >
            <Box flex={2}>EXAM NAME</Box>
            <Box flex={1}>DATE</Box>
            <Box flex={1} textAlign="center">
              CANDIDATES
            </Box>
            <Box flex={1} textAlign="right">
              PRICE/SEAT
            </Box>
            <Box flex={1} textAlign="right">
              TOTAL REVENUE
            </Box>
            <Box flex={1} textAlign="center">
              STATUS
            </Box>
            <Box width={40}>ACTION</Box>
          </Stack>

          <Divider sx={{ borderColor: "rgba(255,255,255,0.08)", mb: 2 }} />

          <TableRow />
        </GlassCard>
      </Box>
    </Box>
  );
}

/* ---------------- helpers ---------------- */

const chart = [25, 30, 28, 40, 38, 55, 48, 65, 52, 70, 60, 75];

function Glow({ top, left, bottom, right, color }) {
  return (
    <Box
      sx={{
        position: "absolute",
        top,
        left,
        bottom,
        right,
        width: 420,
        height: 420,
        bgcolor: color,
        opacity: 0.12,
        filter: "blur(120px)",
      }}
    />
  );
}

function GlassCard({ children }) {
  return (
    <Box
      sx={{
        p: 3,
        borderRadius: 3,
        bgcolor: "rgba(17,24,39,0.7)",
        backdropFilter: "blur(14px)",
        border: "1px solid rgba(255,255,255,0.08)",
      }}
    >
      {children}
    </Box>
  );
}

function StatCard({ title, value, badge, highlight }) {
  return (
    <GlassCard>
      <Stack direction="row" justifyContent="space-between" mb={1}>
        <Typography color={highlight ? "#137fec" : "#94a3b8"}>
          {title}
        </Typography>
        {badge && (
          <Chip
            label={badge}
            size="small"
            sx={{
              bgcolor: highlight
                ? "rgba(19,127,236,0.15)"
                : "rgba(255,255,255,0.08)",
              color: highlight ? "#137fec" : "#94a3b8",
              fontWeight: 700,
            }}
          />
        )}
      </Stack>
      <Typography
        fontSize={24}
        fontWeight={800}
        color={highlight ? "#137fec" : "#fff"}
      >
        {value}
      </Typography>
    </GlassCard>
  );
}

function PayoutRow({ label, active }) {
  return (
    <Box
      sx={{
        p: 2,
        borderRadius: 2,
        bgcolor: active ? "rgba(34,197,94,0.12)" : "rgba(255,255,255,0.04)",
        border: "1px solid rgba(255,255,255,0.08)",
        color: active ? "#22c55e" : "#94a3b8",
        fontWeight: 700,
      }}
    >
      {label}
    </Box>
  );
}

function TableRow() {
  return (
    <Stack direction="row" spacing={2} alignItems="center">
      <Box flex={2}>
        <Typography fontWeight={700}>AI & ML Entrance Phase 1</Typography>
        <Typography fontSize={12} color="#64748b">
          ID: EX-2991
        </Typography>
      </Box>
      <Box flex={1}>Oct 24, 2023</Box>
      <Box flex={1} textAlign="center">
        120
      </Box>
      <Box flex={1} textAlign="right">
        ₹500
      </Box>
      <Box flex={1} textAlign="right" color="#137fec" fontWeight={700}>
        ₹60,000
      </Box>
      <Box flex={1} textAlign="center">
        <Chip label="Completed" color="success" size="small" />
      </Box>
      <VisibilityIcon sx={{ color: "#94a3b8" }} />
    </Stack>
  );
}

/* styles */

const primaryBtn = {
  bgcolor: "#137fec",
  fontWeight: 800,
};

const outlineBtn = {
  border: "1px solid #137fec",
  color: "#137fec",
  fontWeight: 800,
};

const dateBtn = {
  bgcolor: "#111827",
  border: "1px solid rgba(255,255,255,0.08)",
  color: "#fff",
};
