import React, { useState, useMemo } from "react";
import { useConfirm } from "../../utilities/useConfirm";
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
  Snackbar,
  Alert,
} from "@mui/material";
import LoadingDialog from "../Loading Screen/LoadingDialog";

const TestpaperTable = ({
  subjectsTestpaper,
  navigate,
  deleteSubjectAndTestpaperData,
  fetchSubjectsTestPapersData,
  setSubjectsTestpaper,

  selectedSubjectId,
}) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  const [loading, setLoading] = useState(false);
  const testpapers = subjectsTestpaper?.TestPapersData ?? [];

  // Pagination Logic
  const paginatedData = useMemo(() => {
    return testpapers.slice(
      page * rowsPerPage,
      page * rowsPerPage + rowsPerPage,
    );
  }, [testpapers, page, rowsPerPage]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const { confirm, ConfirmDialog } = useConfirm();

  const handleDelete = async (id) => {
    const ok = await confirm("Are you sure you want to delete?");

    if (ok) {
      {
        setLoading(true);
        await deleteSubjectAndTestpaperData(id);
        const updatedData =
          await fetchSubjectsTestPapersData(selectedSubjectId);
        setSubjectsTestpaper(updatedData);
        setLoading(false);
        setSnackbar({
          open: true,
          message: "Test paper deleted succesfully ✅",
          severity: "success",
        });
      }
    }
  };
  return (
    <GlassCard>
      <LoadingDialog open={loading} />
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}>
        <Alert
          severity={snackbar.severity}
          variant="filled"
          onClose={() => setSnackbar({ ...snackbar, open: false })}>
          {snackbar.message}
        </Alert>
      </Snackbar>
      <CardContent sx={{ p: 0 }}>
        {/* Header */}
        <Box
          sx={(theme) => ({
            p: 3,
            borderBottom: `1px solid ${theme.palette.divider}`,
          })}>
          <Typography fontSize={18} fontWeight={700}>
            All Test Papers
          </Typography>
        </Box>

        {/* Table */}
        <TableContainer>
          <Table sx={{ minWidth: 1200 }}>
            <TableHead>
              <TableRow>
                {[
                  "Test Name",
                  "Descriptions",
                  "Rules",
                  "Marking",
                  "Total Marks",
                  "Time",
                  "Language",
                  "Difficulty",
                  "Status",
                  "Testpaper Action",
                ].map((h) => (
                  <TableCell
                    key={h}
                    sx={(theme) => ({
                      color: theme.palette.text.secondary,
                      fontSize: 12,
                      fontWeight: 600,
                      borderBottom: `1px solid ${theme.palette.divider}`,
                    })}>
                    {h}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>

            <TableBody>
              {paginatedData.map((testpaper) => (
                <TableRow
                  key={testpaper.id}
                  hover
                  sx={(theme) => ({
                    "&:hover": {
                      backgroundColor:
                        theme.palette.mode === "dark"
                          ? "rgba(59,130,246,0.05)"
                          : "rgba(37,99,235,0.04)",
                    },
                  })}>
                  <TableCell>
                    <Typography fontWeight={600} fontSize={14}>
                      {testpaper.test_paper_name}
                    </Typography>
                  </TableCell>

                  <TableCell sx={{ color: "text.secondary", fontSize: 13 }}>
                    {testpaper.test_paper_description}
                  </TableCell>

                  <TableCell sx={{ color: "text.secondary", fontSize: 13 }}>
                    {testpaper.test_paper_rules}
                  </TableCell>

                  <TableCell sx={{ color: "text.secondary", fontSize: 13 }}>
                    {testpaper.test_paper_marking_scheme}
                  </TableCell>

                  <TableCell sx={{ color: "text.secondary", fontSize: 13 }}>
                    {testpaper.total_marks}
                  </TableCell>

                  <TableCell sx={{ color: "text.secondary", fontSize: 13 }}>
                    {testpaper.total_time_per_test_paper_in_minute}
                  </TableCell>

                  <TableCell sx={{ color: "text.secondary", fontSize: 13 }}>
                    {testpaper.test_paper_language}
                  </TableCell>

                  <TableCell sx={{ color: "text.secondary", fontSize: 13 }}>
                    {testpaper.test_paper_difficulty}
                  </TableCell>

                  <TableCell>
                    <Chip
                      label={testpaper.test_paper_status}
                      size="small"
                      sx={(theme) => ({
                        fontWeight: 600,
                        bgcolor:
                          testpaper.test_paper_status === "Active"
                            ? theme.palette.mode === "dark"
                              ? "rgba(34,197,94,0.15)"
                              : "rgba(22,163,74,0.1)"
                            : theme.palette.mode === "dark"
                              ? "rgba(239,68,68,0.15)"
                              : "rgba(220,38,38,0.1)",
                        color:
                          testpaper.test_paper_status === "Active"
                            ? theme.palette.success.main
                            : theme.palette.error.main,
                      })}
                    />
                  </TableCell>

                  <TableCell>
                    <Typography
                      component="span"
                      sx={{
                        color: "primary.main",
                        cursor: "pointer",
                        fontWeight: 500,
                        mr: 2,
                        "&:hover": { textDecoration: "underline" },
                      }}
                      onClick={() =>
                        navigate(
                          `/institute/exam/subject/update-testpaper/${testpaper.id}`,
                        )
                      }>
                      Edit
                    </Typography>

                    <Typography
                      component="span"
                      sx={{
                        color: "error.main",
                        cursor: "pointer",
                        fontWeight: 500,
                        "&:hover": { textDecoration: "underline" },
                      }}
                      onClick={() => handleDelete(testpaper.id)}>
                      Delete
                    </Typography>
                    <ConfirmDialog />
                  </TableCell>
                </TableRow>
              ))}

              {testpapers.length === 0 && (
                <TableRow>
                  <TableCell
                    colSpan={10}
                    sx={{ textAlign: "center", color: "text.secondary" }}>
                    No test papers found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Pagination */}
        <TablePagination
          component="div"
          count={testpapers.length}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          rowsPerPageOptions={[5, 10, 20, 50]}
          sx={(theme) => ({
            borderTop: `1px solid ${theme.palette.divider}`,
          })}
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
      backdropFilter: theme.palette.mode === "dark" ? "blur(14px)" : "none",
      border: `1px solid ${theme.palette.divider}`,
      borderRadius: 3,
      color: theme.palette.text.primary,
      ...sx,
    })}>
    {children}
  </Card>
);

export default TestpaperTable;
