import React from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Chip,
  Button,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  LinearProgress,
  Stack,
  IconButton,
  TextField,
  MenuItem,
} from "@mui/material";
import {
  Science,
  Calculate,
  Psychology,
  HistoryEdu,
  Visibility,
  Download,
  RocketLaunch,
  PlayCircleOutline,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

/* ---------------- GLASS CARD ---------------- */
const GlassCard = ({ children, sx }) => (
  <Card
    sx={{
      background: "rgba(15,21,32,0.75)",
      backdropFilter: "blur(14px)",
      border: "1px solid rgba(255,255,255,0.08)",
      borderRadius: 3,
      color: "#e5e7eb",
      ...sx,
    }}
  >
    {children}
  </Card>
);

/* ---------------- DUMMY EXAMS ---------------- */
const dummyExams = [
  {
    id: 1,
    icon: <Science />,
    name: "JEE Advanced Mock 4",
    batch: "Batch A, B",
    date: "Oct 24, 2023",
    duration: "3h",
    marks: 360,
    students: 50,
    status: "Live",
    color: "#22c55e",
  },
  {
    id: 2,
    icon: <Calculate />,
    name: "Class 12 Math Term 1",
    batch: "Batch C",
    date: "Oct 22, 2023",
    duration: "2h",
    marks: 100,
    students: 40,
    status: "Completed",
    color: "#64748b",
  },
  {
    id: 3,
    icon: <Psychology />,
    name: "AI Aptitude Test",
    batch: "All Batches",
    date: "Oct 20, 2023",
    duration: "1.5h",
    marks: 50,
    students: 60,
    status: "Completed",
    color: "#64748b",
  },
  {
    id: 4,
    icon: <HistoryEdu />,
    name: "History Weekly Quiz",
    batch: "Batch A",
    date: "Oct 18, 2023",
    duration: "1h",
    marks: 30,
    students: 20,
    status: "Completed",
    color: "#64748b",
  },
];

/* ---------------- EXAMS PAGE ---------------- */
export default function Exams() {
  const navigate = useNavigate();
  const [search, setSearch] = React.useState("");
  const [statusFilter, setStatusFilter] = React.useState("All");

  const filteredExams = dummyExams.filter(
    (exam) =>
      exam.name.toLowerCase().includes(search.toLowerCase()) &&
      (statusFilter === "All" || exam.status === statusFilter)
  );

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background:
          "radial-gradient(circle at top left, rgba(19,127,236,0.15), transparent 40%), radial-gradient(circle at bottom right, rgba(168,85,247,0.15), transparent 40%), #050a10",
        px: { xs: 2, md: 4 },
        py: { xs: 2, md: 3 },
      }}
    >
      <Box maxWidth="1400px" mx="auto" display="flex" flexDirection="column" gap={3}>
        {/* ---------------- HEADER ---------------- */}
        <Stack direction={{ xs: "column", sm: "row" }} justifyContent="space-between" alignItems="center" spacing={2}>
          <Box>
            <Typography variant="h4" fontWeight={700} color="white">
              Exams Overview
            </Typography>
            <Typography color="#94a3b8" fontSize={14}>
              Manage, view, and launch exams for your institute.
            </Typography>
          </Box>
          <Button
            variant="contained"
            color="primary"
            startIcon={<RocketLaunch />}
            onClick={() => navigate("/institute/exams/create")}
          >
            Launch New Exam
          </Button>
        </Stack>

        {/* ---------------- FILTERS ---------------- */}
        <Stack direction={{ xs: "column", sm: "row" }} spacing={2} alignItems="center">
          <TextField
            size="small"
            label="Search Exam"
            variant="filled"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            sx={{ bgcolor: "#0f1520", borderRadius: 1, input: { color: "white" } }}
          />
          <TextField
            size="small"
            select
            label="Status"
            variant="filled"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            sx={{ bgcolor: "#0f1520", borderRadius: 1, input: { color: "white" } }}
          >
            {["All", "Live", "Completed"].map((s) => (
              <MenuItem key={s} value={s}>
                {s}
              </MenuItem>
            ))}
          </TextField>
        </Stack>

        {/* ---------------- EXAMS TABLE ---------------- */}
        <GlassCard>
          <CardContent sx={{ p: 0 }}>
            <Box sx={{ p: 3, borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
              <Typography fontSize={18} fontWeight={700} color="white">
                All Exams
              </Typography>
            </Box>
            <Box sx={{ overflowX: "auto" }}>
              <Table sx={{ minWidth: 700 }}>
                <TableHead>
                  <TableRow>
                    {["Exam Name", "Batch", "Date", "Duration", "Marks", "Students", "Status", "Action"].map((h) => (
                      <TableCell
                        key={h}
                        sx={{ color: "#94a3b8", textTransform: "uppercase", fontSize: 12, fontWeight: 600 }}
                      >
                        {h}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredExams.map((exam) => (
                    <TableRow key={exam.id} hover>
                      <TableCell>
                        <Stack direction="row" spacing={2} alignItems="center">
                          <Box
                            sx={{
                              width: 36,
                              height: 36,
                              borderRadius: 1,
                              bgcolor: "rgba(255,255,255,0.08)",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              flexShrink: 0,
                            }}
                          >
                            {exam.icon}
                          </Box>
                          <Box>
                            <Typography color="white" fontWeight={600} fontSize={14}>
                              {exam.name}
                            </Typography>
                          </Box>
                        </Stack>
                      </TableCell>
                      <TableCell sx={{ color: "#94a3b8" }}>{exam.batch}</TableCell>
                      <TableCell sx={{ color: "#94a3b8" }}>{exam.date}</TableCell>
                      <TableCell sx={{ color: "#94a3b8" }}>{exam.duration}</TableCell>
                      <TableCell sx={{ color: "#94a3b8" }}>{exam.marks}</TableCell>
                      <TableCell sx={{ color: "#94a3b8" }}>{exam.students}</TableCell>
                      <TableCell>
                        <Chip
                          label={exam.status}
                          size="small"
                          sx={{
                            bgcolor: `${exam.color}20`,
                            color: exam.color,
                            fontWeight: 600,
                          }}
                        />
                      </TableCell>
                      <TableCell align="right">
                        <IconButton size="small" sx={{ color: "#94a3b8" }}>
                          {exam.status === "Live" ? <Visibility /> : <Download />}
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                  {filteredExams.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={8} sx={{ color: "#94a3b8", textAlign: "center" }}>
                        No exams found
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </Box>
          </CardContent>
        </GlassCard>
      </Box>
    </Box>
  );
}
