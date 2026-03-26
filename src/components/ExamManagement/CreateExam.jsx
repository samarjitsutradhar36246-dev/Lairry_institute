import { useSupabase } from "../../contextProvider/SupabaseProvider";
import { useState } from "react";
import {
  FormControl,
  InputLabel,
  Select as MuiSelect,
  MenuItem,
  FormHelperText,Snackbar, Alert
} from "@mui/material";
import LoadingDialog from "../Loading Screen/LoadingDialog";
export default function CreateExam() {
  const { user, createInstituteExam } = useSupabase();
  const [errors, setErrors] = useState({});
      const [loading,setLoading]=useState(false)
  
const [snackbar, setSnackbar] = useState({
  open: false,
  message: "",
  severity: "success", // "success" | "error"
});
  const [formData, setFormData] = useState({
    exam_name: "",
    category: "",
    language:"English",
    icon: "",
    status: "Active",
  });
   const handleChange = (key, value) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };
  const validateForm = () => {
  const newErrors = {};

  if (!formData.exam_name) newErrors.exam_name = "Please select exam name";
  if (!formData.category) newErrors.category = "Please select category";
  if (!formData.language) newErrors.language = "Please select language";
  if (!formData.icon) newErrors.icon = "Please select exam icon";
  if (!formData.status) newErrors.status = "Please select status";

  setErrors(newErrors);

  return Object.keys(newErrors).length === 0;
};

  return (
<div className="relative min-h-screen bg-[var(--bg-default)] text-[var(--text-primary)] font-manrope overflow-hidden ml-5">
      <LoadingDialog open={loading}/>
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
              <h1 className="text-3xl font-black">Create New Exam</h1>
              
            </div>

            <p className=" text-[var(--text-secondary)] mt-2 max-w-xl text-sm">
              Configure the essential details for your upcoming examination.
              
            </p>
          </div>

          {/* Header Actions */}
          <div className="flex gap-3">
           

            <button
  onClick={async () => {
      if (!validateForm()) return;

    try {
      setLoading(true)
      await createInstituteExam({
        institute_id:user.auth_user_id,
        exam_name: formData.exam_name,
        category: formData.category,
        language:formData.language,
        icon: formData.icon,
        status: formData.status,
        
      });

      setSnackbar({
    open: true,
    message: "Exam created successfully ✅",
    severity: "success",
  });

      // optional reset
      setFormData({
        exam_name: "",
        category: "",
        language:"English",
        icon: "",
        status: "Active",
      });
          setErrors({});

    } catch (err) {
      setSnackbar({
    open: true,
    message: err.message || "Failed to create exam ❌",
    severity: "error",
  });
    }finally{
      setLoading(false)
    }
  }}
className="
px-6 py-2 rounded-lg font-bold
text-white
bg-[var(--primary)]
hover:bg-[var(--secondary)]
transition-all duration-300
shadow-lg
hover:shadow-[0_0_20px_var(--primary)]
active:scale-95
"

>
  Create Exam →
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

            
<Select label="Exam Name" 
value={formData.exam_name}
  onChange={(v) => handleChange("exam_name", v)}
    error={errors.exam_name}

options={[
                  "","JEE",
                  "IIT","NIT",
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
                  "CMAT","MAT","IIFT","NMAT","KMAT","CTET","UGC NET","UCEED","NATA","CUET","UPSC (CSE)","UPSC (IES/ISS)","UPPSC","APSC","JPSC","APPSC",
                  "NDA","CDS","IMU CET","SSC (CGL)","SSC (CHSL)","SSC (JE)","SSC (GD)","SSC (MTS)","RRB (NTPC/JE/ALP/GROUP D)","IBPS (PO/Clerk)","ISRO","DRDO"
                ]} />
              <TwoCol>
                <Select label="Category"
                value={formData.category}
                error={errors.category}

  onChange={(v) => handleChange("category", v)}
                options={[
                  "","Engineering & Science",
                  "Medical & Life Sciences",
                  "Law & Management",
                  "Civil Services","Defense & Uniformed Services","Staff Selection & Public Sector",
                  "Other Academic/Professional"
                ]} />

                <Select label="Language"
                value={formData.language}
                error={errors.language}

  onChange={(v) => handleChange("language", v)}
                options={[
                  "English",
                  
                ]} />
              </TwoCol>

              <TwoCol>
                <Select label="Choose Exam Icon"
                value={formData.icon}
                error={errors.icon}

  onChange={(v) => handleChange("icon", v)}
                options={[
                  "","psychology",
                  "science",
                  "rocket",
                  "quiz"
                ]} />

                <Select label="Status"
                value={formData.status}
                error={errors.status}

  onChange={(v) => handleChange("status", v)}
                options={[
                  "Active",
                  "Deactive",
                                  ]} />
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
    <div className="p-6 rounded-xl bg-[var(--card-bg)] backdrop-blur-xl border border-[var(--card-border)] shadow-xl">
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





function Select({ label, options, value, onChange, error }) {
  const labelId = `${label.replace(/\s+/g, "-").toLowerCase()}-label`;

  return (
    <FormControl
      fullWidth
      size="small"
      error={!!error}
      sx={{
        mt: 1,
      }}
    >
      <InputLabel id={labelId}>{label}</InputLabel>

      <MuiSelect
        labelId={labelId}
        value={value}
        label={label}
        onChange={(e) => onChange(e.target.value)}
      >
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



