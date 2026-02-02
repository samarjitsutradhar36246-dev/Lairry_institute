import React, { useEffect, useState } from "react";
import { supabase } from "../../supabase/SupabaseClient";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Stack,
  Chip,
  Button,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
  TextField,
  MenuItem,
} from "@mui/material";
import { Visibility, Download, RocketLaunch, Science } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useInstituteSupabase } from "../../supabase/InstituteSupabaseProvider";

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

export default function Exams() {
  const navigate = useNavigate();
  const { user } = useInstituteSupabase(); // logged-in institute
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [exams, setExams] = useState([]);

  /* ---------------- FETCH EXAMS ---------------- */
  useEffect(() => {
    if (!user) return;

    const fetchExams = async () => {
      try {
        // Step 1: Get institute data (to get exam IDs)
        const { data: instData, error: instError } = await supabase
          .from("institutes_data")
          .select("institute_id, exam_ids")
          .eq("institute_id", user.auth_user_id)
          .maybeSingle();

        if (instError) throw instError;
        if (!instData || !instData.exam_ids?.length) {
          setExams([]);
          return;
        }

        // Step 2: Fetch exams from institute_exams_data using exam_ids
        const { data: examsData, error: examsError } = await supabase
          .from("institute_exams_data")
          .select("id, exam_title, exam_category, duration_minutes")
          .in("id", instData.exam_ids);

        if (examsError) throw examsError;

        const mappedExams = examsData.map((exam) => ({
          id: exam.id,
          name: exam.exam_title,
          category: exam.exam_category,
          duration: `${exam.duration_minutes} min`,
          marks: 0,
          // batch: exam.batch_name || "N/A",
          status: exam.status || "Live",
          color: exam.status === "Live" ? "#22c55e" : "#64748b",
          icon: <Science />,
        }));

        setExams(mappedExams);
      } catch (err) {
        console.error("Error fetching exams:", err);
      }
    };

    fetchExams();
  }, [user]);

  /* ---------------- FILTERED EXAMS ---------------- */
  const filteredExams = exams.filter(
    (exam) =>
      exam.name.toLowerCase().includes(search.toLowerCase()) &&
      (statusFilter === "All" || exam.status === statusFilter)
  );

  return (
    <Box
      sx={{
        // background:
        //   "radial-gradient(circle at top left, rgba(19,127,236,0.15), transparent 40%), radial-gradient(circle at bottom right, rgba(168,85,247,0.15), transparent 40%), #050a10",
        // px: { xs: 2, md: 4 },
        py: { xs: 2, md: 3 },
      }}
    >
      <Box maxWidth="1400px" mx="auto" display="flex" flexDirection="column" gap={3}>
        {/* ---------------- HEADER ---------------- */}
        <Stack
          direction={{ xs: "column", sm: "row" }}
          justifyContent="space-between"
          alignItems="center"
          spacing={2}
        >
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
              sx={{
    bgcolor: "#0f1520",
    borderRadius: 1,
    "& .MuiInputLabel-root": { color: "#94a3b8" },
    "& .MuiInputLabel-root.Mui-focused": { color: "#fff" },
    "& .MuiFilledInput-input": { color: "#fff" },
  }}

          />
          <TextField
            size="small"
            select
            label="Status"
            variant="filled"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
  sx={{
    bgcolor: "#0f1520",
    borderRadius: 1,
    "& .MuiInputLabel-root": { color: "#94a3b8" },
    "& .MuiInputLabel-root.Mui-focused": { color: "#fff" },
    "& .MuiFilledInput-input": { color: "#fff" },
  }}
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
                    {["Exam Name", "Category", "Duration", "Marks", "Status", "Action"].map(
                      (h) => (
                        <TableCell
                          key={h}
                          sx={{
                            color: "#94a3b8",
                            textTransform: "uppercase",
                            fontSize: 12,
                            fontWeight: 600,
                          }}
                        >
                          {h}
                        </TableCell>
                      )
                    )}
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
                      <TableCell sx={{ color: "#94a3b8" }}>{exam.category}</TableCell>
                      <TableCell sx={{ color: "#94a3b8" }}>{exam.duration}</TableCell>
                      <TableCell sx={{ color: "#94a3b8" }}>{exam.marks}</TableCell>
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
                      <TableCell colSpan={6} sx={{ color: "#94a3b8", textAlign: "center" }}>
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
