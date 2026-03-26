import React, { useEffect, useState, useMemo } from "react";
import { Box, Snackbar, Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useSupabase } from "../../contextProvider/SupabaseProvider";
import LoadingDialog from "../../components/Loading Screen/LoadingDialog";
import TestpaperHeader from "./TestpaperHeader";
import TestpaperFilter from "./TestpaperFilter";
import TestpaperTable from "./TestpaperTable";
export default function TestPapers() {
  const navigate = useNavigate();
  const {
    user,
    fetchInstituteAndSubjectData,
    fetchSubjectsTestPapersData,
    deleteSubjectAndTestpaperData,
  } = useSupabase();
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [subjectsTestpaper, setSubjectsTestpaper] = useState(null);

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success", // "success" | "error"
  });
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  const [instituteSubjectsData, setinstituteSubjectsData] = useState(null);
  const [selectedSubjectId, setSelectedSubjectId] = useState("");

  useEffect(() => {
    const loadSubjectNameAndTestPaperIds = async () => {
      try {
        setLoading(true);
        const data = await fetchInstituteAndSubjectData(user.auth_user_id);
        setinstituteSubjectsData(data.SubjectsData);

        // ✅ SET DEFAULT SUBJECT HERE
        if (data.SubjectsData?.length > 0) {
          setSelectedSubjectId(data.SubjectsData[0].id);
        }
      } catch (err) {
        setSnackbar({
          open: true,
          message: err.message || "Testpaper Data Fetching Error ❌",
          severity: "error",
        });
      } finally {
        setLoading(false);
      }
    };

    if (user?.auth_user_id) loadSubjectNameAndTestPaperIds();
  }, [user?.auth_user_id]);

  /* ---------------- FETCH EXAMS ---------------- */

  useEffect(() => {
    const loadTestpaperdata = async () => {
      try {
        if (!selectedSubjectId) {
          setSubjectsTestpaper({ TestPapersData: [] });
          return;
        }
        // await new Promise(resolve => setTimeout(resolve, 0));
        setLoading(true);

        const data = await fetchSubjectsTestPapersData(selectedSubjectId);
        setSubjectsTestpaper(data);
      } catch (err) {
        setSnackbar({
          open: true,
          message: err.message || "Testpaper Fetching Error ❌",
          severity: "error",
        });
      } finally {
        setLoading(false);
      }
    };

    loadTestpaperdata();
  }, [selectedSubjectId]);

  /* ---------------- FILTER LOGIC ---------------- */
  const filteredTestpapers = useMemo(() => {
    const testpapers = subjectsTestpaper?.TestPapersData ?? [];

    return testpapers
      .filter((testpaper) => {
        const testpaperName = testpaper.test_paper_name?.toLowerCase() || "";
        const searchText = search.toLowerCase().trim();

        // Alphabetical search
        const matchesSearch =
          searchText === "" ||
          testpaperName.startsWith(searchText) ||
          testpaperName.includes(searchText);

        return matchesSearch;
      })
      .sort((a, b) => a.test_paper_name.localeCompare(b.test_paper_name)); // A → Z
  }, [subjectsTestpaper, search, statusFilter, selectedSubjectId]);

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
          <TestpaperHeader />

          {/* FILTERS */}
          <TestpaperFilter
            search={search}
            setSearch={setSearch}
            statusFilter={statusFilter}
            setStatusFilter={setStatusFilter}
            instituteSubjectsData={instituteSubjectsData}
            setSelectedSubjectId={setSelectedSubjectId}
            selectedSubjectId={selectedSubjectId}
          />

          {/* TABLE */}
          <TestpaperTable
            subjectsTestpaper={{
              ...subjectsTestpaper,
              TestPapersData: filteredTestpapers,
            }}
            navigate={navigate}
            institute_id={user.auth_user_id}
            deleteSubjectAndTestpaperData={deleteSubjectAndTestpaperData}
            fetchSubjectsTestPapersData={fetchSubjectsTestPapersData}
            setSubjectsTestpaper={setSubjectsTestpaper}
            setLoading={setLoading}
            selectedSubjectId={selectedSubjectId}
          />
        </Box>
      </Box>
    </>
  );
}
