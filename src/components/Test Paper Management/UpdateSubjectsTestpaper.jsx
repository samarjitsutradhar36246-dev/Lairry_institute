import { TextField, Snackbar, Alert } from "@mui/material";
import { useSupabase } from "../../contextProvider/SupabaseProvider";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import LoadingDialog from "../Loading Screen/LoadingDialog";

export default function UpdateSubjectsTestPaper() {
  const { fecthUpdateInstituteExamSubjectTestpaperData, updateInstituteExamSubjectTestpaper } = useSupabase();
  const { test_paper_id } = useParams()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success", // "success" | "error"
  });
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
        message: "Test paper description is required ❌",
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
  const loadTestpaper = async () => {
    try {
      setLoading(true)
      const data = await fecthUpdateInstituteExamSubjectTestpaperData(test_paper_id);

      // 1️⃣ Fill subject fields
      setFormData({
        test_paper_name: data.test_paper_name || "",
        test_paper_description: data.test_paper_description || "",
        test_paper_rules: data.test_paper_rules || "",
        total_marks: data.total_marks?.toString() || "",
        test_paper_marking_scheme: data.test_paper_marking_scheme || "",
        total_questions_per_test_paper: data.total_questions_per_test_paper?.toString() || "",
        test_paper_language: data.test_paper_language || "",
        test_paper_difficulty: data.test_paper_difficulty || "Easy",
        total_time_per_test_paper_in_minute: data.total_time_per_test_paper_in_minute?.toString() || "",
        test_paper_status: data.test_paper_status || "Active",
      });


    } catch (err) {
      setSnackbar({
        open: true,
        message: err.message || "Failed to load subject ❌",
        severity: "error",
      });

    } finally {
      setLoading(false)
    }
  };

  useEffect(() => {
    if (test_paper_id) {
      loadTestpaper();
    }
  }, [test_paper_id]);
  return (
    <div
      className="relative min-h-screen font-manrope overflow-hidden ml-5"
      style={{
        backgroundColor: "var(--bg-default)",
        color: "var(--text-primary)",
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

      {/* Page Container */}
      <div className="relative max-w-[1400px] mx-auto px-6 lg:px-10 py-6">

        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between gap-6 mb-8">
          <div>


            <div className="flex items-center gap-3">
              <h1 className="text-3xl font-black">Update Test Paper</h1>

            </div>

            <p
              className="mt-2 max-w-xl text-sm"
              style={{ color: "var(--text-secondary)" }}
            >

              Configure the essential details for your upcoming examination.

            </p>
          </div>

          {/* Header Actions */}
          <div className="flex gap-3">


            <button
              onClick={async () => {
                if (!validateForm()) return;

                try {

                  const payload = {

                    test_paper_name: formData.test_paper_name,
                    test_paper_description: formData.test_paper_description,
                    test_paper_rules: formData.test_paper_rules,
                    total_marks: formData.total_marks,
                    test_paper_marking_scheme: formData.test_paper_marking_scheme,
                    total_questions_per_test_paper: formData.total_questions_per_test_paper,
                    test_paper_language: formData.test_paper_language,
                    test_paper_difficulty: formData.test_paper_difficulty,
                    total_time_per_test_paper_in_minute: formData.total_time_per_test_paper_in_minute,
                    test_paper_status: formData.test_paper_status,
                  };

                  setLoading(true)
                  await updateInstituteExamSubjectTestpaper(test_paper_id, payload);
                  setSnackbar({
                    open: true,
                    message: "Test Paper Updated successfully ✅",
                    severity: "success",
                  });


                  navigate("/")

                } catch (err) {
                  setSnackbar({
                    open: true,
                    message: err.message || "Failed to create test paper ❌",
                    severity: "error",
                  });

                } finally {
                  setLoading(false)
                }
              }}
              className="px-5 py-2 rounded-lg font-bold transition-all duration-200"
              style={{
                backgroundColor: "var(--primary)",
                color: "#ffffff",
              }}


            >
              Update Test Paper →
            </button>


          </div>
        </div>

        {/* Main Layout */}
        <div className="grid grid-cols-1 lg:grid-cols gap-6">

          {/* LEFT COLUMN */}
          <div className="flex flex-col gap-6">

            {/* Exam Details */}
            <GlassCard>
              <SectionHeader title="Test Paper Details" />

              <TwoCol>
                <TextField label="Test Paper Name"
                  value={formData.test_paper_name}
                  onChange={(v) => handleChange("test_paper_name", v.target.value)}
                />
                <TextField label="Total Marks "
                  value={formData.total_marks}
                  onChange={(v) => handleChange("total_marks", v.target.value)}
                />

              </TwoCol>


              <TwoCol>
                <TextField label="Test Paper Description"
                  multiline
                  rows={2}
                  fullWidth
                  value={formData.test_paper_description}
                  onChange={(v) => handleChange("test_paper_description", v.target.value)}
                />

                <TextField label="Test Paper Rules"
                  multiline
                  rows={2}
                  fullWidth
                  value={formData.test_paper_rules}
                  onChange={(v) => handleChange("test_paper_rules", v.target.value)}
                />
              </TwoCol>
              <div className="pt-5 flex flex-col">
                <TextField label="Test Paper Marking Scheme"
                  multiline
                  rows={2}
                  fullWidth
                  value={formData.test_paper_marking_scheme}
                  onChange={(v) => handleChange("test_paper_marking_scheme", v.target.value)}
                />
                <Select label="Language"
                  value={formData.test_paper_language}
                  onChange={(v) => handleChange("test_paper_language", v)}
                  options={[
                    "English"
                  ]} />

              </div>
              <TwoCol>
                <TextField label="Total Time Per Test Paper in Minute"

                  value={formData.total_time_per_test_paper_in_minute}
                  onChange={(v) => handleChange("total_time_per_test_paper_in_minute", v.target.value)}
                />
                <TextField label="Test paper total questions"
                  value={formData.total_questions_per_test_paper}
                  onChange={(v) => handleChange("total_questions_per_test_paper", v.target.value)}
                />
              </TwoCol>
              <TwoCol>
                <Select label="Choose Difficulty Level"
                  value={formData.test_paper_difficulty}
                  onChange={(v) => handleChange("test_paper_difficulty", v)}
                  options={[
                    "Easy", "Moderate",
                    "Hard",
                  ]} />

                <Select label="Status"
                  value={formData.test_paper_status}
                  onChange={(v) => handleChange("test_paper_status", v)}
                  options={[
                    "Active",
                    "Deactive",
                  ]} />
              </TwoCol>
            </GlassCard>


            <div
              className="p-4 rounded-xl"
              style={{
                backgroundColor: "var(--muted-bg)",
                border: "1px solid var(--primary)",
              }}
            >

              <p className="font-bold text-sm" style={{ color: "var(--primary)" }}>
                💡 Pro Tip</p>
              <p className="text-sm mt-1" style={{ color: "var(--text-secondary)" }}>

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
      }}
    >

      {children}
    </div>
  );
}

function SectionHeader({ title }) {
  return <h2 className="text-lg font-extrabold mb-4">{title}</h2>;
}

function TwoCol({ children }) {
  return <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">{children}</div>;
}




function Select({ label, options, value, onChange }) {
  return (
    <div>
      <label className="text-sm mb-1 block"
        style={{ color: "var(--text-secondary)" }}
      >{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full py-2 px-3 rounded-lg"
        style={{
          backgroundColor: "var(--bg-paper)",
          color: "var(--text-primary)",
          border: "1px solid var(--border-color)",
        }}

      >
        {options.map((o) => (
          <option key={o} value={o}>
            {o || "Select"}
          </option>
        ))}
      </select>
    </div>
  );
}



