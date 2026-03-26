import React, { useEffect, useState } from "react";
import HeroSection from "./HeroSection";
import ExamSection from "./ExamSection";
import SubjectSection from "./SubjectSection";
import TestpaperSection from "./TestpaperSection";
import { useParams } from "react-router-dom";
import { useSupabase } from "../../contextProvider/SupabaseProvider";
import { useNavigate } from "react-router-dom";
import { Box,Button,Snackbar,Alert } from "@mui/material";
import LoadingDialog from "../../components/Loading Screen/LoadingDialog";

export default function StudentEnrolledDetails() {
    const navigate=useNavigate()
    const {student_id,exam_id,subject_id,test_paper_ids} = useParams()
    const {fetchStudentInfo,fetchExamInfo,fecthSubjectInfo,fetchTestPaperInfo}=useSupabase()
    const [studentData,setStudentData]=useState([])
    const [examData,setExamData]=useState([])
    const [subjectData,setSubjectData]=useState([])
    const [testPaperData,setTestPaperData]=useState([])

    const [loading, setLoading] = useState(false);
const [snackbar, setSnackbar] = useState({
  open: false,
  message: "",
  severity: "success", // "success" | "error"
});
    const testPaperIdsArray = test_paper_ids
  ? test_paper_ids.split(",")
  : [];

  
   useEffect(() => {
  if (!student_id || !exam_id || !subject_id) return;

  const loadData = async () => {
    try {
      setLoading(true);

      const [
        stu_data,
        exam_data,
        subject_data,
        testpaper_data,
      ] = await Promise.all([
        fetchStudentInfo(student_id),
        fetchExamInfo(exam_id),
        fecthSubjectInfo(subject_id),
        fetchTestPaperInfo(testPaperIdsArray),
      ]);

      setStudentData(stu_data);
      setExamData(exam_data);
      setSubjectData(subject_data);
      setTestPaperData(testpaper_data);

    } catch (err) {
      setSnackbar({
    open: true,
    message: err.message || "Student data not fetched ❌",
    severity: "error",
  });
     
    } finally {
      setLoading(false);
    }
  };

  loadData();

}, [student_id, exam_id, subject_id, test_paper_ids]);

  return (
    <>
     <LoadingDialog open={loading} />
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
    <Box
  sx={{
    minHeight: "100vh",
    py: 12,
    px: { xs: 4, sm: 6 },
    bgcolor: "background.default",
    color: "text.primary",
  }}
>
      <div className="max-w-6xl mx-auto space-y-10">

        {/* ================= HERO SECTION ================= */}
        <HeroSection studentData={studentData}/>

        {/* ================= EXAM + SUBJECT ================= */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          {/* Exam */}
          <ExamSection examData={examData}/>

          {/* Subject */}
          <SubjectSection subjectData={subjectData}/>
        </div>

        {/* ================= TEST PAPER ================= */}
        <TestpaperSection testPaperData={testPaperData}/>

        {/* ================= FOOTER ================= */}
<Box
  sx={{
    display: "flex",
    flexDirection: { xs: "column", md: "row" },
    justifyContent: "flex-end",
    alignItems: "center",
    gap: 6,
    pt: 8,
    borderTop: (theme) => `1px solid ${theme.palette.divider}`,
  }}
>
<Button
  variant="contained"
  color="primary"
  onClick={() => navigate("/")}
  sx={{
    px: 4,
    py: 1.5,
    borderRadius: 3,
    fontWeight: 600,
    boxShadow: (theme) =>
      theme.palette.mode === "dark"
        ? "0 0 20px rgba(59,130,246,0.5)"
        : "0 4px 14px rgba(37,99,235,0.25)",
  }}
>
  🚀 Back to Dashboard
</Button>

          
        </Box>
      </div>
    </Box>
    </>
  );
}

