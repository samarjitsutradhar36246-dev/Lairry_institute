import { useSupabase } from "../../contextProvider/SupabaseProvider";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Tabs,
  Tab,
  TextField,
  Typography,
  Button,
  Box,
  Card,
  Snackbar,
  Alert,
} from "@mui/material";

import LoadingDialog from "../Loading Screen/LoadingDialog";

export default function UpdateQuestion() {
  const {
    user,
    fecthUpdateInstituteExamSubjectTestpaperQuestionData,
    updateInstituteExamSubjectTestpaperQuestionData,
  } = useSupabase();
  const { question_id } = useParams();
  const [questionType, setQuestionType] = useState("MCQ");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    question_text: "",
    options: [],
    question_instruction: "",
    correct_option_s: [],
    positive_mark: 0,
    negative_mark: 0,
    expected_time_for_each_question: 0,
    chapter_name: "",
    topic_name: "",
  });

  const OPTION_KEYS = ["A", "B", "C", "D"];

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const handleChange = (key, value) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  // ✅ always-on errors — shows instantly when user clears a field
  const errors = {
    question_text: !formData.question_text.trim(),
    options:
      questionType === "MCQ" &&
      (!formData.options ||
        formData.options.filter((o) => o?.trim()).length < 4),
    correct_option_s:
      !formData.correct_option_s ||
      formData.correct_option_s.length === 0 ||
      formData.correct_option_s.every((s) => !s.trim()),
    positive_mark:
      formData.positive_mark === "" || Number(formData.positive_mark) <= 0,
    negative_mark:
      formData.negative_mark === "" ||
      formData.negative_mark === null ||
      Number.isNaN(formData.negative_mark),
    expected_time_for_each_question:
      formData.expected_time_for_each_question <= 0,
    chapter_name: !formData.chapter_name.trim(),
    topic_name: !formData.topic_name.trim(),
  };

  // ✅ button disables when any field is empty/invalid
  const isFormIncomplete =
    errors.question_text ||
    errors.options ||
    errors.correct_option_s ||
    errors.positive_mark ||
    errors.expected_time_for_each_question ||
    errors.chapter_name ||
    errors.topic_name;

  const validateForm = () => {
    if (!formData.question_text.trim()) {
      setSnackbar({
        open: true,
        message: "Test Paper Question is required",
        severity: "error",
      });
      return false;
    }
    if (
      questionType === "MCQ" &&
      (!formData.options ||
        formData.options.filter((o) => o?.trim()).length < 4)
    ) {
      setSnackbar({
        open: true,
        message: "4 options are required for MCQ",
        severity: "error",
      });
      return false;
    }
    if (!formData.correct_option_s || formData.correct_option_s.length === 0) {
      setSnackbar({
        open: true,
        message: "Correct option for this question is required",
        severity: "error",
      });
      return false;
    }
    if (
      formData.negative_mark === "" ||
      formData.negative_mark === null ||
      Number.isNaN(formData.negative_mark)
    ) {
      setSnackbar({
        open: true,
        message: "Negative mark is required",
        severity: "error",
      });
      return false;
    }
    if (formData.positive_mark <= 0) {
      setSnackbar({
        open: true,
        message: "Positive mark required",
        severity: "error",
      });
      return false;
    }
    if (formData.expected_time_for_each_question <= 0) {
      setSnackbar({
        open: true,
        message: "Expected time required",
        severity: "error",
      });
      return false;
    }
    if (!formData.chapter_name.trim()) {
      setSnackbar({
        open: true,
        message: "Chapter name is required",
        severity: "error",
      });
      return false;
    }
    if (!formData.topic_name.trim()) {
      setSnackbar({
        open: true,
        message: "Topic is required",
        severity: "error",
      });
      return false;
    }
    return true;
  };

  const loadQuestion = async () => {
    try {
      setLoading(true);
      const data =
        await fecthUpdateInstituteExamSubjectTestpaperQuestionData(question_id);
      if (!data.options || data.options.length === 0) {
        setQuestionType("Numerical");
      } else {
        setQuestionType("MCQ");
      }
      setFormData({
        question_text: data.question_text ?? "",
        options: Array.isArray(data.options) ? data.options : [],
        question_instruction: data.question_instruction ?? "",
        correct_option_s: Array.isArray(data.correct_option_s)
          ? data.correct_option_s
          : [],
        positive_mark: Number(data.positive_mark) || 0,
        negative_mark: Number(data.negative_mark) || 0,
        expected_time_for_each_question:
          Number(data.expected_time_for_each_question) || 0,
        chapter_name: data.chapter_name ?? "",
        topic_name: data.topic_name ?? "",
      });
    } catch (err) {
      setSnackbar({
        open: true,
        message: err.message || "Failed to load Question❌",
        severity: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (question_id) {
      loadQuestion();
    }
  }, [question_id]);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "background.default",
        color: "text.primary",
        fontFamily: "Inter, sans-serif",
        ml: 3,
      }}>
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

      <Box sx={{ maxWidth: 1400, mx: "auto", px: { xs: 3, lg: 5 }, py: 3 }}>
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between gap-6 mb-8">
          <div>
            <div className="flex items-center gap-3">
              <Typography variant="h4" fontWeight={800}>
                Update Existing Question
              </Typography>
            </div>
            <Typography
              variant="body2"
              sx={{ mt: 1, maxWidth: 500, color: "text.secondary" }}>
              Configure the essential questions for your upcoming examination.
            </Typography>
          </div>

          <div className="flex gap-3">
            <Button
              variant="contained"
              color="primary"
              disabled={isFormIncomplete} // ✅ disables when any field is empty
              sx={{ px: 3, fontWeight: 600 }}
              onClick={async () => {
                if (!validateForm()) return;
                try {
                  setLoading(true);
                  await updateInstituteExamSubjectTestpaperQuestionData({
                    ...formData,
                    q_id: question_id,
                  });
                  setSnackbar({
                    open: true,
                    message: "Question updated successfully ✅",
                    severity: "success",
                  });
                  navigate("/");
                } catch (err) {
                  setSnackbar({
                    open: true,
                    message: err.message || "Failed to update question ❌",
                    severity: "error",
                  });
                } finally {
                  setLoading(false);
                }
              }}>
              Update Question →
            </Button>
          </div>
        </div>

        {/* Main Layout */}
        <div className="grid grid-cols-1 xl:grid-cols gap-6">
          <div className="xl:col-span-8">
            <GlassCard>
              <SectionHeader title="Question Details" />

              <div className="pt-5 flex flex-col">
                <TextField
                  label="Enter Question"
                  value={formData.question_text}
                  onChange={(v) =>
                    handleChange("question_text", v.target.value)
                  }
                  error={errors.question_text} // ✅
                  helperText={
                    errors.question_text ? "Question text is required" : ""
                  }
                />
              </div>

              {/* Question Type Tabs */}
              <div className="mt-4">
                <Tabs
                  value={questionType}
                  onChange={(e, newValue) => {
                    setQuestionType(newValue);
                    handleChange("question_instruction", newValue);
                    if (newValue === "Numerical") {
                      handleChange("options", []);
                    }
                  }}
                  textColor="primary"
                  indicatorColor="primary"
                  sx={{ borderBottom: 1, borderColor: "divider" }}>
                  <Tab label="MCQ" value="MCQ" />
                  <Tab label="Numerical" value="Numerical" />
                </Tabs>
              </div>

              {/* MCQ Options */}
              {questionType === "MCQ" && (
                <>
                  <TwoCol>
                    {OPTION_KEYS.map((opt, idx) => (
                      <TextField
                        key={opt}
                        label={`Option ${opt}`}
                        value={formData.options[idx] || ""}
                        onChange={(e) => {
                          const updated = [...(formData.options || [])];
                          updated[idx] = e.target.value;
                          handleChange("options", updated);
                        }}
                        fullWidth
                        error={errors.options && !formData.options[idx]?.trim()} // ✅
                        helperText={
                          errors.options && !formData.options[idx]?.trim()
                            ? "Required"
                            : ""
                        }
                      />
                    ))}
                  </TwoCol>
                  {errors.options && (
                    <Typography
                      variant="caption"
                      color="error"
                      sx={{ mt: 1, display: "block" }}>
                      All 4 options are required
                    </Typography>
                  )}
                </>
              )}

              <TwoCol>
                <TextField
                  label="Question Instruction"
                  value={questionType}
                  disabled
                />
                <TextField
                  label="Correct Answer"
                  value={formData.correct_option_s.join(",")}
                  onChange={(v) =>
                    handleChange(
                      "correct_option_s",
                      v.target.value.split(",").map((s) => s.trim()),
                    )
                  }
                  error={errors.correct_option_s} // ✅
                  helperText={
                    errors.correct_option_s
                      ? "Correct answer is required"
                      : "Comma separated values, e.g. A,B"
                  }
                />
              </TwoCol>

              <div className="pt-5 flex flex-col gap-5">
                <TextField
                  label="Positive Mark"
                  type="number"
                  value={formData.positive_mark}
                  onChange={(v) => {
                    const val = v.target.value;
                    handleChange(
                      "positive_mark",
                      val === "" ? "" : Number(val),
                    );
                  }}
                  inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
                  error={errors.positive_mark} // ✅
                  helperText={
                    errors.positive_mark
                      ? "Positive mark must be greater than 0"
                      : "Only numbers are allowed"
                  }
                />
                <TextField
                  label="Negative Mark"
                  type="number"
                  value={formData.negative_mark}
                  onChange={(v) =>
                    handleChange("negative_mark", Number(v.target.value))
                  }
                  inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
                  error={errors.negative_mark} // ✅
                  helperText={
                    errors.negative_mark
                      ? "Negative mark is required"
                      : "Only numbers are allowed"
                  }
                />
              </div>

              <TwoCol>
                <TextField
                  label="Expected Time for Each Question In Seconds"
                  type="number"
                  value={formData.expected_time_for_each_question}
                  onChange={(v) =>
                    handleChange(
                      "expected_time_for_each_question",
                      Number(v.target.value),
                    )
                  }
                  inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
                  error={errors.expected_time_for_each_question} // ✅
                  helperText={
                    errors.expected_time_for_each_question
                      ? "Expected time must be greater than 0"
                      : "Only numbers are allowed"
                  }
                />
                <TextField
                  label="Chapter Name"
                  value={formData.chapter_name}
                  onChange={(v) => handleChange("chapter_name", v.target.value)}
                  error={errors.chapter_name} // ✅
                  helperText={
                    errors.chapter_name ? "Chapter name is required" : ""
                  }
                />
              </TwoCol>

              <div className="pt-5">
                <TextField
                  label="Topic Name"
                  fullWidth
                  value={formData.topic_name}
                  onChange={(v) => handleChange("topic_name", v.target.value)}
                  error={errors.topic_name} // ✅
                  helperText={errors.topic_name ? "Topic name is required" : ""}
                />
              </div>
            </GlassCard>
          </div>
        </div>
      </Box>
    </Box>
  );
}

function GlassCard({ children }) {
  return <Card sx={{ p: 3, backdropFilter: "blur(10px)" }}>{children}</Card>;
}

function SectionHeader({ title }) {
  return (
    <Typography variant="h6" fontWeight={700} mb={2}>
      {title}
    </Typography>
  );
}

function TwoCol({ children }) {
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
        gap: 2,
        mt: 2,
      }}>
      {children}
    </Box>
  );
}

function Field({ label, children }) {
  return (
    <div>
      <label className="text-sm text-slate-300 mb-1 block">{label}</label>
      {children}
    </div>
  );
}

function Input({ prefix, ...props }) {
  return (
    <div className="flex items-center bg-slate-900 border border-white/10 rounded-lg px-3">
      {prefix && <span className="text-slate-400 mr-1">{prefix}</span>}
      <input
        {...props}
        className="w-full py-2 bg-transparent outline-none text-white"
      />
    </div>
  );
}

function Select({ label, options, value, onChange }) {
  return (
    <div>
      <label className="text-sm text-slate-300 mb-1 block">{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full py-2 px-3 bg-slate-900 border border-white/10 rounded-lg text-white">
        {options.map((o) => (
          <option key={o} value={o}>
            {o || "Select"}
          </option>
        ))}
      </select>
    </div>
  );
}

function SummaryRow({ label, value }) {
  return (
    <div className="flex justify-between items-center py-1">
      <span className="text-slate-400">{label}</span>
      <span className="font-semibold">{value}</span>
    </div>
  );
}

function Divider() {
  return <div className="border-t border-white/10 my-2" />;
}
