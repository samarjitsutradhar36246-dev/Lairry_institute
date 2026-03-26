import {
  Box,
  Typography,
  CardContent,
  Stack,
  Chip,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Card,
  TableContainer,
  TablePagination,
  Button,Snackbar, Alert
} from "@mui/material";
import PsychologyIcon from "@mui/icons-material/Psychology";
import ScienceIcon from "@mui/icons-material/Science";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import QuizIcon from "@mui/icons-material/Quiz";
import { useState } from "react";

const ICON_MAP = {
  psychology: <PsychologyIcon fontSize="small" />,
  science: <ScienceIcon fontSize="small" />,
  rocket: <RocketLaunchIcon fontSize="small" />,
  quiz: <QuizIcon fontSize="small" />,
};

const ExamTable = ({
  instituteExamsData,
  navigate,
  institute_id,
  deleteExamData,
  fetchInstituteAndExamData,
  setinstituteExamsData,
  setLoading
}) => {

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const exams = instituteExamsData?.ExamsData || [];

  const paginatedData = exams.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );
const [snackbar, setSnackbar] = useState({
  open: false,
  message: "",
  severity: "success", // "success" | "error"
});
  return (
    <GlassCard>
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
      <CardContent sx={{ p: 0 }}>

        {/* Header */}
        <Box
          sx={{
            p: 3,
            borderBottom: "1px solid",
            borderColor: "divider",
            bgcolor: "background.paper",
          }}
        >
          <Typography fontSize={18} fontWeight={700}>
            All Exams
          </Typography>
        </Box>

        <TableContainer>
          <Table stickyHeader>

            <TableHead>
              <TableRow>
                {[
                  "Exam Name",
                  "Category",
                  "Language",
                  "Status",
                  "Action",
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
              {paginatedData.map((exam) => (
                <TableRow
                  key={exam.id}
                  hover
                  sx={{
                    transition: "0.2s",
                    "&:hover": {
                      backgroundColor: "rgba(255,255,255,0.04)"
                    }
                  }}
                >
                  <TableCell>
                    <Stack direction="row" spacing={2} alignItems="center">
                      <Box
                        sx={{
                          width: 36,
                          height: 36,
                          borderRadius: 2,
                          bgcolor: "action.selected",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: "primary.main",
                        }}
                      >
                        {ICON_MAP[exam.icon] ?? <QuizIcon fontSize="small" />}
                      </Box>

                      <Typography fontWeight={600}>
                        {exam.exam_title}
                      </Typography>
                    </Stack>
                  </TableCell>

                  <TableCell>{exam.exam_category}</TableCell>

                  <TableCell>{exam.language}</TableCell>

                  <TableCell>
                    <Chip
                      label={exam.exam_status}
                      size="small"
                      color={
                        exam.exam_status === "Active"
                          ? "success"
                          : "error"
                      }
                      variant="outlined"
                    />
                  </TableCell>

                  <TableCell>
                    <Button
                      size="small"
                      onClick={() =>
                        navigate(`/institute/update-exams/${exam.id}`)
                      }
                    >
                      Edit
                    </Button>

                    <Button
                      size="small"
                      color="error"
                      onClick={async () => {
                        const confirmDelete = window.confirm(
                          "Are you sure you want to delete this exam?"
                        );
                        if (!confirmDelete) return;

                        try {
                          setLoading(true);
                          await deleteExamData(exam.id, institute_id);
                          setSnackbar({
    open: true,
    message: "Exam deleted successfully ✅",
    severity: "success",
  });
                          const updatedData =
                            await fetchInstituteAndExamData(institute_id);
                          setinstituteExamsData(updatedData);
                        } catch (err) {
                         setSnackbar({
    open: true,
    message: err.message || "Failed to delete exam ❌",
    severity: "error",
  });
                        } finally {
                          setLoading(false);
                        }
                      }}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}

              {exams.length === 0 && (
                <TableRow>
                  <TableCell colSpan={5} align="center" sx={{ py: 4 }}>
                    No exams found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>

          </Table>
        </TableContainer>

        {/* Pagination */}
        <TablePagination
          component="div"
          count={exams.length}
          page={page}
          onPageChange={(e, newPage) => setPage(newPage)}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={(e) => {
            setRowsPerPage(parseInt(e.target.value, 10));
            setPage(0);
          }}
          rowsPerPageOptions={[10, 20, 50]}
        />

      </CardContent>
    </GlassCard>
  );
};

const GlassCard = ({ children, sx }) => (
  <Card
    sx={(theme) => ({
      background:
        theme.palette.mode === "dark"
          ? "rgba(17,24,39,0.7)"
          : theme.palette.background.paper,
      backdropFilter:
        theme.palette.mode === "dark" ? "blur(14px)" : "none",
      border: `1px solid ${theme.palette.divider}`,
      borderRadius: 3,
      ...sx,
    })}
  >
    {children}
  </Card>
);

export default ExamTable;