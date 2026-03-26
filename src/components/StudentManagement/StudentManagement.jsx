import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  TextField,
  Select,
  MenuItem,
  FormControl,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  Chip,
  Avatar,
  TableContainer,
  Paper,
  TablePagination,
  InputAdornment,Snackbar,Alert
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useNavigate } from "react-router-dom";
import { useSupabase } from "../../contextProvider/SupabaseProvider";

export default function StudentManagement({ setLoading }) {
  const { user, fetchStudentEnrollmentInfo } = useSupabase();
  const navigate = useNavigate();

  const [enrolledData, setEnrolledData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [examFilter, setExamFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
const [snackbar, setSnackbar] = useState({
  open: false,
  message: "",
  severity: "success", // "success" | "error"
});
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const data = await fetchStudentEnrollmentInfo(user.auth_user_id);
        setEnrolledData(data);
      } catch (err) {
        setSnackbar({
    open: true,
    message: err.message || "Enrolled data fetching error ❌",
    severity: "error",
  });
       
      } finally {
        setLoading(false);
      }
    };
    if (user.auth_user_id) loadData();
  }, [user.auth_user_id]);

  const { enrolledInfo = [], studentInfo = [] } = enrolledData || {};

  const studentMap = studentInfo.reduce((acc, student) => {
    acc[student.id] = student;
    return acc;
  }, {});

  const filteredEnrollments = enrolledInfo.filter((enroll) => {
    const student = studentMap[enroll.user_id] || {};

    const matchesSearch =
      student.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.email?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesExam =
      examFilter === "All" || enroll.exam_name === examFilter;

    const matchesStatus =
      statusFilter === "All" || enroll.status === statusFilter;

    return matchesSearch && matchesExam && matchesStatus;
  });

  useEffect(() => {
    setPage(0);
  }, [searchTerm, examFilter, statusFilter]);

  const paginatedEnrollments = filteredEnrollments.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg, var(--bg-default), var(--surface-1))",
        px: { xs: 2, md: 1 },
        py: 4
      }}
    >
      <Snackbar
  open={snackbar.open}
  autoHideDuration={4000}
  onClose={() => setSnackbar({ ...snackbar, open: false })}
  anchorOrigin={{ vertical: "top", horizontal: "center" }}
>
  <Alert
    severity={snackbar.severity}
    variant="filled"
    onClose={() => setSnackbar({ ...snackbar, open: false })}
  >
    {snackbar.message}
  </Alert>
</Snackbar>
      {/* Header */}
      <Box mb={4}>
        <Typography variant="h4" fontWeight="700">
          Student Directory
        </Typography>
        <Typography variant="body2" sx={{ opacity: 0.7 }}>
          Manage enrollments and monitor exam activity.
        </Typography>
      </Box>

      {/* Search & Filters */}
      <Paper
        elevation={0}
        sx={{
          p: 3,
          mb: 4,
          borderRadius: 4,
          backdropFilter: "blur(20px)",
          background: "rgba(255,255,255,0.04)",
          border: "1px solid var(--border-color)",
          display: "flex",
          gap: 2,
          flexWrap: "wrap"
        }}
      >
        <TextField
          fullWidth
          placeholder="Search students..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ opacity: 0.6 }} />
              </InputAdornment>
            )
          }}
        />

        <FormControl sx={{ minWidth: 160 }}>
          <Select
            value={examFilter}
            onChange={(e) => setExamFilter(e.target.value)}
          >
            <MenuItem value="All">All Exams</MenuItem>
            {[...new Set(enrolledInfo.map(e => e.exam_name))].map((exam) => (
              <MenuItem key={exam} value={exam}>
                {exam}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl sx={{ minWidth: 160 }}>
          <Select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <MenuItem value="All">All Status</MenuItem>
            {[...new Set(enrolledInfo.map(e => e.status))].map((status) => (
              <MenuItem key={status} value={status}>
                {status}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Paper>

      {/* Table */}
      <Paper
        elevation={0}
        sx={{
          borderRadius: 4,
          overflow: "hidden",
          border: "1px solid var(--border-color)",
          background: "rgba(255,255,255,0.03)"
        }}
      >
        <TableContainer>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                {[
                  "Student",
                  "Exam",
                  "Subject",
                  "Purchase Time",
                  "Status",
                  ""
                ].map((h) => (
                  <TableCell
                    key={h}
                    sx={{
                      fontWeight: 600,
                      background: "var(--surface-1)"
                    }}
                  >
                    {h}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>

            <TableBody>
              {paginatedEnrollments.map((enroll) => {
                const student = studentMap[enroll.user_id];

                return (
                  <TableRow
                    key={enroll.id}
                    hover
                    sx={{
                      transition: "0.2s",
                      "&:hover": {
                        backgroundColor: "rgba(255,255,255,0.04)"
                      }
                    }}
                  >
                    <TableCell>
                      <Box display="flex" alignItems="center" gap={2}>
                        <Avatar
                          sx={{
                            bgcolor: "primary.main",
                            fontWeight: "bold"
                          }}
                        >
                          {student?.full_name?.[0] || "?"}
                        </Avatar>
                        <Box>
                          <Typography fontWeight={600}>
                            {student?.full_name || "Unknown"}
                          </Typography>
                          <Typography variant="caption" sx={{ opacity: 0.6 }}>
                            {student?.qualification}
                          </Typography>
                        </Box>
                      </Box>
                    </TableCell>

                    <TableCell>
                      <Chip label={enroll.exam_name} size="small" />
                    </TableCell>

                    <TableCell>
                      <Chip label={enroll.subject_name} size="small" />
                    </TableCell>

                    <TableCell>
                      {new Date(enroll.created_at).toLocaleString()}
                    </TableCell>

                    <TableCell>
                      <Chip
                        label={enroll.status}
                        size="small"
                        color="success"
                        variant="outlined"
                      />
                    </TableCell>

                    <TableCell align="right">
                      <Button
                        onClick={() =>
                          navigate(
                            `/dashboard/studentenrolleddetails/${enroll.user_id}/${enroll.exam_id}/${enroll.subject_id}/${enroll.test_paper_ids}`
                          )
                        }
                      >
                        <MoreVertIcon />
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Modern MUI Pagination */}
        <TablePagination
          component="div"
          count={filteredEnrollments.length}
          page={page}
          onPageChange={(e, newPage) => setPage(newPage)}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={(e) => {
            setRowsPerPage(parseInt(e.target.value, 10));
            setPage(0);
          }}
          rowsPerPageOptions={[5, 10, 20, 50]}
        />
      </Paper>
    </Box>
  );
}