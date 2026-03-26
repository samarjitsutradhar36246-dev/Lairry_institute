import { TextField, Snackbar, Alert } from "@mui/material";
import { useSupabase } from "../../contextProvider/SupabaseProvider";
import { useState, useEffect } from "react";

import LoadingDialog from "../Loading Screen/LoadingDialog";

export default function CreateTestPapers() {
  const { user, fetchInstituteAndSubjectData, createTestpaperForSubject } =
    useSupabase();

  const [instituteSubjectsData, setinstituteSubjectsData] = useState(null);
  const [selectedSubjectId, setSelectedSubjectId] = useState("");
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success", // "success" | "error"
  });
  useEffect(() => {
    const loadExamdata = async () => {
      try {
        setLoading(true);
        const data = await fetchInstituteAndSubjectData(user.auth_user_id);
        setinstituteSubjectsData(data.SubjectsData);
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

  const [formData, setFormData] = useState({
    test_paper_name: "",
    test_paper_description: "",
    test_paper_rules: "",
    total_marks: "",
    test_paper_marking_scheme: "",
    total_questions_per_test_paper: "",
    test_paper_language: "",
    test_paper_difficulty: "Easy",
    total_time_per_test_paper_in_minute: "",
    test_paper_status: "Active",
  });
  const handleChange = (key, value) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const validateForm = () => {
    if (!formData.test_paper_name.trim()) {
      setSnackbar({
        open: true,
        message: "Test Paper name is required ❌",
        severity: "error",
      });

      return false;
    }

    if (!formData.test_paper_description.trim()) {
      setSnackbar({
        open: true,
        message: "Test paper description is required❌",
        severity: "error",
      });

      return false;
    }
    if (!formData.test_paper_rules.trim()) {
      setSnackbar({
        open: true,
        message: "Test paper rules is required ❌",
        severity: "error",
      });

      return false;
    }

    if (!formData.total_marks) {
      setSnackbar({
        open: true,
        message: "Total marks for this test paper is required ❌",
        severity: "error",
      });

      return false;
    }

    if (!formData.test_paper_marking_scheme) {
      setSnackbar({
        open: true,
        message: "Test paper marking scheme is required ❌",
        severity: "error",
      });

      return false;
    }

    if (!formData.total_questions_per_test_paper.trim()) {
      setSnackbar({
        open: true,
        message: "Total number of Questions in this test paper ❌",
        severity: "error",
      });

      return false;
    }

    if (!formData.test_paper_difficulty.trim()) {
      setSnackbar({
        open: true,
        message: "Difficulty Level for this test paper is required ❌",
        severity: "error",
      });

      return false;
    }
    if (!formData.total_time_per_test_paper_in_minute.trim()) {
      setSnackbar({
        open: true,
        message: "Difficulty Level for this test paper is required ❌",
        severity: "error",
      });

      return false;
    }

    return true;
  };

  return (
    <div
      className="relative min-h-screen font-manrope overflow-hidden ml-5"
      style={{
        backgroundColor: "var(--bg-default)",
        color: "var(--text-primary)",
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

      {/* Page Container */}
      <div className="relative max-w-[1400px] mx-auto px-6 lg:px-10 py-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between gap-6 mb-8">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-3xl font-black">Create New Test Paper</h1>
            </div>

            <p
              className="mt-2 max-w-xl text-sm"
              style={{ color: "var(--text-secondary)" }}>
              Configure the essential details for your upcoming examination.
            </p>
          </div>

          {/* Header Actions */}
          <div className="flex gap-3">
            <button
              disabled={!selectedSubjectId || selectedSubjectId.trim() === ""}
              onClick={async () => {
                if (!validateForm()) return;

                try {
                  const payload = {
                    subject_id: selectedSubjectId,
                    test_paper_name: formData.test_paper_name,
                    test_paper_description: formData.test_paper_description,
                    test_paper_rules: formData.test_paper_rules,
                    total_questions_per_test_paper:
                      formData.total_questions_per_test_paper,
                    total_marks: formData.total_marks,
                    test_paper_marking_scheme:
                      formData.test_paper_marking_scheme,
                    test_paper_language: formData.test_paper_language,
                    total_time_per_test_paper_in_minute:
                      formData.total_time_per_test_paper_in_minute,
                    test_paper_difficulty: formData.test_paper_difficulty,
                    test_paper_status: formData.test_paper_status,
                  };

                  setLoading(true);
                  await createTestpaperForSubject(payload, payload.subject_id);
                  setSnackbar({
                    open: true,
                    message: "Test Paper created successfully ✅",
                    severity: "success",
                  });

                  // RESET EVERYTHING
                  setFormData({
                    test_paper_name: "",
                    test_paper_description: "",
                    test_paper_rules: "",
                    total_marks: "",
                    test_paper_marking_scheme: "",
                    total_questions_per_test_paper: "",
                    test_paper_language: "",
                    test_paper_difficulty: "Easy",
                    total_time_per_test_paper_in_minute: "",
                    test_paper_status: "Active",
                  });
                } catch (err) {
                  setSnackbar({
                    open: true,
                    message: err.message || "Failed to create test paper ❌",
                    severity: "error",
                  });
                } finally {
                  setLoading(false);
                }
              }}
              className="px-5 py-2 rounded-lg font-bold transition-all duration-200"
              style={{
                backgroundColor: !selectedSubjectId
                  ? "var(--muted-bg)"
                  : "var(--primary)",
                color: !selectedSubjectId ? "var(--text-secondary)" : "#ffffff",
                cursor: !selectedSubjectId ? "not-allowed" : "pointer",
              }}>
              Create Testpaper→
            </button>
          </div>
        </div>

        {/* Main Layout */}
        <div className="grid grid-cols-1 lg:grid-cols gap-6">
          {/* LEFT COLUMN */}
          <div className="flex flex-col gap-6">
            {/* Subject Details */}
            <GlassCard>
              <SectionHeader title="Choose your Subject" />

              <Select
                label="Select Subject"
                value={selectedSubjectId}
                onChange={(subjectId) => setSelectedSubjectId(subjectId)}
                options={[
                  { label: "Select your subject", value: "" },
                  ...(instituteSubjectsData?.map((subject) => ({
                    label: subject.subject_name,
                    value: subject.id,
                  })) || []),
                ]}
              />
            </GlassCard>

            {/* TestPaper Details */}
            <GlassCard>
              <SectionHeader title="Test Paper Details" />

              <TwoCol>
                <TextField
                  label="Test Paper Name"
                  value={formData.test_paper_name}
                  onChange={(v) =>
                    handleChange("test_paper_name", v.target.value)
                  }
                />
                <TextField
                  label="Total Marks"
                  type="number"
                  value={formData.total_marks}
                  onChange={(e) => {
                    const val = Math.max(0, Number(e.target.value));
                    handleChange("total_marks", String(val));
                  }}
                  InputProps={{
                    inputProps: { min: 0, step: 1 },
                    onKeyDown: (e) => {
                      if (e.key === "-" || e.key === "e") e.preventDefault();
                    },
                  }}
                />
              </TwoCol>

              <TwoCol>
                <TextField
                  label="Test Paper Description"
                  multiline
                  rows={2}
                  fullWidth
                  value={formData.test_paper_description}
                  onChange={(v) =>
                    handleChange("test_paper_description", v.target.value)
                  }
                />

                <TextField
                  label="Test Paper Rules"
                  multiline
                  rows={2}
                  fullWidth
                  value={formData.test_paper_rules}
                  onChange={(v) =>
                    handleChange("test_paper_rules", v.target.value)
                  }
                />
              </TwoCol>
              <div className="pt-5 flex flex-col">
                <TextField
                  label="Test Paper Marking Scheme"
                  multiline
                  rows={2}
                  fullWidth
                  value={formData.test_paper_marking_scheme}
                  onChange={(v) =>
                    handleChange("test_paper_marking_scheme", v.target.value)
                  }
                />
                <Select
                  label="Language"
                  value={formData.test_paper_language}
                  onChange={(v) => handleChange("test_paper_difficulty", v)}
                  options={[{ label: "English", value: "English" }]}
                />
              </div>
              <TwoCol>
                <TextField
                  label="Total Time Per Test Paper in Minute"
                  type="number"
                  value={formData.total_time_per_test_paper_in_minute}
                  onChange={(e) => {
                    const val = Math.max(0, Number(e.target.value));
                    handleChange(
                      "total_time_per_test_paper_in_minute",
                      String(val),
                    );
                  }}
                  InputProps={{
                    inputProps: { min: 0, step: 1 },
                    onKeyDown: (e) => {
                      if (e.key === "-" || e.key === "e") e.preventDefault();
                    },
                  }}
                />
                <TextField
                  label="Test paper total questions"
                  type="number"
                  value={formData.total_questions_per_test_paper}
                  onChange={(e) => {
                    const val = Math.max(0, Number(e.target.value));
                    handleChange("total_questions_per_test_paper", String(val));
                  }}
                  InputProps={{
                    inputProps: { min: 0, step: 1 },
                    onKeyDown: (e) => {
                      if (e.key === "-" || e.key === "e") e.preventDefault();
                    },
                  }}
                />
              </TwoCol>
              <TwoCol>
                <Select
                  label="Choose Difficulty Level"
                  value={formData.test_paper_difficulty}
                  onChange={(v) => handleChange("test_paper_difficulty", v)}
                  options={[
                    { label: "Easy", value: "Easy" },
                    { label: "Moderate", value: "Moderate" },
                    { label: "Hard", value: "Hard" },
                  ]}
                />

                <Select
                  label="Status"
                  value={formData.test_paper_status}
                  onChange={(v) => handleChange("test_paper_status", v)}
                  options={[
                    { label: "Active", value: "Active" },
                    { label: "Deactive", value: "Deactive" },
                  ]}
                />
              </TwoCol>
            </GlassCard>

            <div
              className="p-4 rounded-xl"
              style={{
                backgroundColor: "var(--muted-bg)",
                border: "1px solid var(--primary)",
              }}>
              <p
                className="font-bold text-sm"
                style={{ color: "var(--primary)" }}>
                💡 Pro Tip
              </p>
              <p
                className="text-sm mt-1"
                style={{ color: "var(--text-secondary)" }}>
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
    <div
      className="p-6 rounded-xl backdrop-blur-xl shadow-xl"
      style={{
        backgroundColor: "var(--card-bg)",
        border: "1px solid var(--card-border)",
      }}>
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

function Select({ label, options, value, onChange }) {
  return (
    <div>
      <label className="text-sm text-slate-300 mb-1 block">{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full py-2 px-3 rounded-lg"
        style={{
          backgroundColor: "var(--bg-paper)",
          color: "var(--text-primary)",
          border: "1px solid var(--border-color)",
        }}>
        {options.map((o, index) => (
          <option key={index} value={o.value} disabled={o.value === ""}>
            {o.label}
          </option>
        ))}
      </select>
    </div>
  );
}
