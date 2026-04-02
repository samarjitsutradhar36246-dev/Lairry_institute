import { useNavigate } from "react-router-dom";
import { useSupabase } from "../../contextProvider/SupabaseProvider";
import { useState, useEffect } from "react";
import { Box, Snackbar, Alert } from "@mui/material";
import { useMemo } from "react";
import LoadingDialog from "../../components/Loading Screen/LoadingDialog";
import SubjectHeader from "./SubjectHeader";
import SubjectFilter from "./SubjectFilter";
import SubjectTable from "./SubjectTable";
export default function Subjects() {
  const navigate = useNavigate();
  const {
    user,
    fetchInstituteAndExamData,
    fetchExamsSubjectData,
    fetchInstituteAndSubjectData,
    deleteExamAndSubjectData,
  } = useSupabase();
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [instituteAndSubjects, setInstituteAndSubjects] = useState(null);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success", // "success" | "error"
  });
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);
  const [instituteExamsData, setinstituteExamsData] = useState(null);
  const [selectedExamId, setSelectedExamId] = useState("");

  useEffect(() => {
    const loadExamdata = async () => {
      try {
        setLoading(true);
        const data = await fetchInstituteAndExamData(user.auth_user_id);
        setinstituteExamsData(data.ExamsData);
        // ✅ SET DEFAULT SUBJECT HERE
        if (data.ExamsData?.length > 0) {
          setSelectedExamId(data.ExamsData[0].id);
        }
      } catch (err) {
        setSnackbar({
          open: true,
          message: error.message || "Subjects Data Fetching Error ❌",
          severity: "error",
        });
      } finally {
        setLoading(false);
      }
    };

    if (user?.auth_user_id) loadExamdata();
  }, [user?.auth_user_id]);

  useEffect(() => {
    const loadSubjectdata = async () => {
      try {
        if (!selectedExamId) {
          setInstituteAndSubjects({ SubjectsData: [] });
          return;
        }
        setLoading(true);
        const data = await fetchExamsSubjectData(selectedExamId);
        setInstituteAndSubjects(data);
      } catch (error) {
        setSnackbar({
          open: true,
          message: error.message || "Subjects Data Fetching Error ❌",
          severity: "error",
        });
      } finally {
        setLoading(false);
      }
    };

    loadSubjectdata();
  }, [selectedExamId]);

  const filteredSubjects = useMemo(() => {
    const subjects = instituteAndSubjects?.SubjectsData ?? [];

    return subjects
      .filter((subject) => {
        const subjectName = subject.subject_name?.toLowerCase() || "";
        const searchText = search.toLowerCase().trim();

        const matchesSearch =
          searchText === "" ||
          subjectName.startsWith(searchText) ||
          subjectName.includes(searchText);

        // const matchesStatus =
        //   statusFilter === "All" ||
        //   subject.subject_status?.toLowerCase() ===
        //     statusFilter.toLowerCase();

        return matchesSearch;
      })
      .sort((a, b) => a.subject_name.localeCompare(b.subject_name));
  }, [instituteAndSubjects, search]);

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
          <SubjectHeader />

          <SubjectFilter
            search={search}
            setSearch={setSearch}
            // statusFilter={statusFilter}
            // setStatusFilter={setStatusFilter}
            instituteExamsData={instituteExamsData}
            setSelectedExamId={setSelectedExamId}
            selectedExamId={selectedExamId}
          />

          <SubjectTable
            instituteAndSubjects={{
              ...instituteAndSubjects,
              SubjectsData: filteredSubjects,
            }}
            navigate={navigate}
            institute_id={user.auth_user_id}
            deleteExamAndSubjectData={deleteExamAndSubjectData}
            //fetchInstituteAndSubjectData={fetchInstituteAndSubjectData}
            fetchExamsSubjectData={fetchExamsSubjectData}
            setInstituteAndSubjects={setInstituteAndSubjects}
            setLoading={setLoading}
            selectedExamId={selectedExamId}
          />
        </Box>
      </Box>
    </>
  );
}
