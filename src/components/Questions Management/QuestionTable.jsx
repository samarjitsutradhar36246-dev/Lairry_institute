import React, { useState } from "react";
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
  TableContainer,
  TablePagination,
  Card,
  Snackbar,
  Alert,
} from "@mui/material";

const QuestionTable = ({
  subjectsTestpapersQuestion,
  navigate,
  institute_id,
  deleteSubjectAndTestpaperQuestionData,
  fetchSubjectsTestPapersQuestionsData,
  setSubjectsTestpapersQuestion,
  setLoading,
  selectedTestPaperId,
}) => {
  // ✅ Pagination State
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const { confirm, ConfirmDialog } = useConfirm();
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success", // "success" | "error"
  });

  const questions = subjectsTestpapersQuestion?.QuestionsData || [];

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const handleDelete = async (id) => {
    const ok = await confirm("Are you sure you want to delete?");

    if (ok) {
      {
        setLoading(true);
        await deleteSubjectAndTestpaperQuestionData(id);

        const updatedQuestionData =
          await fetchSubjectsTestPapersQuestionsData(selectedTestPaperId);
        setSubjectsTestpapersQuestion(updatedQuestionData);
        setLoading(false);
        setSnackbar({
          open: true,
          message: "Question deleted successfully ✅",
          severity: "success",
        });
      }
    }
  };

  return (
    <GlassCard>
      <ConfirmDialog />
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
          sx={{
            p: 3,
            borderBottom: "1px solid",
            borderColor: "divider",
            bgcolor: "background.paper",
          }}>
          <Typography fontSize={18} fontWeight={700} color="text.primary">
            All Questions for Test Paper
          </Typography>
        </Box>

        {/* Table */}
        <TableContainer sx={{ overflowX: "auto" }}>
          <Table sx={{ minWidth: 1000 }}>
            <TableHead>
              <TableRow>
                {[
                  "Question",
                  "Options",
                  "Instruction",
                  "Answer",
                  "Positive Mark",
                  "Negative Mark",
                  "Expected Time",
                  "Chapter Name",
                  "Topic Name",
                  "Question Action",
                ].map((h) => (
                  <TableCell
                    key={h}
                    sx={{
                      color: "text.secondary",
                      textTransform: "uppercase",
                      fontSize: 12,
                      fontWeight: 600,
                      borderBottom: "1px solid",
                      borderColor: "divider",
                    }}>
                    {h}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>

            <TableBody>
              {questions
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((question, index) => (
                  <TableRow
                    key={index}
                    hover
                    sx={{
                      "&:hover": {
                        bgcolor: "action.hover",
                      },
                    }}>
                    <TableCell>
                      <Typography
                        color="text.primary"
                        fontWeight={600}
                        fontSize={14}>
                        {question.question_text}
                      </Typography>
                    </TableCell>

                    <TableCell>
                      {question.options && Array.isArray(question.options) ? (
                        <Box component="ul" sx={{ pl: 2, m: 0 }}>
                          {question.options.map((option, index) => (
                            <Box
                              component="li"
                              key={index}
                              sx={{
                                color: "text.secondary",
                                fontSize: 14,
                                lineHeight: 1.6,
                              }}>
                              {option}
                            </Box>
                          ))}
                        </Box>
                      ) : typeof question.options === "string" ? (
                        <Box component="ul" sx={{ pl: 2, m: 0 }}>
                          {question.options.split(",").map((option, index) => (
                            <Box
                              component="li"
                              key={index}
                              sx={{
                                color: "text.secondary",
                                fontSize: 14,
                                lineHeight: 1.6,
                              }}>
                              {option.trim()}
                            </Box>
                          ))}
                        </Box>
                      ) : (
                        "-"
                      )}
                    </TableCell>
                    <TableCell sx={{ color: "text.secondary" }}>
                      {question.question_instruction}
                    </TableCell>

                    <TableCell sx={{ color: "text.secondary" }}>
                      {question.correct_option_s}
                    </TableCell>

                    <TableCell sx={{ color: "text.secondary" }}>
                      {question.positive_mark}
                    </TableCell>

                    <TableCell sx={{ color: "text.secondary" }}>
                      {question.negative_mark}
                    </TableCell>

                    <TableCell sx={{ color: "text.secondary" }}>
                      {question.expected_time_for_each_question}
                    </TableCell>

                    <TableCell sx={{ color: "text.secondary" }}>
                      {question.chapter_name}
                    </TableCell>

                    <TableCell sx={{ color: "text.secondary" }}>
                      {question.topic_name}
                    </TableCell>

                    <TableCell>
                      <Typography
                        component="span"
                        sx={{
                          color: "primary.main",
                          cursor: "pointer",
                          fontWeight: 500,
                          mr: 2,
                          "&:hover": {
                            textDecoration: "underline",
                          },
                        }}
                        onClick={() =>
                          navigate(
                            `/institute/exam/subject/testpaper/update-question/${question.q_id}`,
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
                          "&:hover": {
                            textDecoration: "underline",
                          },
                        }}
                        onClick={() => handleDelete(question.q_id)}>
                        Delete
                      </Typography>
                    </TableCell>
                  </TableRow>
                ))}

              {questions.length === 0 && (
                <TableRow>
                  <TableCell
                    colSpan={10}
                    sx={{
                      color: "text.secondary",
                      textAlign: "center",
                      py: 4,
                    }}>
                    No questions found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Pagination */}
        {questions.length > 0 && (
          <TablePagination
            component="div"
            count={questions.length}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            rowsPerPageOptions={[5, 10, 25]}
          />
        )}
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

export default QuestionTable;
