import { TextField, Snackbar, Alert } from "@mui/material";
import { useSupabase } from "../../contextProvider/SupabaseProvider";
import { useState, useEffect, useRef } from "react";
import {
  FormControl,
  InputLabel,
  Select as MuiSelect,
  FormHelperText,
  MenuItem,
} from "@mui/material";

import LoadingDialog from "../Loading Screen/LoadingDialog";

export default function CreateTestPapers() {
  const { user, fetchInstituteAndSubjectData, createTestpaperForSubject } =
    useSupabase();

  const [instituteSubjectsData, setinstituteSubjectsData] = useState(null);
  const [selectedSubjectId, setSelectedSubjectId] = useState("");
  const [loading, setLoading] = useState(false);
  const [touched, setTouched] = useState(false);
  const [timeSlot, setTimeSlot] = useState({ date: null, time: "" });
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
    test_paper_language: "English",
    test_paper_difficulty: "Easy",
    total_time_per_test_paper_in_minute: "",
    test_paper_status: "Deactivate",
    test_paper_scheduled_at: "", // 👈 time slot validation
  });
  const handleChange = (key, value) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const errors = {
    test_paper_name: touched && !formData.test_paper_name.trim(),
    test_paper_description: touched && !formData.test_paper_description.trim(),
    test_paper_rules: touched && !formData.test_paper_rules.trim(),
    total_marks: touched && !formData.total_marks.trim(),
    test_paper_marking_scheme:
      touched && !formData.test_paper_marking_scheme.trim(),
    total_questions_per_test_paper:
      touched && !formData.total_questions_per_test_paper.trim(),
    test_paper_language: touched && !formData.test_paper_language.trim(),
    test_paper_difficulty: touched && !formData.test_paper_difficulty.trim(),
    total_time_per_test_paper_in_minute:
      touched && !formData.total_time_per_test_paper_in_minute.trim(),
    test_paper_scheduled_at: touched && !formData.test_paper_scheduled_at, // 👈 add this
  };

  const validateForm = () => {
    if (
      !formData.test_paper_name.trim() ||
      !formData.test_paper_description.trim() ||
      !formData.test_paper_rules.trim() ||
      !formData.total_marks.trim() ||
      !formData.test_paper_marking_scheme.trim() ||
      !formData.test_paper_language.trim() ||
      !formData.test_paper_difficulty.trim() ||
      !formData.total_time_per_test_paper_in_minute.trim() ||
      !formData.test_paper_scheduled_at || // 👈 add this
      !formData.total_questions_per_test_paper.trim()
    ) {
      setSnackbar({
        open: true,
        message: "Please fill in all required fields ❌",
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
                setTouched(true); // ✅ add this
                if (!validateForm()) return;
                const totalDurationInMinutes =
                  Number(formData.total_time_per_test_paper_in_minute) *
                  Number(formData.total_questions_per_test_paper);

                const testStartDate = new Date(
                  formData.test_paper_scheduled_at,
                );

                const testEndDate = new Date(
                  testStartDate.getTime() + totalDurationInMinutes * 60 * 1000,
                );
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
                    test_start_at: testStartDate.toISOString(),
                    test_end_at: testEndDate.toISOString(), // 👈 newly added
                  };
                  console.log("scheduled", formData.test_paper_scheduled_at);
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
                    test_paper_language: "English",
                    test_paper_difficulty: "Easy",
                    total_time_per_test_paper_in_minute: "",
                    test_paper_status: "Deactivate",
                    test_paper_scheduled_at: "", // ✅ ADD THIS
                  });
                  setTouched(false); // ✅ NEW
                  setSelectedSubjectId(""); // ✅ NEW// to reset the subject selection after creation
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
                error={
                  errors.selectedSubjectId ? "Please select a subject" : ""
                }
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
                  error={errors.test_paper_name}
                  helperText={
                    errors.test_paper_name ? "Test paper name is required" : ""
                  }
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
                  error={errors.total_marks}
                  helperText={
                    errors.total_marks ? "Total marks is required" : ""
                  }
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
                  error={errors.test_paper_description}
                  helperText={
                    errors.test_paper_description
                      ? "Description is required"
                      : "Example: Comprehensive Biology test covering Botany and Zoology based on NCERT "
                  }
                  onChange={(v) =>
                    handleChange("test_paper_description", v.target.value)
                  }
                  FormHelperTextProps={{
                    sx: { color: "tomato" }, // Aap yaha hex code bhi de sakte hain jaise '#ff0000'
                  }}
                />

                <TextField
                  label="Test Paper Rules"
                  multiline
                  rows={2}
                  fullWidth
                  value={formData.test_paper_rules}
                  error={errors.test_paper_rules}
                  helperText={
                    errors.test_paper_rules
                      ? "Rules are required"
                      : "Example: Total 90 questions including Botany and Zoology. All questions are compulsory. "
                  }
                  // helperText="Example:Total 90 questions including Botany and Zoology. All questions are compulsory.."
                  onChange={(v) =>
                    handleChange("test_paper_rules", v.target.value)
                  }
                  FormHelperTextProps={{
                    sx: { color: "tomato" }, // Aap yaha hex code bhi de sakte hain jaise '#ff0000'
                  }}
                />
              </TwoCol>
              <div className="pt-5 flex flex-col gap-4 ">
                <TextField
                  label="Test Paper Marking Scheme"
                  multiline
                  rows={2}
                  fullWidth
                  value={formData.test_paper_marking_scheme}
                  error={errors.test_paper_marking_scheme}
                  helperText={
                    errors.test_paper_marking_scheme
                      ? "Marking scheme is required"
                      : "Example: Each correct answer carries +4 marks. Each incorrect answer carries -1 mark. No marks deducted for unattempted questions. "
                  }
                  onChange={(v) =>
                    handleChange("test_paper_marking_scheme", v.target.value)
                  }
                  FormHelperTextProps={{
                    sx: { color: "tomato" }, // Aap yaha hex code bhi de sakte hain jaise '#ff0000'
                  }}
                />

                <Select
                  label="Language"
                  value={formData.test_paper_language}
                  error={errors.test_paper_language}
                  onChange={(v) => handleChange("test_paper_language", v)}
                  // options={[{ label: "English", value: "English" }]}
                  options={["English"]}
                />
              </div>

              <TwoCol>
                <TextField
                  label="Total Time per Question (in minute)"
                  type="number"
                  value={formData.total_time_per_test_paper_in_minute}
                  error={errors.test_paper_marking_scheme}
                  helperText={
                    errors.test_paper_marking_scheme
                      ? "Total time for each question is required"
                      : "Example: Total time for each question is required"
                  }
                  onChange={(e) => {
                    const val = Math.max(0, Number(e.target.value));
                    handleChange(
                      "total_time_per_test_paper_in_minute",
                      String(val),
                    );
                  }}
                  FormHelperTextProps={{
                    sx: { color: "tomato" }, // Aap yaha hex code bhi de sakte hain jaise '#ff0000'
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
                  error={errors.test_paper_difficulty}
                  onChange={(v) => handleChange("test_paper_difficulty", v)}
                  options={["Easy", "Moderate", "Hard"]}
                />

                <Select
                  label="Status"
                  value={formData.test_paper_status}
                  onChange={(v) => handleChange("test_paper_status", v)}
                  options={["Deactivate"]}
                />
              </TwoCol>
              <TwoCol>
                <p className=" flex justify-center "></p>
                <p className=" flex justify-center ">
                  <span>📜</span>
                  <span style={{ color: "tomato" }}>
                    Create question paper to activate status automatically
                  </span>
                </p>
              </TwoCol>
            </GlassCard>
            {/* Time Slot card */}
            <GlassCard>
              <SectionHeader title="Choose The Time Slot" />
              <TimeSlotPicker
                onChange={(val) => {
                  setTimeSlot(val);
                  // handleChange(
                  //   "test_paper_scheduled_at",
                  //   `${val.date?.toDateString()} ${val.time}`,
                  // );
                  if (val.date && val.time) {
                    const [time, modifier] = val.time.split(" "); // "04:00 PM"
                    let [hours, minutes] = time.split(":").map(Number);

                    if (modifier === "PM" && hours !== 12) hours += 12;
                    if (modifier === "AM" && hours === 12) hours = 0;

                    const localDate = new Date(val.date);
                    localDate.setHours(hours, minutes, 0, 0);

                    handleChange("test_paper_scheduled_at", localDate);
                  }
                }}
              />
              {errors.test_paper_scheduled_at && (
                <TwoCol>
                  <span
                    style={{
                      color: "#d32f2f", // MUI error red
                      fontSize: "0.75rem", // matches MUI helperText size
                      marginTop: 8,
                      marginLeft: 2,
                      fontFamily: "inherit",
                      border: "2px solid #d32f2f",
                      borderRadius: 5,
                      textAlign: "center",
                      padding: "4px 8px",
                      width: "fit-content",
                    }}>
                    Please choose the desired time slot 🕒
                  </span>
                  <span></span>
                </TwoCol>
              )}
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

function Select({ label, options, value, onChange, error }) {
  const labelId = `${label.replace(/\s+/g, "-").toLowerCase()}-label`;

  return (
    <FormControl fullWidth size="small" error={!!error}>
      <InputLabel id={labelId}>{label}</InputLabel>

      <MuiSelect
        labelId={labelId}
        value={value}
        label={label}
        onChange={(e) => onChange(e.target.value)}>
        {options.map((option, index) => {
          const val = typeof option === "object" ? option.value : option;
          const label = typeof option === "object" ? option.label : option;

          return (
            <MenuItem key={index} value={val}>
              {label}
            </MenuItem>
          );
        })}
      </MuiSelect>

      {error && <FormHelperText>{error}</FormHelperText>}
    </FormControl>
  );
}

// Clock and Calendar component for time slot selection
function TimeSlotPicker({ onChange }) {
  const [hours, setHours] = useState(12);
  const [minutes, setMinutes] = useState(0);
  const [ampm, setAmpm] = useState("AM");
  const [mode, setMode] = useState("hour");
  const [selectedDate, setSelectedDate] = useState(null);
  const [calYear, setCalYear] = useState(new Date().getFullYear());
  const [calMonth, setCalMonth] = useState(new Date().getMonth());
  const svgRef = useRef(null);
  const dragging = useRef(false);
  const today = new Date();

  const handleClockInteraction = (e) => {
    const svg = svgRef.current;
    if (!svg) return;
    const rect = svg.getBoundingClientRect();
    const cx = ((e.clientX - rect.left) / rect.width) * 200 - 100;
    const cy = ((e.clientY - rect.top) / rect.height) * 200 - 100;
    let angle = (Math.atan2(cy, cx) * 180) / Math.PI + 90;
    if (angle < 0) angle += 360;
    if (mode === "hour") setHours(Math.round(angle / 30) % 12 || 12);
    else setMinutes(Math.round(angle / 6) % 60);
  };

  const hAngle = ((hours % 12) * 30 + minutes * 0.5 - 90) * (Math.PI / 180);
  const mAngle = (minutes * 6 - 90) * (Math.PI / 180);
  const hx = 100 + 55 * Math.cos(hAngle);
  const hy = 100 + 55 * Math.sin(hAngle);
  const mx = 100 + 68 * Math.cos(mAngle);
  const my = 100 + 68 * Math.sin(mAngle);
  const dotX = mode === "hour" ? hx : mx;
  const dotY = mode === "hour" ? hy : my;

  const firstDay = new Date(calYear, calMonth, 1).getDay();
  const daysInMonth = new Date(calYear, calMonth + 1, 0).getDate();
  const prevDays = new Date(calYear, calMonth, 0).getDate();
  const calTitle = new Date(calYear, calMonth).toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  const changeMonth = (dir) => {
    const d = new Date(calYear, calMonth + dir);
    setCalYear(d.getFullYear());
    setCalMonth(d.getMonth());
  };

  const timeStr = `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")} ${ampm}`;
  const selectionLabel = selectedDate
    ? `${selectedDate.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })} · ${timeStr}`
    : "Pick a date from the calendar";

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: 24,
        alignItems: "start",
      }}>
      {/* ── CLOCK ── */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 10,
        }}>
        {/* Mode toggle */}
        <div style={{ display: "flex", gap: 6 }}>
          {["hour", "minute"].map((m) => (
            <button
              key={m}
              onClick={() => setMode(m)}
              style={{
                padding: "4px 14px",
                fontSize: 12,
                borderRadius: 20,
                border: "0.5px solid var(--card-border)",
                background: mode === m ? "var(--primary)" : "transparent",
                color: mode === m ? "#fff" : "var(--text-secondary)",
                cursor: "pointer",
                fontWeight: mode === m ? 600 : 400,
              }}>
              {m.charAt(0).toUpperCase() + m.slice(1)}
            </button>
          ))}
        </div>

        {/* SVG Clock Face */}
        <svg
          ref={svgRef}
          viewBox="0 0 200 200"
          width={200}
          height={200}
          style={{
            borderRadius: "50%",
            border: "1px solid var(--card-border)",
            background: "var(--card-bg)",
            cursor: "crosshair",
            userSelect: "none",
          }}
          onMouseDown={() => (dragging.current = true)}
          onMouseUp={() => (dragging.current = false)}
          onMouseLeave={() => (dragging.current = false)}
          onMouseMove={(e) => {
            if (dragging.current) handleClockInteraction(e);
          }}
          onClick={handleClockInteraction}>
          {/* Tick marks */}
          {Array.from({ length: 60 }, (_, i) => {
            const a = ((i * 6 - 90) * Math.PI) / 180;
            const big = i % 5 === 0;
            return (
              <line
                key={i}
                x1={100 + (big ? 88 : 92) * Math.cos(a)}
                y1={100 + (big ? 88 : 92) * Math.sin(a)}
                x2={100 + 96 * Math.cos(a)}
                y2={100 + 96 * Math.sin(a)}
                stroke={big ? "var(--text-secondary)" : "var(--card-border)"}
                strokeWidth={big ? 1.5 : 0.75}
              />
            );
          })}

          {/* Hour numbers */}
          {mode === "hour"
            ? Array.from({ length: 12 }, (_, i) => {
                const n = i + 1;
                const a = ((n * 30 - 90) * Math.PI) / 180;
                return (
                  <text
                    key={n}
                    x={100 + 76 * Math.cos(a)}
                    y={100 + 76 * Math.sin(a)}
                    textAnchor="middle"
                    dominantBaseline="central"
                    fontSize={13}
                    fill={
                      n === hours ? "var(--primary)" : "var(--text-primary)"
                    }
                    fontWeight={n === hours ? 600 : 400}>
                    {n}
                  </text>
                );
              })
            : Array.from({ length: 12 }, (_, i) => {
                const val = i * 5;
                const a = ((val * 6 - 90) * Math.PI) / 180;
                return (
                  <text
                    key={val}
                    x={100 + 76 * Math.cos(a)}
                    y={100 + 76 * Math.sin(a)}
                    textAnchor="middle"
                    dominantBaseline="central"
                    fontSize={11}
                    fill={
                      minutes === val ? "var(--primary)" : "var(--text-primary)"
                    }
                    fontWeight={minutes === val ? 600 : 400}>
                    {String(val).padStart(2, "0")}
                  </text>
                );
              })}

          {/* Hands */}
          <line
            x1={100}
            y1={100}
            x2={hx}
            y2={hy}
            stroke="var(--text-primary)"
            strokeWidth={3}
            strokeLinecap="round"
          />
          <line
            x1={100}
            y1={100}
            x2={mx}
            y2={my}
            stroke="var(--text-secondary)"
            strokeWidth={2}
            strokeLinecap="round"
          />
          <circle cx={100} cy={100} r={4} fill="var(--text-primary)" />
          <circle
            cx={dotX}
            cy={dotY}
            r={7}
            fill="var(--primary)"
            opacity={0.85}
          />
        </svg>

        {/* Time display */}
        <div
          style={{
            fontSize: 28,
            fontWeight: 700,
            letterSpacing: 1,
            color: "var(--text-primary)",
          }}>
          {String(hours).padStart(2, "0")}:{String(minutes).padStart(2, "0")}
        </div>

        {/* AM / PM */}
        <div style={{ display: "flex", gap: 4 }}>
          {["AM", "PM"].map((v) => (
            <button
              key={v}
              onClick={() => setAmpm(v)}
              style={{
                padding: "3px 12px",
                fontSize: 11,
                borderRadius: 12,
                border: "0.5px solid var(--card-border)",
                background: ampm === v ? "var(--primary)" : "transparent",
                color: ampm === v ? "#fff" : "var(--text-secondary)",
                cursor: "pointer",
              }}>
              {v}
            </button>
          ))}
        </div>
      </div>

      {/* ── CALENDAR ── */}
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {/* Month nav */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}>
          <button
            onClick={() => changeMonth(-1)}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              fontSize: 16,
              color: "var(--text-secondary)",
            }}>
            ‹
          </button>
          <span
            style={{
              fontSize: 12,
              fontWeight: 600,
              color: "var(--text-primary)",
            }}>
            {calTitle}
          </span>
          <button
            onClick={() => changeMonth(1)}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              fontSize: 20,
              color: "var(--text-secondary)",
            }}>
            ›
          </button>
        </div>

        {/* Day labels */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(7, 1fr)",
            textAlign: "center",
            fontSize: 10,
            color: "var(--text-secondary)",
            marginBottom: 2,
          }}>
          {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((d) => (
            <span key={d}>{d}</span>
          ))}
        </div>

        {/* Day cells */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(7, 1fr)",
            gap: 1,
          }}>
          {/* Prev month filler */}
          {Array.from({ length: firstDay }, (_, i) => (
            <div
              key={`p${i}`}
              style={{
                aspectRatio: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 9, // 👈 was 11
                opacity: 0.3,
                color: "var(--text-secondary)",
              }}>
              {prevDays - firstDay + 1 + i}
            </div>
          ))}

          {/* Current month days */}
          {Array.from({ length: daysInMonth }, (_, i) => {
            const d = i + 1;
            const dt = new Date(calYear, calMonth, d);
            const isToday = dt.toDateString() === today.toDateString();
            const isSel =
              selectedDate && dt.toDateString() === selectedDate.toDateString();
            return (
              <div
                key={d}
                onClick={() => {
                  setSelectedDate(dt);
                  onChange?.({ date: dt, time: timeStr });
                }}
                style={{
                  aspectRatio: 1,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 12,
                  borderRadius: "50%",
                  cursor: "pointer",
                  border:
                    isToday && !isSel ? "1px solid var(--primary)" : "none",
                  background: isSel ? "var(--primary)" : "transparent",
                  color: isSel ? "#fff" : "var(--text-primary)",
                  fontWeight: isSel ? 600 : 400,
                }}>
                {d}
              </div>
            );
          })}
        </div>

        {/* Selection summary pill */}
        <div
          style={{
            marginTop: 2,
            padding: "6px 10px", // 👈 was "10px 12px"
            borderRadius: 8,
            background: "var(--muted-bg)",
            border: "1px solid var(--card-border)",
            fontSize: 11, // 👈 was 12
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}>
          <span style={{ color: "var(--text-secondary)" }}>Scheduled</span>
          <span style={{ fontWeight: 600, color: "var(--text-primary)" }}>
            {selectionLabel}
          </span>
        </div>
      </div>
    </div>
  );
}
