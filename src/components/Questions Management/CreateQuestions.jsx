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
} from "@mui/material";

import LoadingDialog from "../Loading Screen/LoadingDialog";

export default function CreateQuestions() {
  const { user, fetchTestpaperIdAndName, createQuestionForTestpaper } =
    useSupabase();

  const [instituteTestPapersData, setInstituteTestPapersData] = useState([]);
  const [selectedTestPaperId, setSelectedTestPaperId] = useState("");
  const [loading, setLoading] = useState(false);
  const [questionType, setQuestionType] = useState("MCQ");
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

  const handleCreateQuestions = async () => {
    setTouched(true); // ✅ Trigger all error highlights

    if (!validateForm() || !selectedTestPaperId) return;

    try {
      setLoading(true);
      for (const q of questions) {
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
        message: `${questions.length} questions created successfully ✅`,
        severity: "success",
      });
      setFormData(initialState);
      setQuestions([initialState]);
      setTouched(false); // ✅ Reset errors after success
    } catch (err) {
      setSnackbar({
        open: true,
        message: "Error occurred in creating questions",
        severity: "error",
      });
    } finally {
      setLoading(false);
    }
  };

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
            onClick={handleCreateQuestions}>
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
            onChange={(e) => setSelectedTestPaperId(e.target.value)}>
            <MenuItem value="">Select a test paper</MenuItem>
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
      </Card>

      {/* QUESTION FORM */}
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
          helperText={errors.question_text ? "Question text is required" : ""}
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
                  <TextField
                    fullWidth
                    label={`Option ${opt}`}
                    value={formData.options[idx] || ""}
                    onChange={(e) => {
                      const updated = [...formData.options];
                      updated[idx] = e.target.value;
                      handleChange("options", updated);
                    }}
                    // ✅ Mark first two options as required
                    error={errors.options && !formData.options[idx]?.trim()}
                    helperText={
                      errors.options && !formData.options[idx]?.trim()
                        ? "Required"
                        : ""
                    }
                  />
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
              onChange={(e) => handleChange("correct_option_s", e.target.value)}
              error={errors.correct_option_s} // ✅
              helperText={
                errors.correct_option_s ? "Correct answer is required" : ""
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
                handleChange("negative_mark", raw === 0 ? "" : String(-raw));
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
                handleChange("expected_time_for_each_question", e.target.value)
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
              helperText={errors.chapter_name ? "Chapter name is required" : ""}
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

      <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
        <Button
          variant="contained"
          onClick={() => {
            setTouched(true); // ✅ Also trigger errors on Next Question

            if (!validateForm()) return;

            const updated = [...questions];
            updated[currentIndex] = formData;
            setQuestions(updated);
            setCurrentIndex((i) => i + 1);
            setFormData(initialState);
            setTouched(false); // ✅ Reset errors for the next question
          }}>
          Next Question →
        </Button>
      </Box>
    </Container>
  );
}
