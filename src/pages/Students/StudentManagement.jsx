import * as React from "react";
import {
  Box,
  Typography,
  Button,
  TextField,
  Chip,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  MenuItem,
  Select,
  Avatar,
  Stack,
  Paper
} from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";
import DownloadIcon from "@mui/icons-material/Download";
import AddIcon from "@mui/icons-material/Add";
import FilterListIcon from "@mui/icons-material/FilterList";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import CallIcon from "@mui/icons-material/Call";

import { supabase } from "../../supabase/SupabaseClient";
import { useInstituteSupabase } from "../../supabase/InstituteSupabaseProvider";

export default function StudentManagement() {
  const { user: institute } = useInstituteSupabase();
  const [students, setStudents] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  // Add these states at the top
const [searchText, setSearchText] = React.useState("");
const [examFilter, setExamFilter] = React.useState("All");
const [statusFilter, setStatusFilter] = React.useState("All");

// Derived filtered students
const filteredStudents = students.filter((s) => {
  const matchesSearch =
    s.name.toLowerCase().includes(searchText.toLowerCase()) ||
    s.email.toLowerCase().includes(searchText.toLowerCase()) ||
    s.id.toLowerCase().includes(searchText.toLowerCase());

  const matchesExam =
    examFilter === "All" ||
    s.exams.some((e) => e.exam_title === examFilter);

  const matchesStatus =
    statusFilter === "All" || s.status === statusFilter;

  return matchesSearch && matchesExam && matchesStatus;
});


  React.useEffect(() => {
    if (!institute?.id) return;
    fetchStudents();
  }, [institute?.id]);

  const fetchStudents = async () => {
    setLoading(true);

    try {
      console.log("Fetching purchases for institute:", institute);

      /** 1️ Fetch all institute purchases */
      const { data: purchases, error: pricingErr } = await supabase
        .from("institute_pricing")
        .select("user_id, exam_id, created_at")
        .eq("institute_id", institute.auth_user_id);
      console.log("purchases", purchases);

      if (pricingErr) {
        console.error("Error fetching institute_pricing:", pricingErr);
        setStudents([]);
        return;
      }

      if (!purchases?.length) {
        console.log("No purchases found");
        setStudents([]);
        return;
      }

      // Unique user and exam IDs
      const userIds = [...new Set(purchases.map((p) => p.user_id))];
      const examIds = [...new Set(purchases.map((p) => p.exam_id))];

      /** 2️ Fetch exam details */
      const { data: examsData, error: examsErr } = await supabase
        .from("institute_exams_data")
        .select("id, exam_title")
        .in("id", examIds);

      if (examsErr) {
        console.error("Error fetching exams data:", examsErr);
        setStudents([]);
        return;
      }

      const examMap = {};
      examsData?.forEach((e) => {
        examMap[e.id] = e.exam_title;
      });

      /** 3️ Fetch student profiles */
      const { data: usersData, error: usersErr } = await supabase
        .from("users")
        .select("id, full_name, email, phone_number, profile_image, qualification")
        .in("id", userIds);

      if (usersErr) {
        console.error("Error fetching users:", usersErr);
        setStudents([]);
        return;
      }

      /** 4️ Group purchases by student */
      const grouped = {};

      purchases.forEach((p) => {
        if (!grouped[p.user_id]) {
          const u = usersData.find((x) => x.id === p.user_id);
          if (!u) return;

          grouped[p.user_id] = {
            id: u.id,
            name: u.full_name,
            qualification:u.qualification,
            email: u.email,
            phone: u.phone_number,
            avatar: u.profile_image,
            exams: [],
             lastActivity: new Date(
    purchases
      .filter((purchase) => purchase.user_id === p.user_id)
      .map((purchase) => new Date(purchase.created_at))
      .sort((a, b) => b - a)[0] // latest purchase
  ).toLocaleString(), // format as string
            status: "Active", // placeholder
          };
        }

        if (!grouped[p.user_id].exams.find((e) => e.exam_id === p.exam_id)) {
          grouped[p.user_id].exams.push({
            exam_id: p.exam_id,
            exam_title: examMap[p.exam_id] || "Unknown Exam",
          });
        }
      });

      const groupedArr = Object.values(grouped);
      console.log("Final student list:", groupedArr);

      setStudents(groupedArr);
    } catch (err) {
      console.error("Unexpected error in fetchStudents:", err);
      setStudents([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      // sx={{
      //   minHeight: "100vh",
      //   bgcolor: "#141118",
      //   color: "white",
      //   fontFamily: "Lexend, sans-serif",
      //   position: "relative",
      //   overflow: "hidden",
      // }}
    >
      {/* Background glow blobs */}
      <Box
        // sx={{
        //   position: "absolute",
        //   top: "-20%",
        //   right: "-10%",
        //   width: 800,
        //   height: 800,
        //   bgcolor: "primary.main",
        //   opacity: 0.2,
        //   filter: "blur(120px)",
        //   borderRadius: "50%",
        // }}
      />
      <Box
        sx={{
          position: "absolute",
          bottom: "-20%",
          left: "-10%",
          width: 600,
          
          bgcolor: "#1e3a8a",
          opacity: 0.2,
          filter: "blur(100px)",
          borderRadius: "50%",
        }}
      />

      {/* Content */}
      <Box sx={{ position: "relative", zIndex: 1, 
        // p: { xs: 3, md: 6 }
         py: { xs: 2, md: 3 },
       }}>
        {/* Header */}
        <Stack
          direction={{ xs: "column", md: "row" }}
          justifyContent="space-between"
          spacing={3}
        >
          <Box>
            <Typography variant="h4" fontWeight={700}>
              Student Directory
            </Typography>
            <Typography sx={{ color: "#a89cba", mt: 1, maxWidth: 520 }}>
              Manage enrollments, track student progress, and organize exam
              cohorts efficiently.
            </Typography>
          </Box>

          <Stack direction="row" spacing={2}>
            <Button
              startIcon={<DownloadIcon />}
              sx={{
                px: 3,
                height: 48,
                borderRadius: 3,
                bgcolor: "#7b25f4",
                color: "white",
                fontWeight: 700,
                boxShadow: "0 0 20px rgba(123,37,244,0.5)",
                "&:hover": { bgcolor: "#6a1ee0" },
              }}
            >
              Export
            </Button>
            {/* <Button
              startIcon={<AddIcon />}
              sx={{
                px: 3,
                height: 48,
                borderRadius: 3,
                bgcolor: "#7b25f4",
                color: "white",
                fontWeight: 700,
                boxShadow: "0 0 20px rgba(123,37,244,0.5)",
                "&:hover": { bgcolor: "#6a1ee0" },
              }}
            >
              Add Student
            </Button> */}
          </Stack>
        </Stack>

 {/* Search & Filters */}
<Paper
  sx={{
    mt: 5,
    p: 1.5,
    borderRadius: 4,
    background: "rgba(20,17,24,0.7)",
    backdropFilter: "blur(12px)",
    border: "1px solid rgba(255,255,255,0.08)",
  }}
>
  <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
    <TextField
      fullWidth
      placeholder="Search by name, email, or student ID..."
      value={searchText}
      onChange={(e) => setSearchText(e.target.value)}
      InputProps={{
        startAdornment: <SearchIcon sx={{ mr: 1, color: "#a89cba" }} />,
      }}
      sx={{
        input: { color: "white" },
        bgcolor: "transparent",
      }}
    />

    <Select
      value={examFilter}
      onChange={(e) => setExamFilter(e.target.value)}
        sx={{
    ...filterBtn, 
    "& .MuiSelect-icon": {
      color: "#c4b5fd", // arrow color
    },
    "&:hover .MuiSelect-icon": {
      color: "#7b25f4", // optional hover color
    },
  }}
    >
      <MenuItem value="All">Exam: All</MenuItem>
      {/* Add dynamic exam options */}
      {Array.from(new Set(students.flatMap((s) => s.exams.map((e) => e.exam_title)))).map(
        (exam) => (
          <MenuItem key={exam} value={exam}>
            {exam}
          </MenuItem>
        )
      )}
    </Select>

    <Select
      value={statusFilter}
      onChange={(e) => setStatusFilter(e.target.value)}
        sx={{
    ...filterBtn, 
    "& .MuiSelect-icon": {
      color: "#c4b5fd", // arrow color
    },
    "&:hover .MuiSelect-icon": {
      color: "#7b25f4", // optional hover color
    },
  }}
    >
      <MenuItem value="All">Status: All</MenuItem>
      <MenuItem value="Active">Active</MenuItem>
      <MenuItem value="Inactive">Inactive</MenuItem>
    </Select>
  </Stack>
</Paper>

{/* Active Filters */}
<Stack direction="row" spacing={2} mt={3} alignItems="center">
  <Typography sx={{ color: "#a89cba", fontSize: 13 }}>
    Active Filters:
  </Typography>

  {searchText && (
    <Chip
      label={`Search: ${searchText}`}
      onDelete={() => setSearchText("")}
      sx={{
        bgcolor: "rgba(123,37,244,0.2)",
        color: "#c4b5fd",
        border: "1px solid rgba(123,37,244,0.3)",
      }}
    />
  )}

  {examFilter !== "All" && (
    <Chip
      label={`Exam: ${examFilter}`}
      onDelete={() => setExamFilter("All")}
      sx={{
        bgcolor: "rgba(34,211,238,0.2)",
        color: "#22d3ee",
        border: "1px solid rgba(34,211,238,0.3)",
      }}
    />
  )}

  {statusFilter !== "All" && (
    <Chip
      label={`Status: ${statusFilter}`}
      onDelete={() => setStatusFilter("All")}
      sx={{
        bgcolor: "rgba(34,197,94,0.15)",
        color: "#4ade80",
        border: "1px solid rgba(34,197,94,0.3)",
      }}
    />
  )}

  {(searchText || examFilter !== "All" || statusFilter !== "All") && (
    <Button sx={{ color: "#a89cba", fontSize: 12 }} onClick={() => {
      setSearchText("");
      setExamFilter("All");
      setStatusFilter("All");
    }}>
      Clear all
    </Button>
  )}
</Stack>


        {/* Table */}
        <TableContainer
          sx={{
            mt: 4,
            borderRadius: 4,
            background: "rgba(20,17,24,0.7)",
            backdropFilter: "blur(12px)",
            border: "1px solid rgba(255,255,255,0.08)",
            color: "white"
          }}
        >
          <Table>
            <TableHead>
              <TableRow sx={{ bgcolor: "rgba(255,255,255,0.05)" }}>
                {[
                  "Student Name",
                  "Contact Info",
                  "Registered Exams",
                  "Latest Purchase At",
                  "Status",
                  "Actions",
                ].map((h) => (
                  <TableCell key={h} sx={{ color: "#a89cba" }}>
                    {h}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>

            <TableBody>
              {!loading && students.map((s) => (
                <TableRow key={s.id} hover>
                  <TableCell>
                    <Stack direction="row" spacing={2} alignItems="center">
                      {s.avatar ? (
                        <Avatar src={s.avatar} />
                      ) : (
                        <Avatar sx={{ bgcolor: "#3b0764" }}>
                          {s.name?.[0]}
                        </Avatar>
                      )}
                      <Box>
                        <Typography
                          sx={{
                            color: "#ffffff",
                            fontWeight: 500,
                            lineHeight: 1.2,
                          }}
                        >
                          {s.name}
                        </Typography>

                        <Typography
                          sx={{
                            color: "#a89cba",
                            fontSize: 12,
                            mt: 0.25,
                          }}
                        >
                          {s.qualification}
                        </Typography>
                      </Box>
                    </Stack>
                  </TableCell>

                  <TableCell>
                    <Stack spacing={0.5}>
                      <Stack direction="row" spacing={1} alignItems="center">
                        <MailOutlineIcon sx={{ fontSize: 14, color: "#a89cba" }} />
                        <Typography
                          sx={{
                            color: "#e2e8f0",
                            fontSize: 13,
                          }}
                        >
                          {s.email}
                        </Typography>
                      </Stack>

                      <Stack direction="row" spacing={1} alignItems="center">
                        <CallIcon sx={{ fontSize: 14, color: "#a89cba" }} />
                        <Typography
                          sx={{
                            color: "#a89cba",
                            fontSize: 12,
                          }}
                        >
                          {s.phone}
                        </Typography>
                      </Stack>
                    </Stack>
                  </TableCell>

                  <TableCell>
                    <Stack direction="row" spacing={1} flexWrap="wrap">
                      {s.exams.map((e) => (
                        <Chip 
                          key={e.exam_id} 
                          label={e.exam_title} 
                          sx={examChip(e.exam_title)} 
                        />
                      ))}
                    </Stack>
                  </TableCell>

                  <TableCell sx={{ color: "#a89cba" }}>
                    {s.lastActivity}
                  </TableCell>

                  <TableCell>
                    <Chip label={s.status} sx={statusChip(s.status)} />
                  </TableCell>

                  <TableCell align="right">
                    <IconButton>
                      <MoreVertIcon sx={{ color: "#a89cba" }} />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {/* Pagination */}
          <Stack
            direction={{ xs: "column", sm: "row" }}
            justifyContent="space-between"
            alignItems="center"
            sx={{ p: 3, borderTop: "1px solid rgba(255,255,255,0.08)" }}
          >
            <Typography fontSize={13} color="#a89cba">
              Showing <b>1–{students.length}</b> of <b>{students.length}</b> students
            </Typography>

            <Stack direction="row" spacing={2} alignItems="center" >
              <Typography fontSize={13} color="#a89cba">
                Rows per page:
              </Typography>
              <Select size="small" defaultValue={10} sx={{color:"white", border:"1px solid #a89cba",     borderRadius: 1,
    "& .MuiSelect-icon": {
      color: "#c4b5fd", 
    },}}>
                {[10, 20, 50].map((n) => (
                  <MenuItem key={n} value={n}>
                    {n}
                  </MenuItem>
                ))}
              </Select>
              <IconButton sx={{color:"#a89cba"}}>
                <ChevronLeftIcon />
              </IconButton>
              <IconButton sx={{color:"#a89cba"}}>
                <ChevronRightIcon />
              </IconButton>
            </Stack>
          </Stack>
        </TableContainer>
      </Box>
    </Box>
  );
}

/* ---------- helpers ---------- */

const filterBtn = {
  height: 48,
  px: 2,
  borderRadius: 3,
  bgcolor: "rgba(255,255,255,0.05)",
  border: "1px solid rgba(255,255,255,0.08)",
  color: "white",
};

const examChip = (exam) => ({
  bgcolor:
    exam === "JEE Advanced"
      ? "rgba(168,85,247,0.15)"
      : exam === "NEET Mock"
      ? "rgba(34,211,238,0.15)"
      : exam === "BITSAT Prep"
      ? "rgba(251,146,60,0.15)"
      : exam === "JEE Mains"
      ? "rgba(59,130,246,0.15)"
      : "rgba(255,255,255,0.1)",
  color: "#e5e7eb",
  border: "1px solid rgba(255,255,255,0.15)",
});

const statusChip = (status) => ({
  bgcolor:
    status === "Active"
      ? "rgba(34,197,94,0.15)"
      : status === "Inactive"
      ? "rgba(156,163,175,0.15)"
      : "rgba(239,68,68,0.15)",
  color:
    status === "Active"
      ? "#4ade80"
      : status === "Inactive"
      ? "#9ca3af"
      : "#f87171",
  border: "1px solid rgba(255,255,255,0.15)",
});