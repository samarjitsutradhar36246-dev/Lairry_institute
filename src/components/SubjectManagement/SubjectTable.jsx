import {
  Box,
  Typography,
  CardContent,
  Stack,
  Chip,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Card,
  TableContainer,
  TablePagination,
  FormControl,
  Select,
  MenuItem
} from "@mui/material";
import PsychologyIcon from "@mui/icons-material/Psychology";
import ScienceIcon from "@mui/icons-material/Science";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import QuizIcon from "@mui/icons-material/Quiz";
import { useState, useMemo } from "react";

const ICON_MAP = {
  psychology: <PsychologyIcon />,
  science: <ScienceIcon />,
  rocket: <RocketLaunchIcon />,
  quiz: <QuizIcon />,
};

const SubjectTable = ({
  instituteAndSubjects,
  navigate,
  deleteExamAndSubjectData,
  fetchExamsSubjectData,
  setInstituteAndSubjects,
  setLoading,
  selectedExamId
}) => {

  const subjects = instituteAndSubjects?.SubjectsData ?? [];

  /* -------------------- SUBJECT TABLE PAGINATION -------------------- */

  const [subjectPage, setSubjectPage] = useState(0);
  const [subjectRowsPerPage, setSubjectRowsPerPage] = useState(10);

  const paginatedSubjects = subjects.slice(
    subjectPage * subjectRowsPerPage,
    subjectPage * subjectRowsPerPage + subjectRowsPerPage
  );

  /* -------------------- CHAPTER TABLE FILTER + PAGINATION -------------------- */

  const [selectedSubject, setSelectedSubject] = useState("All");
  const [chapterPage, setChapterPage] = useState(0);
  const [chapterRowsPerPage, setChapterRowsPerPage] = useState(10);

  const flattenedChapters = useMemo(() => {
    const data = [];

    subjects.forEach((subject) => {
      if (selectedSubject !== "All" && subject.subject_name !== selectedSubject)
        return;

      subject.chapters_and_topics_name?.forEach((classes) => {
        classes.chapters?.forEach((chapter) => {
          data.push({
            className: classes.class,
            subjectName: subject.subject_name,
            chapterName: chapter.chapter_name,
            topics: chapter.topics,
            status: subject.subject_status
          });
        });
      });
    });

    return data;
  }, [subjects, selectedSubject]);

  const paginatedChapters = flattenedChapters.slice(
    chapterPage * chapterRowsPerPage,
    chapterPage * chapterRowsPerPage + chapterRowsPerPage
  );

  return (
    <GlassCard>
      <CardContent sx={{ p: 0 }}>

        {/* ================= SUBJECT TABLE ================= */}

        <Box sx={{ p: 3, borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}>
          <Typography fontSize={18} fontWeight={700}>
            All Subjects
          </Typography>
        </Box>

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                {["Subject Name", "Descriptions", "Total Chapter", "Status", "Subject Action"].map((h) => (
                  <TableCell
                    key={h}
                    sx={(theme) => ({
                      color: theme.palette.text.secondary,
                      textTransform: "uppercase",
                      fontSize: 12,
                      fontWeight: 600
                    })}
                  >
                    {h}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>

            <TableBody>
              {paginatedSubjects.map((subject) => (
                <TableRow key={subject.id} hover>

                  <TableCell>
                    <Stack direction="row" spacing={2} alignItems="center">
                      <Box
                        sx={(theme) => ({
                          width: 36,
                          height: 36,
                          borderRadius: 1,
                          bgcolor:
                            theme.palette.mode === "dark"
                              ? "rgba(255,255,255,0.08)"
                              : theme.palette.grey[100],
                          color: theme.palette.primary.main,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        })}
                      >
                        {ICON_MAP[subject.icon] ?? <QuizIcon />}
                      </Box>

                      <Typography fontWeight={600} fontSize={14}>
                        {subject.subject_name}
                      </Typography>
                    </Stack>
                  </TableCell>

                  <TableCell sx={(theme) => ({ color: theme.palette.text.secondary })}>
                    {subject.subject_description}
                  </TableCell>

                  <TableCell sx={(theme) => ({ color: theme.palette.text.secondary })}>
                    {subject.total_chapters}
                  </TableCell>

                  <TableCell>
                    <Chip
                      label={subject.subject_status}
                      size="small"
                      color={subject.subject_status === "Active" ? "success" : "error"}
                      variant="outlined"
                    />
                  </TableCell>

                  <TableCell>
                    <Typography
                      component="span"
                      sx={{ color: "primary.main", cursor: "pointer", mr: 2 }}
                      onClick={() => navigate(`/institute/update-subject/${subject.id}`)}
                    >
                      Edit
                    </Typography>

                    <Typography
                      component="span"
                      sx={{ color: "error.main", cursor: "pointer" }}
                      onClick={async () => {
                        const confirmDelete = window.confirm(
                          "Are you sure you want to delete this exam?"
                        );
                        if (!confirmDelete) return;

                        setLoading(true);
                        await deleteExamAndSubjectData(subject.id);
                        const updated = await fetchExamsSubjectData(selectedExamId);
                        setInstituteAndSubjects(updated);
                        setLoading(false);
                      }}
                    >
                      Delete
                    </Typography>
                  </TableCell>

                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <TablePagination
          component="div"
          count={subjects.length}
          page={subjectPage}
          onPageChange={(e, newPage) => setSubjectPage(newPage)}
          rowsPerPage={subjectRowsPerPage}
          onRowsPerPageChange={(e) => {
            setSubjectRowsPerPage(parseInt(e.target.value, 10));
            setSubjectPage(0);
          }}
          rowsPerPageOptions={[5, 10, 20]}
        />

        {/* ================= CHAPTER TABLE ================= */}

        <Box sx={{ p: 3, borderTop: (theme) => `1px solid ${theme.palette.divider}` }}>
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Typography fontSize={18} fontWeight={700}>
              All Chapters and Topics
            </Typography>

            <FormControl size="small" sx={{ minWidth: 200 }}>
              <Select
                value={selectedSubject}
                onChange={(e) => {
                  setSelectedSubject(e.target.value);
                  setChapterPage(0);
                }}
              >
                <MenuItem value="All">All Subjects</MenuItem>
                {subjects.map((s) => (
                  <MenuItem key={s.id} value={s.subject_name}>
                    {s.subject_name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Stack>
        </Box>

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                {["Class", "Subject Name", "Chapter Name", "Topics", "Status"].map((h) => (
                  <TableCell
                    key={h}
                    sx={(theme) => ({
                      color: theme.palette.text.secondary,
                      textTransform: "uppercase",
                      fontSize: 12,
                      fontWeight: 600
                    })}
                  >
                    {h}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>

            <TableBody>
              {paginatedChapters.map((row, index) => (
                <TableRow key={index} hover>
                  <TableCell>{row.className}</TableCell>
                  <TableCell>{row.subjectName}</TableCell>
                  <TableCell>{row.chapterName}</TableCell>
                  <TableCell>
                    {row.topics && Array.isArray(row.topics) ? (
                      <Box component="ul" sx={{ pl: 2, m: 0 }}>
                        {row.topics.map((topic, index) => (
                          <Box
                            component="li"
                            key={index}
                            sx={{
                              color: "text.secondary",
                              fontSize: 14,
                              lineHeight: 1.6
                            }}
                          >
                            {topic}
                          </Box>
                        ))}
                      </Box>
                    ) : typeof row.topics === "string" ? (
                      <Box component="ul" sx={{ pl: 2, m: 0 }}>
                        {row.topics.split(",").map((topic, index) => (
                          <Box
                            component="li"
                            key={index}
                            sx={{
                              color: "text.secondary",
                              fontSize: 14,
                              lineHeight: 1.6
                            }}
                          >
                            {topic.trim()}
                          </Box>
                        ))}
                      </Box>
                    ) : (
                      "-"
                    )}
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={row.status}
                      size="small"
                      color={row.status === "Active" ? "success" : "error"}
                      variant="outlined"
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <TablePagination
          component="div"
          count={flattenedChapters.length}
          page={chapterPage}
          onPageChange={(e, newPage) => setChapterPage(newPage)}
          rowsPerPage={chapterRowsPerPage}
          onRowsPerPageChange={(e) => {
            setChapterRowsPerPage(parseInt(e.target.value, 10));
            setChapterPage(0);
          }}
          rowsPerPageOptions={[5, 10, 20]}
        />

      </CardContent>
    </GlassCard>
  );
};

/* ---------------- GLASS CARD ---------------- */

const GlassCard = ({ children, sx }) => (
  <Card
    sx={(theme) => ({
      background:
        theme.palette.mode === "dark"
          ? "rgba(17,24,39,0.7)"
          : theme.palette.background.paper,
      backdropFilter:
        theme.palette.mode === "dark" ? "blur(14px)" : "none",
      border: `1px solid ${theme.palette.divider}`,
      borderRadius: 3,
      color: theme.palette.text.primary,
      ...sx,
    })}
  >
    {children}
  </Card>
);

export default SubjectTable;