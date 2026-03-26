import { useSupabase } from "../../contextProvider/SupabaseProvider";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  FormControl,
  InputLabel,
  Select as MuiSelect,
  MenuItem,
  Snackbar,
  Alert,
} from "@mui/material";
import LoadingDialog from "../Loading Screen/LoadingDialog";
export default function UpdateExam() {
  const navigate = useNavigate();
  const { exam_id } = useParams();
  const { fecthUpdateInstituteExamData, updateInstituteExam } = useSupabase();
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success", // "success" | "error"
  });
  const [formData, setFormData] = useState({
    exam_name: "",
    category: "",
    language: "English",
    icon: "",
    status: "Active",
  });
  useEffect(() => {
    const loadExamData = async () => {
      try {
        setLoading(true);
        const exam = await fecthUpdateInstituteExamData(exam_id);
        setSnackbar({
          open: true,
          message: "Exam data fetched successfully ✅",
          severity: "success",
        });
        setFormData({
          exam_name: exam.exam_title || "",
          category: exam.exam_category || "",
          language: exam.language || "English",
          icon: exam.icon || "",
          status: exam.exam_status || "Active",
        });
      } catch (err) {
        setSnackbar({
          open: true,
          message: err.message || "Failed to fetch exam ❌",
          severity: "error",
        });
      } finally {
        setLoading(false);
      }
    };

    if (exam_id) loadExamData();
  }, [exam_id]);

  const handleChange = (key, value) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
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

      {/* Page Container */}
      <div className="relative max-w-[1400px] mx-auto px-6 lg:px-10 py-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between gap-6 mb-8">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-3xl font-black">Update New Exam</h1>
            </div>

            <p className="text-[var(--text-secondary)] mt-2 max-w-xl text-sm">
              Configure the essential details for your upcoming examination.
            </p>
          </div>

          {/* Header Actions */}
          <div className="flex gap-3">
            <button
              disabled={
                !formData.exam_name ||
                formData.exam_name === "Select your exam name" ||
                !formData.category ||
                formData.category === "Select your exam category" ||
                !formData.icon ||
                formData.icon === ""
              }
              onClick={async () => {
                if (
                  !formData.exam_name ||
                  formData.exam_name === "Select your exam name"
                ) {
                  setSnackbar({
                    open: true,
                    message: "Please select an Exam Name ❌",
                    severity: "error",
                  });
                  return;
                }
                if (
                  !formData.category ||
                  formData.category === "Select your exam category"
                ) {
                  setSnackbar({
                    open: true,
                    message: "Please select a Category ❌",
                    severity: "error",
                  });
                  return;
                }
                if (!formData.icon || formData.icon === "") {
                  setSnackbar({
                    open: true,
                    message: "Please select an Exam Icon ❌",
                    severity: "error",
                  });
                  return;
                }
                try {
                  setLoading(true);
                  await updateInstituteExam({
                    exam_id: exam_id,
                    exam_name: formData.exam_name,
                    category: formData.category,
                    language: formData.language,
                    icon: formData.icon,
                    status: formData.status,
                  });
                  setSnackbar({
                    open: true,
                    message: "Exam updated successfully ✅",
                    severity: "success",
                  });
                  navigate("/");
                } catch (err) {
                  setSnackbar({
                    open: true,
                    message: err.message || "Failed to update exam ❌",
                    severity: "error",
                  });
                } finally {
                  setLoading(false);
                }
              }}
              className="px-5 py-2 rounded-lg bg-[var(--primary)] hover:bg-[var(--secondary)] font-bold disabled:opacity-40 disabled:cursor-not-allowed">
              Update Exam →
            </button>
          </div>
        </div>

        {/* Main Layout */}
        <div className="grid grid-cols-1 lg:grid-cols gap-6">
          {/* LEFT COLUMN */}
          <div className="flex flex-col gap-6">
            {/* Exam Details */}
            <GlassCard>
              <SectionHeader title="Exam Details" />

              <Select
                label="Exam Name"
                value={formData.exam_name}
                onChange={(v) => handleChange("exam_name", v)}
                options={[
                  "Select your exam name",
                  "JEE Advanced",
                  "JEE Mains",
                  "IIT",
                  "NIT",
                  "BITSAT",
                  "NEET UG/PG",
                  "VITEEE",
                  "WBJEE",
                  "GATE",
                  "AIIMS",
                  "JIPMER",
                  "CLAT",
                  "AILET",
                  "CAT",
                  "XAT",
                  "CUET (UG)",
                  "CMAT",
                  "MAT",
                  "IIFT",
                  "NMAT",
                  "KMAT",
                  "CTET",
                  "UGC NET",
                  "UCEED",
                  "NATA",
                  "CUET",
                  "UPSC (CSE)",
                  "UPSC (IES/ISS)",
                  "UPPSC",
                  "APSC",
                  "JPSC",
                  "APPSC",
                  "NDA",
                  "CDS",
                  "IMU CET",
                  "SSC (CGL)",
                  "SSC (CHSL)",
                  "SSC (JE)",
                  "SSC (GD)",
                  "SSC (MTS)",
                  "RRB (NTPC/JE/ALP/GROUP D)",
                  "IBPS (PO/Clerk)",
                  "ISRO",
                  "DRDO",
                ]}
              />
              <TwoCol>
                <Select
                  label="Category"
                  value={formData.category}
                  onChange={(v) => handleChange("category", v)}
                  options={[
                    "Select your exam category",
                    "Engineering & Science",
                    "Medical & Life Sciences",
                    "Law & Management",
                    "University Admission Entrance",
                    "Civil Services Entrance",
                    "Defense & Uniformed Services",
                    "Staff Selection & Public Sector",
                    "Other Academic/Professional",
                  ]}
                />

                <Select
                  label="Language"
                  value={formData.language}
                  onChange={(v) => handleChange("language", v)}
                  options={["English"]}
                />
              </TwoCol>

              <TwoCol>
                <Select
                  label="Choose Exam Icon"
                  value={formData.icon}
                  onChange={(v) => handleChange("icon", v)}
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

            <div className="p-4 rounded-xl border border-blue-500/20 bg-blue-500/10">
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
    <div className="p-6 rounded-xl bg-[var(--card-bg)] border border-[var(--card-border)] backdrop-blur-xl  shadow-xl">
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
    <FormControl fullWidth size="small">
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
    </FormControl>
  );
}
