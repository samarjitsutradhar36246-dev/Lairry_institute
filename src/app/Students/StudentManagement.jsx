import * as React from "react";
import {
  Box,
  Typography,
  Button,
  TextField,
  Chip,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  MenuItem,
  Select,
  Avatar,
  Stack,
  Paper
} from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";
import DownloadIcon from "@mui/icons-material/Download";
import AddIcon from "@mui/icons-material/Add";
import FilterListIcon from "@mui/icons-material/FilterList";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import CallIcon from "@mui/icons-material/Call";

export default function StudentManagement() {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "#141118",
        color: "white",
        fontFamily: "Lexend, sans-serif",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background glow blobs */}
      <Box
        sx={{
          position: "absolute",
          top: "-20%",
          right: "-10%",
          width: 800,
          height: 800,
          bgcolor: "primary.main",
          opacity: 0.2,
          filter: "blur(120px)",
          borderRadius: "50%",
        }}
      />
      <Box
        sx={{
          position: "absolute",
          bottom: "-20%",
          left: "-10%",
          width: 600,
          height: 600,
          bgcolor: "#1e3a8a",
          opacity: 0.2,
          filter: "blur(100px)",
          borderRadius: "50%",
        }}
      />

      {/* Content */}
      <Box sx={{ position: "relative", zIndex: 1, p: { xs: 3, md: 6 } }}>
        {/* Header */}
        <Stack
          direction={{ xs: "column", md: "row" }}
          justifyContent="space-between"
          spacing={3}
        >
          <Box>
            <Typography variant="h4" fontWeight={700}>
              Student Directory
            </Typography>
            <Typography sx={{ color: "#a89cba", mt: 1, maxWidth: 520 }}>
              Manage enrollments, track student progress, and organize exam
              cohorts efficiently.
            </Typography>
          </Box>

          <Stack direction="row" spacing={2}>
            <Button
              startIcon={<DownloadIcon />}
              sx={{
                display: { xs: "none", md: "flex" },
                px: 3,
                height: 48,
                borderRadius: 3,
                bgcolor: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.1)",
                color: "white",
                "&:hover": { bgcolor: "rgba(255,255,255,0.1)" },
              }}
            >
              Export
            </Button>
            <Button
              startIcon={<AddIcon />}
              sx={{
                px: 3,
                height: 48,
                borderRadius: 3,
                bgcolor: "#7b25f4",
                color: "white",
                fontWeight: 700,
                boxShadow: "0 0 20px rgba(123,37,244,0.5)",
                "&:hover": { bgcolor: "#6a1ee0" },
              }}
            >
              Add Student
            </Button>
          </Stack>
        </Stack>

        {/* Search & Filters */}
        <Paper
          sx={{
            mt: 5,
            p: 1.5,
            borderRadius: 4,
            background: "rgba(20,17,24,0.7)",
            backdropFilter: "blur(12px)",
            border: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
            <TextField
              fullWidth
              placeholder="Search by name, email, or student ID..."
              InputProps={{
                startAdornment: <SearchIcon sx={{ mr: 1, color: "#a89cba" }} />,
              }}
              sx={{
                input: { color: "white" },
                bgcolor: "transparent",
              }}
            />

            <Button sx={filterBtn}>Exam: All</Button>
            <Button sx={filterBtn}>Status: Active</Button>
            <IconButton sx={filterBtn}>
              <FilterListIcon />
            </IconButton>
          </Stack>
        </Paper>

        {/* Active Filters */}
        <Stack direction="row" spacing={2} mt={3} alignItems="center">
          <Typography sx={{ color: "#a89cba", fontSize: 13 }}>
            Active Filters:
          </Typography>
          <Chip
            label="Academic Year: 2023-24"
            onDelete={() => {}}
            sx={{
              bgcolor: "rgba(123,37,244,0.2)",
              color: "#c4b5fd",
              border: "1px solid rgba(123,37,244,0.3)",
            }}
          />
          <Button sx={{ color: "#a89cba", fontSize: 12 }}>
            Clear all
          </Button>
        </Stack>

        {/* Table */}
        <TableContainer
          sx={{
            mt: 4,
            borderRadius: 4,
            background: "rgba(20,17,24,0.7)",
            backdropFilter: "blur(12px)",
            border: "1px solid rgba(255,255,255,0.08)",
            color: "white"
          }}
        >
          <Table>
            <TableHead>
              <TableRow sx={{ bgcolor: "rgba(255,255,255,0.05)" }}>
                {[
                  "Student Name",
                  "Contact Info",
                  "Registered Exams",
                  "Last Activity",
                  "Status",
                  "Actions",
                ].map((h) => (
                  <TableCell key={h} sx={{ color: "#a89cba" }}>
                    {h}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>

            <TableBody>
              {students.map((s) => (
                <TableRow key={s.name} hover>
                  <TableCell>
                    <Stack direction="row" spacing={2} alignItems="center">
                      {s.avatar ? (
                        <Avatar src={s.avatar} />
                      ) : (
                        <Avatar sx={{ bgcolor: "#3b0764" }}>
                          {s.initials}
                        </Avatar>
                      )}
                      <Box>
         <Typography
  sx={{
    color: "#ffffff",
    fontWeight: 500,
    lineHeight: 1.2,
  }}
>
  {s.name}
</Typography>

<Typography
  sx={{
    color: "#a89cba",
    fontSize: 12,
    mt: 0.25,
  }}
>
  {s.id}
</Typography>
               
                      </Box>
                    </Stack>
                  </TableCell>

                  <TableCell>
  <Stack spacing={0.5}>
    <Stack direction="row" spacing={1} alignItems="center">
      <MailOutlineIcon sx={{ fontSize: 14, color: "#a89cba" }} />
      <Typography
        sx={{
          color: "#e2e8f0",
          fontSize: 13,
        }}
      >
        {s.email}
      </Typography>
    </Stack>

    <Stack direction="row" spacing={1} alignItems="center">
      <CallIcon sx={{ fontSize: 14, color: "#a89cba" }} />
      <Typography
        sx={{
          color: "#a89cba",
          fontSize: 12,
        }}
      >
        {s.phone}
      </Typography>
    </Stack>
  </Stack>
</TableCell>


                  <TableCell>
                    <Chip label={s.exam} sx={examChip(s.exam)} />
                  </TableCell>

                  <TableCell sx={{ color: "#a89cba" }}>
                    {s.last}
                  </TableCell>

                  <TableCell>
                    <Chip label={s.status} sx={statusChip(s.status)} />
                  </TableCell>

                  <TableCell align="right">
                    <IconButton>
                      <MoreVertIcon sx={{ color: "#a89cba" }} />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {/* Pagination */}
          <Stack
            direction={{ xs: "column", sm: "row" }}
            justifyContent="space-between"
            alignItems="center"
            sx={{ p: 3, borderTop: "1px solid rgba(255,255,255,0.08)" }}
          >
            <Typography fontSize={13} color="#a89cba">
              Showing <b>1–5</b> of <b>256</b> students
            </Typography>

            <Stack direction="row" spacing={2} alignItems="center">
              <Typography fontSize={13} color="#a89cba">
                Rows per page:
              </Typography>
              <Select size="small" defaultValue={10}>
                {[10, 20, 50].map((n) => (
                  <MenuItem key={n} value={n}>
                    {n}
                  </MenuItem>
                ))}
              </Select>
              <IconButton>
                <ChevronLeftIcon />
              </IconButton>
              <IconButton>
                <ChevronRightIcon />
              </IconButton>
            </Stack>
          </Stack>
        </TableContainer>
      </Box>
    </Box>
  );
}

/* ---------- helpers ---------- */

const filterBtn = {
  height: 48,
  px: 2,
  borderRadius: 3,
  bgcolor: "rgba(255,255,255,0.05)",
  border: "1px solid rgba(255,255,255,0.08)",
  color: "white",
};

const examChip = (exam) => ({
  bgcolor:
    exam === "JEE Advanced"
      ? "rgba(168,85,247,0.15)"
      : exam === "NEET Mock"
      ? "rgba(34,211,238,0.15)"
      : exam === "BITSAT Prep"
      ? "rgba(251,146,60,0.15)"
      : exam === "JEE Mains"
      ? "rgba(59,130,246,0.15)"
      : "rgba(255,255,255,0.1)",
  color: "#e5e7eb",
  border: "1px solid rgba(255,255,255,0.15)",
})

const statusChip = (status) => ({
  bgcolor:
    status === "Active"
      ? "rgba(34,197,94,0.15)"
      : status === "Inactive"
      ? "rgba(156,163,175,0.15)"
      : "rgba(239,68,68,0.15)",
  color:
    status === "Active"
      ? "#4ade80"
      : status === "Inactive"
      ? "#9ca3af"
      : "#f87171",
  border: "1px solid rgba(255,255,255,0.15)",
});

const students = [
  {
    name: "Rahul Sharma",
    id: "#ST-2024-001",
    email: "rahul.s@example.com",
    phone: "+91 98765 43210",
    exam: "JEE Advanced",
    last: "Oct 24, 2023",
    status: "Active",
    avatar:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBmo6lOEDsppPYshY9v__FjdAhLW0tg1s5PbTkEscdZ9alG4pagFqOeAlKYRXp4EXGQatk72Hhi6dwpAnkxde68EBsDSY6ZSwSFIXxbtJ4KzNzrYg1bNfg7zjwhTNh3elp75YQH2XbprHNR5K9Z2Uk-P-5NbZUUedTKbh-XcoHX7Gmotd3bl-Qhxyn-y9WYzlKkqWfAwDdTuW4j-gqDcXwLfXnK2R2z-2mrz7cX_4VOeA2Q8B3ClacslD9Zjf9HdAE8-Um-OLL-1qNw",
  },
  {
    name: "Priya Patel",
    id: "#ST-2024-042",
    email: "priya.p@example.com",
    phone: "+91 98765 12345",
    exam: "NEET Mock",
    last: "Oct 22, 2023",
    status: "Active",
    avatar:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDxECemGSaMyQvJZHGHb8o3tIbTa0p4FnLxofMW32cxp3pAXyYkGf5m5CtKQ24zseMz5hvVKLsW5TcRCMSZ14X7oTcjFAmbndL_A6-KOa8MDd3XZJC29Eo6WOjMj-e6-ZnxQZO1Q5XvAnxfe2IQduHvCbnQH4PwMKPUYqI9KW-lZj-3w95llL6a2R4rEy58deEVPSHCWrPROgD6Zq5DvFUXW3NcGtScryRoGTbdjOm_tGV1SWxQeuWN_-1xf8G354JmbdfvlyNLmZ_P",
  },
  {
    name: "Amit Verma",
    id: "#ST-2024-088",
    email: "amit.v@example.com",
    phone: "+91 91234 56789",
    exam: "BITSAT Prep",
    last: "Oct 20, 2023",
    status: "Inactive",
    initials: "AV",
  },
  {
    name: "Sneha Reddy",
    id: "#ST-2024-105",
    email: "sneha.r@example.com",
    phone: "+91 88888 77777",
    exam: "JEE Mains",
    last: "Oct 18, 2023",
    status: "Active",
    avatar:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuB2LXBjsF9i8t3MeKj88HVLziM4HIznQZ85n_5NlWejokSZaft4BGZtd3VRF3bH8GgVX0ESpFuJkfr7Z8AQI10by7dAXkLAaDbzHClOCRqlHtuP1JGP-_j4-_THTrjbVbS2RZjdrFIgSmAQfSzI7GO_dvqfdMWfOohFruPm7qV953UH0Vf19hJzL1B7297ffMzezMT2mglQK-tnhQkG-YnASXRTXiR40HKSdPIczZkkMSCLOIptXRHVpfccz1Z5imXH3tw9EF8lNi_c",
  },
  {
    name: "Vikram Singh",
    id: "#ST-2024-112",
    email: "vikram.s@example.com",
    phone: "+91 77777 66666",
    exam: "Board Exams",
    last: "Oct 15, 2023",
    status: "Suspended",
    avatar:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDhqsJyCnUj9yI9gyl4FZiuw3yJCSGyRIICHkPkH2WpzEtV76vahHsCA4P3Z-EHF3WqZ15hdPBoo1HiThwOOA0UCMEINsksDV5ny03Cm1qSQqVOaCGP2iIpiImPw-1OcqxByV1ppUZ0UV_97n94XgWZWQjouCKLO9FnLrVBXpbOVPD4YvEIIwdqVDaL9X0NDpdtI3YQAieoFPJDD4mUpXr2xJL6Fr6yKQXNqM6FpxodQeuGTLPSNPVC85tn-kKN-tahSWZcvJWWFXbS",
  },
];
