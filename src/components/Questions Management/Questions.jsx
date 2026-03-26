import React, { useEffect, useState, useMemo } from "react";
import { Box, Snackbar, Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useSupabase } from "../../contextProvider/SupabaseProvider";
import LoadingDialog from "../../components/Loading Screen/LoadingDialog";
import QuestionHeader from "./QuestionHeader";
import QuestionFilter from "./QuestionFilter";
import QuestionTable from "./QuestionTable";

export default function Questions() {
  const navigate = useNavigate();
  const {
    user,
    fetchTestpaperIdAndName,
    fetchSubjectsTestPapersQuestionsData,
    deleteSubjectAndTestpaperQuestionData,
  } = useSupabase();

  const [search, setSearch] = useState("");
  //   const [statusFilter, setStatusFilter] = useState("All");
  const [subjectsTestpapersQuestion, setSubjectsTestpapersQuestion] =
    useState(null);
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success", // "success" | "error"
  });
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);
  const [instituteTestPapersData, setinstituteTestPapersData] = useState(null);
  const [selectedTestPaperId, setSelectedTestPaperId] = useState("");

  useEffect(() => {
    const loadExamdata = async () => {
      try {
        setLoading(true);
        const data = await fetchTestpaperIdAndName(user.auth_user_id);
        setSnackbar({
          open: true,
          message: "Questions created successfully ✅",
          severity: "success",
        });
        setinstituteTestPapersData(data.TestPapersData);
        // ✅ SET DEFAULT SUBJECT HERE
        if (data.TestPapersData?.length > 0) {
          setSelectedTestPaperId(data.TestPapersData[0].id);
        }
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

  /* ---------------- FETCH EXAMS ---------------- */
  useEffect(() => {
    const loadTestpaperQuestiondata = async () => {
      try {
        if (!selectedTestPaperId) {
          setSubjectsTestpapersQuestion({ QuestionsData: [] });
          return;
        }

        setLoading(true);
        const data =
          await fetchSubjectsTestPapersQuestionsData(selectedTestPaperId);
        setSnackbar({
          open: true,
          message: "Questions fetched successfully ✅",
          severity: "success",
        });
        setSubjectsTestpapersQuestion(data);
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

    loadTestpaperQuestiondata();
  }, [selectedTestPaperId]);

  /* ---------------- FILTER LOGIC ---------------- */
  const filteredQuestions = useMemo(() => {
    const questions = subjectsTestpapersQuestion?.QuestionsData ?? [];

    return questions
      .filter((question) => {
        const questionText = question.question_text?.toLowerCase() || "";
        const searchText = search.toLowerCase().trim();

        // Alphabetical search
        const matchesSearch =
          searchText === "" ||
          questionText.startsWith(searchText) ||
          questionText.includes(searchText);

        return matchesSearch;
      })
      .sort((a, b) => a.question_text.localeCompare(b.question_text)); // A → Z
  }, [subjectsTestpapersQuestion, search]);
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
          <QuestionHeader />

          {/* FILTERS */}
          <QuestionFilter
            search={search}
            setSearch={setSearch}
            instituteTestPapersData={instituteTestPapersData}
            setSelectedTestPaperId={setSelectedTestPaperId}
            selectedTestPaperId={selectedTestPaperId}
          />

          {/* TABLE */}
          <QuestionTable
            subjectsTestpapersQuestion={{
              ...subjectsTestpapersQuestion,
              QuestionsData: filteredQuestions,
            }}
            navigate={navigate}
            institute_id={user.auth_user_id}
            deleteSubjectAndTestpaperQuestionData={
              deleteSubjectAndTestpaperQuestionData
            }
            fetchSubjectsTestPapersQuestionsData={
              fetchSubjectsTestPapersQuestionsData
            }
            setSubjectsTestpapersQuestion={setSubjectsTestpapersQuestion}
            setLoading={setLoading}
            selectedTestPaperId={selectedTestPaperId}
          />
        </Box>
      </Box>
    </>
  );
}
