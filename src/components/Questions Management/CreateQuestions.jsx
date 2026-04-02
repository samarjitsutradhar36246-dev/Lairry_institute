import { useSupabase } from "../../contextProvider/SupabaseProvider";
import { useState, useEffect } from "react";
import QuestionCSVActions from "./QuestionCSVActions";

import {
  Container,
  Box,
  Card,
  Typography,
  TextField,
  Button,
  Tabs,
  Tab,
  Grid,
  Stack,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Snackbar,
  Alert,
  FormHelperText,
  Radio,
} from "@mui/material";

import LoadingDialog from "../Loading Screen/LoadingDialog";

export default function CreateQuestions() {
  const {
    user,
    fetchTestpaperIdAndName,
    createQuestionForTestpaper,
    fetchSubjectsTestPapersQuestionsData,
  } = useSupabase();

  const [instituteTestPapersData, setInstituteTestPapersData] = useState([]);
  const [selectedTestPaperId, setSelectedTestPaperId] = useState("");
  const [loading, setLoading] = useState(false);
  const [questionType, setQuestionType] = useState("MCQ");

  const [testData, setTestData] = useState(null);
  const [questionCount, setQuestionCount] = useState(0);
  const [marksCount, setMarksCount] = useState(0);

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  // ✅ Track which fields have been "touched" for validation
  const [touched, setTouched] = useState(false);

  const initialState = {
    question_text: "",
    options: [],
    question_instruction: "MCQ",
    correct_option_s: "",
    positive_mark: "",
    negative_mark: "",
    expected_time_for_each_question: "",
    chapter_name: "",
    topic_name: "",
  };

  const [formData, setFormData] = useState(initialState);
  const [questions, setQuestions] = useState([initialState]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const OPTION_KEYS = ["A", "B", "C", "D"];

  useEffect(() => {
    const loadExamdata = async () => {
      try {
        setLoading(true);
        const data = await fetchTestpaperIdAndName(user.auth_user_id);
        setSnackbar({
          open: true,
          message: "Test Paper Data Fetched successfully ✅",
          severity: "success",
        });
        setInstituteTestPapersData(data?.TestPapersData || []);
      } catch (err) {
        setSnackbar({
          open: true,
          message: err.message || "Failed to create exam ❌",
          severity: "error",
        });
      } finally {
        setLoading(false);
      }
    };
    if (user?.auth_user_id) loadExamdata();
  }, [user?.auth_user_id]);

  useEffect(() => {
    if (!selectedTestPaperId) {
      setTestData(null);
      setQuestionCount(0);
      return;
    }
    const loadTestpaperQuestiondata = async () => {
      try {
        const data =
          await fetchSubjectsTestPapersQuestionsData(selectedTestPaperId);
        if (!data?.QuestionsData) return;
        setQuestionCount(data?.QuestionsData?.length);
      } catch (err) {
        setSnackbar({
          open: true,
          message: err.message || "Failed to fetch question data ❌",
          severity: "error",
        });
      } finally {
        setLoading(false);
      }
    };
    loadTestpaperQuestiondata();
  }, [selectedTestPaperId]);
  console.log(questionCount);
  const handleChange = (key, value) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleTabChange = (e, newValue) => {
    setQuestionType(newValue);
    setFormData((prev) => ({
      ...prev,
      question_instruction: newValue,
      options: newValue === "Numerical" ? [] : prev.options,
    }));
  };

  // ✅ Per-field error checkers
  const errors = {
    question_text: touched && !formData.question_text.trim(),
    options:
      touched &&
      questionType === "MCQ" &&
      (!formData.options ||
        formData.options.filter((o) => o?.trim()).length < 4),
    correct_option_s: touched && !formData.correct_option_s.trim(),
    positive_mark: touched && !formData.positive_mark.trim(),
    negative_mark: touched && !formData.negative_mark.trim(),
    expected_time_for_each_question:
      touched && !formData.expected_time_for_each_question.trim(),
    chapter_name: touched && !formData.chapter_name.trim(),
    topic_name: touched && !formData.topic_name.trim(),
    selectedTestPaperId: touched && !selectedTestPaperId,
  };

  const validateForm = () => {
    if (!formData.question_text.trim()) return false;
    if (
      questionType === "MCQ" &&
      (!formData.options ||
        formData.options.filter((o) => o?.trim()).length < 2)
    )
      return false;
    if (!formData.correct_option_s.trim()) return false;
    if (!formData.positive_mark.trim()) return false;
    if (!formData.negative_mark.trim()) return false;
    if (!formData.expected_time_for_each_question.trim()) return false;
    if (!formData.chapter_name.trim()) return false;
    if (!formData.topic_name.trim()) return false;
    return true;
  };

  const handleCreateQuestionsWithData = async (questionsData) => {
    if (!selectedTestPaperId) return;

    if (questionsData.length < testData.total_questions_per_test_paper) {
      setSnackbar({
        open: true,
        message: `Please fill all ${testData.total_questions_per_test_paper} questions. Only ${questionsData.length} added ❌`,
        severity: "error",
      });
      return;
    }

    try {
      setLoading(true);
      for (const q of questionsData) {
        await createQuestionForTestpaper({
          ...q,
          test_paper_id: selectedTestPaperId,
          options: Array.isArray(q.options) ? q.options : [],
          correct_option_s: [q.correct_option_s],
          negative_mark: q.negative_mark
            ? String(-Math.abs(Number(q.negative_mark)))
            : "",
        });
      }
      setSnackbar({
        open: true,
        message: `${questionsData.length} questions created successfully ✅`,
        severity: "success",
      });
      setFormData(initialState);
      setQuestions([{ ...initialState }]);
      setCurrentIndex(0);
      setTouched(false);
      setQuestionCount((prev) => prev + questionsData.length); // ✅ sirf ye line add ki
    } catch (err) {
      setSnackbar({
        open: true,
        message: "Error occurred in creating questions ❌",
        severity: "error",
      });
    } finally {
      setLoading(false);
    }
  };
  console.log(testData);
  return (
    <Container
      maxWidth="xl"
      sx={(theme) => ({
        py: 4,
        minHeight: "100vh",
        backgroundColor: theme.palette.background.default,
      })}>
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

      {/* HEADER */}
      <Box mb={3}>
        <Typography
          variant="h4"
          fontWeight={800}
          sx={(theme) => ({ color: theme.palette.text.primary })}>
          Create New Question
        </Typography>
        <Typography variant="body2" color="text.secondary" mt={1}>
          Configure the essential questions for your upcoming examination.
        </Typography>
      </Box>

      {/* ACTION BAR */}
      <Card
        sx={(theme) => ({
          p: 2,
          mb: 4,
          backgroundColor: theme.palette.background.paper,
        })}>
        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={2}
          alignItems={{ xs: "stretch", md: "center" }}
          justifyContent="space-between">
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={2}
            flexWrap="wrap"
            width="100%">
            <QuestionCSVActions
              selectedTestPaperId={selectedTestPaperId}
              createQuestionForTestpaper={createQuestionForTestpaper}
              setLoading={setLoading}
              loading={loading}
            />
          </Stack>

          <Button
            variant="contained"
            size="large"
            disabled={!selectedTestPaperId}
            sx={{
              minWidth: 200,
              fontWeight: 600,
              borderRadius: 2,
              textTransform: "none",
            }}
            onClick={() => handleCreateQuestionsWithData(questions)}>
            Create Questions
          </Button>
        </Stack>
      </Card>

      {/* SELECT TEST PAPER */}
      <Card sx={{ p: 3, mb: 3 }}>
        <Typography fontWeight={700} mb={2}>
          Choose your Test Paper
        </Typography>

        {/* ✅ FormControl gets error prop */}
        <FormControl fullWidth size="small" error={errors.selectedTestPaperId}>
          <InputLabel>Select Test Paper</InputLabel>
          <Select
            value={selectedTestPaperId}
            label="Select Test Paper"
            onChange={(e) => {
              const selectedId = e.target.value;
              setSelectedTestPaperId(selectedId);
              const selectedTestDetails = instituteTestPapersData.find(
                (tp) => tp.id === selectedId,
              );
              setTestData(selectedTestDetails || null); // ✅ Safe, no re-render issue
            }}>
            {instituteTestPapersData.map((tp) => (
              <MenuItem key={tp.id} value={tp.id}>
                {tp.test_paper_name}
              </MenuItem>
            ))}
          </Select>
          {errors.selectedTestPaperId && (
            <FormHelperText>Please select a test paper</FormHelperText>
          )}
        </FormControl>
        {instituteTestPapersData
          .filter((tp) => tp.id === selectedTestPaperId)
          .map((tp) => (
            <Grid
              key={tp.id}
              value={tp.id}
              size={{ xs: 12, md: 6 }}
              sx={{ mt: 3, display: "flex" }}
              className=" justify-between">
              <TextField label="Total Marks" value={tp.total_marks} disabled />
              <TextField
                label="Total time"
                value={
                  tp.total_time_per_test_paper_in_minute *
                  tp.total_questions_per_test_paper
                }
                disabled
              />
              <TextField
                label="Total Questions"
                value={tp.total_questions_per_test_paper}
                disabled
              />
            </Grid>
          ))}
      </Card>

      {/* QUESTION FORM */}

      {!selectedTestPaperId ? (
        // Show nothing or a prompt to select a test paper
        <Box>
          <Typography
            variant="body1"
            color="text.secondary"
            align="center"
            mt={5}>
            Please select a test paper to get started.
          </Typography>
        </Box>
      ) : questionCount >= testData?.total_questions_per_test_paper ? (
        <Box>
          <Typography variant="h6" color="text.secondary" align="center" mt={5}>
            All questions for this test paper have been created. So You cannot
            create more question for this test paper. If you want to create more
            question then go to create test paper page and increase the number
            of questions for this test paper.
          </Typography>
        </Box>
      ) : (
        <>
          <Card sx={{ p: 3 }}>
            <Typography fontWeight={700} mb={2}>
              Question {currentIndex + 1} of {questions.length}
            </Typography>

            <TextField
              fullWidth
              label="Enter Question"
              value={formData.question_text}
              onChange={(e) => handleChange("question_text", e.target.value)}
              sx={{ mb: 3 }}
              error={errors.question_text} // ✅
              helperText={
                errors.question_text ? "Question text is required" : ""
              }
            />

            <Tabs
              value={questionType}
              onChange={handleTabChange}
              sx={(theme) => ({
                mb: 3,
                borderBottom: `1px solid ${theme.palette.divider}`,
                "& .MuiTab-root": { color: theme.palette.text.secondary },
                "& .Mui-selected": {
                  color: theme.palette.primary.main,
                  fontWeight: 600,
                },
              })}>
              <Tab label="MCQ" value="MCQ" />
              <Tab label="Numerical" value="Numerical" />
            </Tabs>

            {questionType === "MCQ" && (
              <>
                <Grid container spacing={2} sx={{ mb: 1 }}>
                  {OPTION_KEYS.map((opt, idx) => (
                    <Grid size={{ xs: 12, md: 6 }} key={opt}>
                      <Box
                        sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                        {/* Radio button — clicking it sets correct_option_s to this option's text */}
                        <Radio
                          checked={
                            !!formData.options[idx]?.trim() &&
                            formData.correct_option_s === formData.options[idx]
                          }
                          onChange={() => {
                            if (formData.options[idx]?.trim()) {
                              handleChange(
                                "correct_option_s",
                                formData.options[idx],
                              );
                            }
                          }}
                          value={formData.options[idx] || ""}
                          disabled={!formData.options[idx]?.trim()}
                          color="primary"
                          title={`Mark Option ${opt} as correct`}
                        />
                        <TextField
                          fullWidth
                          label={`Option ${opt}`}
                          value={formData.options[idx] || ""}
                          onChange={(e) => {
                            const updated = [...formData.options];
                            updated[idx] = e.target.value;
                            handleChange("options", updated);

                            // If this option was selected as correct, keep correct_option_s in sync
                            if (
                              formData.correct_option_s ===
                              formData.options[idx]
                            ) {
                              handleChange("correct_option_s", e.target.value);
                            }
                          }}
                          error={
                            errors.options && !formData.options[idx]?.trim()
                          }
                          helperText={
                            errors.options && !formData.options[idx]?.trim()
                              ? "Required"
                              : ""
                          }
                        />
                      </Box>
                    </Grid>
                  ))}
                </Grid>
                {errors.options && (
                  <Typography
                    variant="caption"
                    color="error"
                    sx={{ mb: 2, display: "block" }}>
                    Fill all the options
                  </Typography>
                )}
                <Typography
                  variant="caption"
                  color="text.secondary"
                  sx={{ mb: 2, display: "block" }}>
                  💡 Click the radio button next to the correct option to
                  auto-fill the answer.
                </Typography>
              </>
            )}

            <Grid container spacing={2}>
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  fullWidth
                  label="Question Instruction"
                  value={formData.question_instruction}
                  disabled
                />
              </Grid>

              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  fullWidth
                  label="Correct Answer"
                  value={formData.correct_option_s}
                  onChange={
                    questionType === "Numerical"
                      ? (e) => handleChange("correct_option_s", e.target.value)
                      : undefined // MCQ: read-only, set via radio
                  }
                  InputProps={{
                    readOnly: questionType === "MCQ",
                  }}
                  placeholder={
                    questionType === "MCQ"
                      ? "Auto-filled when you select a radio button"
                      : "Type the correct numerical answer"
                  }
                  error={errors.correct_option_s}
                  helperText={
                    errors.correct_option_s
                      ? "Correct answer is required"
                      : questionType === "MCQ"
                        ? "Select a radio button above to auto-fill"
                        : ""
                  }
                />
              </Grid>
            </Grid>

            <Grid container spacing={2} sx={{ mt: 1 }}>
              <Grid size={{ xs: 12, md: 4 }}>
                <TextField
                  fullWidth
                  type="number"
                  label="Positive Mark"
                  value={formData.positive_mark}
                  onChange={(e) => {
                    const val = Math.max(0, Number(e.target.value));
                    handleChange("positive_mark", String(val));
                  }}
                  error={errors.positive_mark} // ✅
                  helperText={
                    errors.positive_mark
                      ? "Positive mark is required"
                      : "Only positive numbers allowed"
                  }
                  InputProps={{
                    inputProps: { min: 0, max: 100, step: 1 },
                    onKeyDown: (e) => {
                      if (e.key === "-" || e.key === "e") e.preventDefault();
                    },
                  }}
                />
              </Grid>

              <Grid size={{ xs: 12, md: 4 }}>
                <TextField
                  fullWidth
                  label="Negative Mark"
                  type="number"
                  value={formData.negative_mark}
                  onChange={(e) => {
                    const raw = Math.abs(Number(e.target.value));
                    handleChange(
                      "negative_mark",
                      raw === 0 ? "" : String(-raw),
                    );
                  }}
                  error={errors.negative_mark} // ✅
                  helperText={
                    errors.negative_mark
                      ? "Negative mark is required"
                      : "Only numbers are allowed"
                  }
                  InputProps={{
                    inputProps: { min: -10, max: 0, step: 1 },
                    onKeyDown: (e) => {
                      if (e.key === "e") e.preventDefault();
                    },
                  }}
                />
              </Grid>

              <Grid size={{ xs: 12, md: 4 }}>
                <TextField
                  fullWidth
                  label="Expected Time for Each Question In Seconds"
                  type="number"
                  value={formData.expected_time_for_each_question}
                  onChange={(e) =>
                    handleChange(
                      "expected_time_for_each_question",
                      e.target.value,
                    )
                  }
                  error={errors.expected_time_for_each_question} // ✅
                  helperText={
                    errors.expected_time_for_each_question
                      ? "Expected time is required"
                      : "Only numbers are allowed"
                  }
                  InputProps={{
                    inputProps: { min: 0, max: 200, step: 1 },
                    onKeyDown: (e) => {
                      if (e.key === "-" || e.key === "e") e.preventDefault();
                    },
                  }}
                />
              </Grid>
            </Grid>

            <Grid container spacing={2} sx={{ mt: 1 }}>
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  fullWidth
                  label="Chapter Name"
                  value={formData.chapter_name}
                  onChange={(e) => handleChange("chapter_name", e.target.value)}
                  error={errors.chapter_name} // ✅
                  helperText={
                    errors.chapter_name ? "Chapter name is required" : ""
                  }
                />
              </Grid>

              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  fullWidth
                  label="Topic Name"
                  value={formData.topic_name}
                  onChange={(e) => handleChange("topic_name", e.target.value)}
                  error={errors.topic_name} // ✅
                  helperText={errors.topic_name ? "Topic name is required" : ""}
                />
              </Grid>
            </Grid>
          </Card>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 1,
              mt: 5,
            }}>
            {testData && (
              <Typography
                variant="caption"
                color={
                  questions.length >= testData.total_questions_per_test_paper
                    ? "success.main"
                    : "text.secondary"
                }>
                {questions.filter((q) => q.question_text.trim()).length} /{" "}
                {testData.total_questions_per_test_paper} questions filled
              </Typography>
            )}

            <Box
              sx={{ display: "flex", justifyContent: "center", gap: 5, mt: 5 }}>
              {/* PREVIOUS BUTTON */}
              <Button
                variant="contained"
                disabled={currentIndex === 0}
                onClick={() => {
                  const updated = [...questions];
                  updated[currentIndex] = formData;
                  setQuestions(updated);

                  const prevIndex = currentIndex - 1;
                  setCurrentIndex(prevIndex);
                  setFormData(updated[prevIndex]);
                  setTouched(false);
                }}>
                ← Previous Question
              </Button>

              {/* NEXT or FINISH BUTTON */}
              {testData &&
              currentIndex === testData.total_questions_per_test_paper - 1 ? (
                // ✅ On last question — show Save & Finish instead
                <Button
                  variant="contained"
                  color="success"
                  onClick={() => {
                    setTouched(true);
                    if (!validateForm()) return;

                    // ✅ Save the last question into the array
                    const updated = [...questions];
                    updated[currentIndex] = formData;
                    setQuestions(updated);

                    // ✅ Now submit — use updated directly since setQuestions is async
                    handleCreateQuestionsWithData(updated);
                  }}>
                  Save & Finish ✅
                </Button>
              ) : (
                // ✅ Normal Next Question button
                <Button
                  variant="contained"
                  onClick={() => {
                    setTouched(true);
                    if (!validateForm()) return;

                    const updated = [...questions];
                    updated[currentIndex] = formData;

                    // ✅ Push new blank slot only if next slot doesn't exist yet
                    if (currentIndex + 1 === updated.length) {
                      updated.push({ ...initialState });
                    }

                    setQuestions(updated);
                    console.log(updated);

                    const nextIndex = currentIndex + 1;
                    setCurrentIndex(nextIndex);
                    setFormData(updated[nextIndex]);
                    setTouched(false);
                  }}>
                  Next Question →
                </Button>
              )}
            </Box>
          </Box>
        </>
      )}
    </Container>
  );
}
