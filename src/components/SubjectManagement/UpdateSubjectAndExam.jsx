import { TextField } from "@mui/material";
import { useSupabase } from "../../contextProvider/SupabaseProvider";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  FormControl,
  InputLabel,
  Select as MuiSelect,
  MenuItem,
  FormHelperText, // ✅ added
  Snackbar,
  Alert,
} from "@mui/material";

import LoadingDialog from "../Loading Screen/LoadingDialog";

export default function UpdateSubjectAndExam() {
  const {
    user,
    fecthUpdateInstituteExamSubjectData,
    updateInstituteExamSubject,
  } = useSupabase();
  const { subject_id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [touched, setTouched] = useState(false); // ✅ added
  const [chapters, setChapters] = useState([
    {
      className: "",
      chapterName: "",
      topics: "",
      chapterType: "",
    },
  ]);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const addChapter = () => {
    setChapters((prev) => [
      ...prev,
      { className: "", chapterName: "", topics: "", chapterType: "" },
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

  const loadSubject = async () => {
    try {
      setLoading(true);
      const data = await fecthUpdateInstituteExamSubjectData(subject_id);
      console.log(data);
      setFormData({
        subject_name: data.subject_name || "",
        total_chapter: data.total_chapters?.toString() || "",
        description: data.subject_description || "",
        icon: data.icon || "",
        status: data.subject_status || "Active",
      });
      console.log(formData);
      const flatChapters = [];
      data.chapters_and_topics_name?.forEach((group) => {
        group.chapters.forEach((ch) => {
          flatChapters.push({
            className: group.class || "",
            chapterName: ch.chapter_name || "",
            topics: (ch.topics || []).join(", "),
            chapterType: group.chapter_type || "",
          });
        });
      });

      setChapters(flatChapters);
    } catch (err) {
      setSnackbar({
        open: true,
        message: err.message || "Failed to load subject ❌",
        severity: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (subject_id) {
      loadSubject();
    }
  }, [subject_id]);

  // ✅ errors object
  const errors = {
    subject_name: touched && !formData.subject_name.trim(),
    total_chapter: touched && !formData.total_chapter.trim(),
    description: touched && !formData.description.trim(),
    icon: touched && !formData.icon,
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
        message: "Please fill all the details ❌",
        severity: "error",
      });
      return false;
    }
    if (!formData.total_chapter.trim()) {
      setSnackbar({
        open: true,
        message: "Please fill all the details   ❌",
        severity: "error",
      });
      return false;
    }
    if (!formData.description.trim()) {
      setSnackbar({
        open: true,
        message: "Please fill all the details  ❌",
        severity: "error",
      });
      return false;
    }
    if (!formData.icon) {
      setSnackbar({
        open: true,
        message: "Please fill all the details  ❌",
        severity: "error",
      });
      return false;
    }
    if (!chapters.length) {
      setSnackbar({
        open: true,
        message: "Please fill all the details  ❌",
        severity: "error",
      });
      return false;
    }
    for (let i = 0; i < chapters.length; i++) {
      const ch = chapters[i];
      if (!ch.className.trim()) {
        setSnackbar({
          open: true,
          message: `Class is required in Chapter ${i + 1} ❌`,
          severity: "error",
        });
        return false;
      }
      if (!ch.chapterName.trim()) {
        setSnackbar({
          open: true,
          message: `Chapter name is required in Chapter ${i + 1} ❌`,
          severity: "error",
        });
        return false;
      }
      if (!ch.topics.trim()) {
        setSnackbar({
          open: true,
          message: `Topics are required in Chapter ${i + 1} ❌`,
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
      if (!grouped[ch.className]) {
        grouped[ch.className] = { class: ch.className, chapters: [] };
        if (ch.chapterType?.trim()) {
          grouped[ch.className].chapter_type = ch.chapterType.trim();
        }
      }
      grouped[ch.className].chapters.push({
        chapter_name: ch.chapterName,
        topics: ch.topics
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean),
      });
    });
    return Object.values(grouped);
  };

  const isFormIncomplete =
    !formData.subject_name.trim() ||
    !formData.total_chapter.trim() ||
    !formData.description.trim() ||
    !formData.icon ||
    chapters.length === 0 ||
    chapters.some(
      (ch) =>
        !ch.className.trim() || !ch.chapterName.trim() || !ch.topics.trim(),
    );

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
              <h1 className="text-3xl font-black">Update Existing Subject</h1>
            </div>
            <p className="text-[var(--text-secondary)] mt-2 max-w-xl text-sm">
              Configure the essential details for your upcoming examination.
            </p>
          </div>

          <div className="flex gap-3">
            <button
              disabled={false}
              onClick={async () => {
                setTouched(true); // ✅
                if (!validateForm()) return;

                try {
                  const payload = {
                    subject_name: formData.subject_name,
                    subject_description: formData.description,
                    subject_status: formData.status,
                    icon: formData.icon,
                    total_chapters: chapters.length,
                    chapters_and_topics_name: buildChapterPayload(),
                  };
                  setLoading(true);
                  await updateInstituteExamSubject(subject_id, payload);
                  setSnackbar({
                    open: true,
                    message: "Subject updated successfully ✅",
                    severity: "success",
                  });
                  navigate("/");
                } catch (err) {
                  setSnackbar({
                    open: true,
                    message: err.message || "Failed to update subject ❌",
                    severity: "error",
                  });
                } finally {
                  setLoading(false);
                }
              }}
              className={`px-5 py-2 rounded-lg font-bold transition ${
                isFormIncomplete
                  ? "bg-gray-400 cursor-not-allowed opacity-50"
                  : "bg-[var(--primary)] hover:bg-[var(--secondary)]"
              }`}>
              Update Subject →
            </button>
          </div>
        </div>

        {/* Main Layout */}
        <div className="grid grid-cols-1 lg:grid-cols gap-6">
          <div className="flex flex-col gap-6">
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
                  options={["", "psychology", "science", "rocket", "quiz"]}
                />
                <Select
                  label="Status"
                  value={formData.status}
                  onChange={(v) => handleChange("status", v)}
                  options={["Active", "Deactive"]}
                />
              </TwoCol>
            </GlassCard>

            {/* Chapters */}
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
                  className="w-10 h-10 flex items-center justify-center rounded-lg bg-[var(--primary)] hover:bg-[var(--secondary)] transition font-bold text-xl"
                  title="Add Chapter">
                  +
                </button>
              </div>

              {/* ✅ Show error if no chapters */}
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

                    <TwoCol>
                      <TextField
                        label="Topics"
                        value={chapter.topics}
                        onChange={(e) =>
                          updateChapter(index, "topics", e.target.value)
                        }
                        placeholder="Comma separated"
                        error={chapterErrors(index).topics} // ✅
                        helperText={
                          chapterErrors(index).topics
                            ? "Topics are required"
                            : ""
                        }
                      />
                      <TextField
                        label="Chapter Type (optional)"
                        value={chapter.chapterType}
                        onChange={(e) =>
                          updateChapter(index, "chapterType", e.target.value)
                        }
                      />
                    </TwoCol>

                    <div className="items-center pt-5 justify-center">
                      <button
                        onClick={() =>
                          setChapters((prev) =>
                            prev.filter((_, i) => i !== index),
                          )
                        }
                        className="text-xs text-[var(--error-color)] hover:opacity-80 mt-2">
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

            <div className="p-4 rounded-xl border border-[var(--card-border)] bg-[var(--muted-bg)]">
              <p className="font-bold text-sm text-[var(--primary)]">
                💡 Pro Tip
              </p>
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
    <div className="p-6 rounded-xl bg-[var(--card-bg)] border border-[var(--card-border)] backdrop-blur-xl shadow-xl">
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

// ✅ Updated Select to support error prop
function Select({ label, options, value, onChange, error }) {
  return (
    <FormControl fullWidth size="small" error={!!error}>
      <InputLabel>{label}</InputLabel>
      <MuiSelect
        value={value}
        label={label}
        onChange={(e) => onChange(e.target.value)}>
        {options.map((o) => (
          <MenuItem key={o} value={o}>
            {o || "Select"}
          </MenuItem>
        ))}
      </MuiSelect>
      {error && <FormHelperText>{error}</FormHelperText>}
    </FormControl>
  );
}
