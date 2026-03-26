import { TextField } from "@mui/material";
import { useSupabase } from "../../contextProvider/SupabaseProvider";
import { useState, useEffect } from "react";
import {
  FormControl,
  InputLabel,
  Select as MuiSelect,
  MenuItem,
  FormHelperText,
  Snackbar,
  Alert,
} from "@mui/material";

import LoadingDialog from "../Loading Screen/LoadingDialog";

export default function CreateSubjects() {
  const {
    user,
    fetchInstituteAndExamData,
    createInstituteSubjectWithChapters,
  } = useSupabase();
  const [instituteExamsData, setinstituteExamsData] = useState(null);
  const [selectedExamId, setSelectedExamId] = useState("");
  const [loading, setLoading] = useState(false);
  const [touched, setTouched] = useState(false); // ✅ added
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  useEffect(() => {
    const loadExamdata = async () => {
      try {
        setLoading(true);
        const data = await fetchInstituteAndExamData(user.auth_user_id);
        setinstituteExamsData(data.ExamsData);
      } catch (err) {
        setSnackbar({
          open: true,
          message: err.message || "Exams Data Fetching Error ❌",
          severity: "error",
        });
      } finally {
        setLoading(false);
      }
    };

    if (user?.auth_user_id) loadExamdata();
  }, [user?.auth_user_id]);

  const [chapters, setChapters] = useState([]);
  const addChapter = () => {
    setChapters((prev) => [
      ...prev,
      { className: "", chapterName: "", topics: "" },
    ]);
  };

  const updateChapter = (index, key, value) => {
    setChapters((prev) =>
      prev.map((ch, i) => (i === index ? { ...ch, [key]: value } : ch)),
    );
  };

  const [formData, setFormData] = useState({
    subject_name: "",
    total_chapter: "",
    description: "",
    icon: "",
    status: "Active",
  });

  const handleChange = (key, value) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  // ✅ errors object
  const errors = {
    subject_name: touched && !formData.subject_name.trim(),
    total_chapter: touched && !formData.total_chapter.trim(),
    description: touched && !formData.description.trim(),
    icon: touched && !formData.icon,
    selectedExamId: touched && !selectedExamId,
    chapters: touched && chapters.length === 0,
  };

  // ✅ per-chapter errors
  const chapterErrors = (index) => ({
    className: touched && !chapters[index]?.className.trim(),
    chapterName: touched && !chapters[index]?.chapterName.trim(),
    topics: touched && !chapters[index]?.topics.trim(),
  });

  const validateForm = () => {
    if (!formData.subject_name.trim()) {
      setSnackbar({
        open: true,
        message: "Please fill in all the details ❌",
        severity: "error",
      });
      return false;
    }
    if (!formData.total_chapter.trim()) {
      setSnackbar({
        open: true,
        message: "Please fill in all the details❌",
        severity: "error",
      });
      return false;
    }
    if (!formData.description.trim()) {
      setSnackbar({
        open: true,
        message: "Please fill in all the details ❌",
        severity: "error",
      });
      return false;
    }
    if (!formData.icon) {
      setSnackbar({
        open: true,
        message: "Please fill in all the details ❌",
        severity: "error",
      });
      return false;
    }
    if (!chapters.length) {
      setSnackbar({
        open: true,
        message: "At least one chapter is required ❌",
        severity: "error",
      });
      return false;
    }
    for (let i = 0; i < chapters.length; i++) {
      const ch = chapters[i];
      if (!ch.className.trim()) {
        setSnackbar({
          open: true,
          message: `Please fill in all the details ${i + 1} ❌`,
          severity: "error",
        });
        return false;
      }
      if (!ch.chapterName.trim()) {
        setSnackbar({
          open: true,
          message: `Please fill in all the details ${i + 1} ❌`,
          severity: "error",
        });
        return false;
      }
      if (!ch.topics.trim()) {
        setSnackbar({
          open: true,
          message: `Please fill in all the details ${i + 1} ❌`,
          severity: "error",
        });
        return false;
      }
    }
    return true;
  };

  const buildChapterPayload = () => {
    const grouped = {};
    chapters.forEach((ch) => {
      const classKey = ch.className;
      if (!grouped[classKey]) {
        grouped[classKey] = {
          class: classKey,
          biology_type: "Botany",
          chapters: [],
        };
      }
      grouped[classKey].chapters.push({
        chapter_name: ch.chapterName,
        topics: ch.topics
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean),
      });
    });
    return Object.values(grouped);
  };

  return (
    <div className="relative min-h-screen bg-[var(--bg-default)] text-[var(--text-primary)] font-manrope overflow-hidden ml-5">
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

      <div className="relative max-w-[1400px] mx-auto px-6 lg:px-10 py-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between gap-6 mb-8">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-3xl font-black">Create New Subject</h1>
            </div>
            <p className="text-[var(--text-secondary)] mt-2 max-w-xl text-sm">
              Configure the essential details for your upcoming examination.
            </p>
          </div>

          <div className="flex gap-3">
            <button
              disabled={!selectedExamId || selectedExamId.trim() === ""}
              onClick={async () => {
                setTouched(true); // ✅
                if (!validateForm()) return;

                try {
                  const chaptersPayload = buildChapterPayload();
                  const payload = {
                    exam_id: selectedExamId,
                    subject_name: formData.subject_name,
                    subject_description: formData.description,
                    subject_status: formData.status,
                    icon: formData.icon,
                    total_chapters: chaptersPayload.length,
                    chapters_and_topics_name: chaptersPayload,
                  };

                  setLoading(true);
                  await createInstituteSubjectWithChapters(
                    payload,
                    payload.exam_id,
                  );
                  setSnackbar({
                    open: true,
                    message: "Subject & chapters created successfully ✅",
                    severity: "success",
                  });

                  setFormData({
                    subject_name: "",
                    total_chapter: "",
                    description: "",
                    icon: "Choose subject icon",
                    status: "Active",
                  });
                  setChapters([]);
                  setTouched(false); // ✅
                } catch (err) {
                  setSnackbar({
                    open: true,
                    message: err.message || "Failed to create subject ❌",
                    severity: "error",
                  });
                } finally {
                  setLoading(false);
                }
              }}
              className={`px-5 py-2 rounded-lg font-bold
                                ${
                                  !selectedExamId
                                    ? "bg-[var(--muted-bg)] text-[var(--text-secondary)] cursor-not-allowed"
                                    : "bg-[var(--primary)] hover:bg-[var(--secondary)] text-white"
                                }`}>
              Create Subject →
            </button>
          </div>
        </div>

        {/* Main Layout */}
        <div className="grid grid-cols-1 lg:grid-cols gap-6">
          <div className="flex flex-col gap-6">
            {/* Choose Exam */}
            <GlassCard>
              <SectionHeader title="Choose your Exam" />
              <Select
                label="Select Exam"
                value={selectedExamId}
                onChange={(examId) => setSelectedExamId(examId)}
                error={errors.selectedExamId ? "Please select an exam" : ""} // ✅
                options={[
                  { label: "Select an exam", value: "" },
                  ...(instituteExamsData?.map((exam) => ({
                    label: exam.exam_title,
                    value: exam.id,
                  })) || []),
                ]}
              />
            </GlassCard>

            {/* Subject Details */}
            <GlassCard>
              <SectionHeader title="Subject Details" />
              <TwoCol>
                <TextField
                  label="Subject Name"
                  value={formData.subject_name}
                  onChange={(v) => handleChange("subject_name", v.target.value)}
                  error={errors.subject_name} // ✅
                  helperText={
                    errors.subject_name ? "Subject name is required" : ""
                  }
                />
                <TextField
                  label="Total Chapter"
                  value={formData.total_chapter}
                  onChange={(v) =>
                    handleChange("total_chapter", v.target.value)
                  }
                  error={errors.total_chapter} // ✅
                  helperText={
                    errors.total_chapter ? "Total chapter is required" : ""
                  }
                />
              </TwoCol>
              <div className="pt-5">
                <TextField
                  label="Description of Subject"
                  multiline
                  rows={2}
                  fullWidth
                  value={formData.description}
                  onChange={(v) => handleChange("description", v.target.value)}
                  error={errors.description} // ✅
                  helperText={
                    errors.description ? "Description is required" : ""
                  }
                />
              </div>

              <TwoCol>
                <Select
                  label="Choose subject icon"
                  value={formData.icon}
                  onChange={(v) => handleChange("icon", v)}
                  error={errors.icon ? "Please select an icon" : ""} // ✅
                  options={[
                    { label: "Choose subject icon", value: "" },
                    { label: "Psychology", value: "psychology" },
                    { label: "Science", value: "science" },
                    { label: "Rocket", value: "rocket" },
                    { label: "Quiz", value: "quiz" },
                  ]}
                />
                <Select
                  label="Status"
                  value={formData.status}
                  onChange={(v) => handleChange("status", v)}
                  options={[
                    { label: "Active", value: "Active" },
                    { label: "Deactive", value: "Deactive" },
                  ]}
                />
              </TwoCol>
            </GlassCard>

            {/* Chapter Details */}
            <GlassCard>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-lg font-extrabold">Chapters</h2>
                  <p className="text-sm text-[var(--text-secondary)]">
                    Add chapters under this subject
                  </p>
                </div>
                <button
                  onClick={addChapter}
                  className="w-10 h-10 flex items-center justify-center rounded-lg
                                        bg-[var(--primary)] hover:bg-[var(--secondary)] transition font-bold text-xl"
                  title="Add Chapter">
                  +
                </button>
              </div>

              {/* ✅ Show error if no chapters added */}
              {errors.chapters && (
                <p className="text-sm text-red-500 mb-3">
                  At least one chapter is required
                </p>
              )}

              <div className="flex flex-col gap-4">
                {chapters.map((chapter, index) => (
                  <div
                    key={index}
                    className="p-4 rounded-lg bg-[var(--muted-bg)] border border-[var(--card-border)]">
                    <p className="text-sm font-bold mb-3 text-[var(--text-secondary)]">
                      Chapter {index + 1}
                    </p>

                    <TwoCol>
                      <TextField
                        label="Class"
                        value={chapter.className}
                        onChange={(e) =>
                          updateChapter(index, "className", e.target.value)
                        }
                        error={chapterErrors(index).className} // ✅
                        helperText={
                          chapterErrors(index).className
                            ? "Class is required"
                            : ""
                        }
                      />
                      <TextField
                        label="Chapter Name"
                        value={chapter.chapterName}
                        onChange={(e) =>
                          updateChapter(index, "chapterName", e.target.value)
                        }
                        error={chapterErrors(index).chapterName} // ✅
                        helperText={
                          chapterErrors(index).chapterName
                            ? "Chapter name is required"
                            : ""
                        }
                      />
                    </TwoCol>

                    <div className="mt-4">
                      <TextField
                        label="Topics"
                        multiline
                        rows={2}
                        fullWidth
                        value={chapter.topics}
                        onChange={(e) =>
                          updateChapter(index, "topics", e.target.value)
                        }
                        placeholder="e.g. Motion, Laws of Motion, Applications"
                        error={chapterErrors(index).topics} // ✅
                        helperText={
                          chapterErrors(index).topics
                            ? "Topics are required"
                            : ""
                        }
                      />
                    </div>

                    <div className="items-center pt-5 justify-center">
                      <button
                        onClick={() =>
                          setChapters((prev) =>
                            prev.filter((_, i) => i !== index),
                          )
                        }
                        className="text-xs text-red-400 hover:text-red-300 mt-2">
                        Remove Chapter
                      </button>
                    </div>
                  </div>
                ))}

                {chapters.length === 0 && (
                  <p className="text-sm text-[var(--text-secondary)] italic">
                    No chapters added yet. Click + to add one.
                  </p>
                )}
              </div>
            </GlassCard>

            <div className="p-4 rounded-xl border border-[var(--primary)]/20 bg-[var(--primary)]/10">
              <p className="font-bold text-sm">💡 Pro Tip</p>
              <p className="text-sm text-[var(--text-secondary)] mt-1">
                Use concise titles for better visibility on mobile devices.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function GlassCard({ children }) {
  return (
    <div className="p-6 rounded-xl bg-[var(--card-bg)] backdrop-blur-xl border border-[var(--card-border)] shadow-xl">
      {children}
    </div>
  );
}

function SectionHeader({ title }) {
  return <h2 className="text-lg font-extrabold mb-4">{title}</h2>;
}

function TwoCol({ children }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">{children}</div>
  );
}

function Select({ label, options, value, onChange, error }) {
  const labelId = `${label.replace(/\s+/g, "-").toLowerCase()}-label`;

  return (
    <FormControl fullWidth size="small" error={!!error}>
      <InputLabel id={labelId}>{label}</InputLabel>
      <MuiSelect
        labelId={labelId}
        value={value ?? ""}
        label={label}
        onChange={(e) => onChange(e.target.value)}>
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </MuiSelect>
      {error && <FormHelperText>{error}</FormHelperText>}
    </FormControl>
  );
}
