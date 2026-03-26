import React, { useEffect, useState, useMemo } from "react";
import { Box, Snackbar, Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useSupabase } from "../../contextProvider/SupabaseProvider";
import ExamHeader from "../../components/ExamManagement/ExamHeader";
import ExamFilter from "../../components/ExamManagement/ExamFilter";
import ExamTable from "../../components/ExamManagement/ExamTable";
import LoadingDialog from "../Loading Screen/LoadingDialog";

export default function Exams() {
  const navigate = useNavigate();
  const { user, fetchInstituteAndExamData, deleteExamData } = useSupabase();

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [instituteExamsData, setinstituteExamsData] = useState(null);

  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success", // "success" | "error"
  });
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);
  /* ---------------- FETCH EXAMS ---------------- */
  useEffect(() => {
    const loadExamdata = async () => {
      try {
        setLoading(true);
        const data = await fetchInstituteAndExamData(user.auth_user_id);
        setinstituteExamsData(data);
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

  /* ---------------- FILTER LOGIC ---------------- */
  const filteredExams = useMemo(() => {
    const exams = instituteExamsData?.ExamsData ?? [];

    return exams
      .filter((exam) => {
        const examName = exam.exam_title?.toLowerCase() || "";
        const searchText = search.toLowerCase().trim();

        // Alphabetical search
        const matchesSearch =
          searchText === "" ||
          examName.startsWith(searchText) ||
          examName.includes(searchText);

        // Status filter
        const matchesStatus =
          statusFilter === "All" ||
          exam.exam_status?.toLowerCase() === statusFilter.toLowerCase();

        return matchesSearch && matchesStatus;
      })
      .sort((a, b) => a.exam_title.localeCompare(b.exam_title)); // A → Z
  }, [instituteExamsData, search, statusFilter]);

  return (
    <>
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
      <Box
        sx={{
          ml: { xs: 0, lg: "35px" }, // 👈 sidebar offset
          px: { xs: 2, md: 3 }, // 👈 internal padding
          py: { xs: 2, md: 3 },
          transition: "margin-left 0.3s ease",
        }}>
        <Box
          maxWidth="1400px"
          mx="auto"
          display="flex"
          flexDirection="column"
          gap={3}>
          {/* HEADER */}
          <ExamHeader />

          {/* FILTERS */}
          <ExamFilter
            search={search}
            setSearch={setSearch}
            statusFilter={statusFilter}
            setStatusFilter={setStatusFilter}
          />

          {/* TABLE */}
          <ExamTable
            instituteExamsData={{
              ...instituteExamsData,
              ExamsData: filteredExams,
            }}
            navigate={navigate}
            institute_id={user.auth_user_id}
            deleteExamData={deleteExamData}
            fetchInstituteAndExamData={fetchInstituteAndExamData}
            setinstituteExamsData={setinstituteExamsData}
            setLoading={setLoading}
          />
        </Box>
      </Box>
    </>
  );
}
