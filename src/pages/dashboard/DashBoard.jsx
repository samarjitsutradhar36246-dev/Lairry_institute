import React from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Chip,
  Button,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  LinearProgress,
  Stack,
  IconButton,
} from "@mui/material";
import {
  TrendingUp,
  Groups,
  AssignmentTurnedIn,
  Science,
  Calculate,
  Psychology,
  HistoryEdu,
  Visibility,
  Download,
  RocketLaunch,
  Lightbulb,
  CheckCircle,
  PlayCircleOutline,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

/* ---------------- GLASS CARD ---------------- */
const GlassCard = ({ children, sx }) => (
  <Card
    sx={{
      background: "rgba(15,21,32,0.75)",
      backdropFilter: "blur(14px)",
      border: "1px solid rgba(255,255,255,0.08)",
      borderRadius: 3,
      color: "#e5e7eb",
      ...sx,
    }}
  >
    {children}
  </Card>
);

/* ---------------- DASHBOARD ---------------- */
export default function DashBoard() {
  const navigate = useNavigate()
  return (
    <Box
      sx={{
        minHeight: "100vh",
        background:
          "radial-gradient(circle at top left, rgba(19,127,236,0.15), transparent 40%), radial-gradient(circle at bottom right, rgba(168,85,247,0.15), transparent 40%), #050a10",
        px: { xs: 2, md: 4 },
        py: { xs: 2, md: 3 },
      }}
    >
      <Box maxWidth="1400px" mx="auto" display="flex" flexDirection="column" gap={3}>
        {/* ---------------- HERO ---------------- */}
        <GlassCard sx={{ p: 4, position: "relative", overflow: "hidden" }}>
          <Box
            sx={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(90deg, rgba(19,127,236,0.25), transparent)",
            }}
          />
          <Box
            sx={{
              position: "absolute",
              right: 0,
              top: 0,
              width: "45%",
              height: "100%",
              backgroundImage:
                "url('https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=2000&q=80')",
              backgroundSize: "cover",
              backgroundPosition: "center",
              opacity: 0.18,
              mixBlendMode: "overlay",
            }}
          />
          <Stack spacing={2} sx={{ position: "relative" }}>
            <Chip
              label="System Operational"
              sx={{
                alignSelf: "flex-start",
                bgcolor: "rgba(255,255,255,0.08)",
                color: "#22d3ee",
                fontWeight: 600,
              }}
            />
            <Typography variant="h4" fontWeight={700} color="white">
              Welcome back, IIT Delhi
            </Typography>
            <Typography color="#94a3b8" maxWidth={520}>
              Your institute's AI-powered performance overview is ready. You have
              3 active exams today.
            </Typography>
          </Stack>
        </GlassCard>

        {/* ---------------- METRICS ---------------- */}
        <Grid container spacing={3} justifyContent="center">
          {[
            {
              title: "Total Revenue",
              value: "₹12,45,000",
              sub: "+12% from last month",
              color: "#22c55e",
              icon: <TrendingUp />,
              progress: 75,
            },
            {
              title: "Active Students",
              value: "1,250",
              sub: "+58 new enrollments",
              color: "#22d3ee",
              icon: <Groups />,
              progress: 60,
            },
            {
              title: "Exams Conducted",
              value: "45",
              sub: "This academic year",
              color: "#a855f7",
              icon: <AssignmentTurnedIn />,
              progress: 40,
            },
            {
              title: "Exams Live",
              value: "2",
              sub: "Currently running",
              color: "#f97316",
              icon: <PlayCircleOutline />,
              progress: 20,
            },
          ].map((card, i) => (
            <Grid item xs={12} sm={6} lg={3} key={i}>
<GlassCard
  sx={{
    width: "317px",      // set the card width you want
    maxWidth: "100%",    // make it responsive on smaller screens
    py: 3,
    px: 3,               // small padding just for inner spacing
    boxSizing: "border-box",
  }}
>
  <Stack spacing={2}>
    {/* Top row: Title, Value, Icon */}
    <Stack direction="row" justifyContent="space-between" alignItems="center">
      <Box>
        <Typography color="#94a3b8" fontSize={14}>
          {card.title}
        </Typography>
        <Typography fontSize={24} fontWeight={700} color="white">
          {card.value}
        </Typography>
      </Box>

      <Box
        sx={{
          p: 1.5,
          borderRadius: 2,
          bgcolor: `${card.color}20`,
          color: card.color,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minWidth: 50,
        }}
      >
        {card.icon}
      </Box>
    </Stack>

    {/* Subtitle */}
    <Typography fontSize={13} color={card.color} sx={{ wordBreak: "break-word" }}>
      {card.sub}
    </Typography>

    {/* Progress bar */}
    <LinearProgress
      variant="determinate"
      value={card.progress}
      sx={{
        height: 6,
        borderRadius: 4,
        bgcolor: "#1e293b",
        "& .MuiLinearProgress-bar": {
          bgcolor: card.color,
        },
      }}
    />
  </Stack>
</GlassCard>


            </Grid>
          ))}
        </Grid>

        {/* ---------------- TABLE + ACTIONS ---------------- */}
        <Grid container spacing={3} justifyContent="center"  >
          <Grid item sx={{ width: 328 * 2 }}>
            <GlassCard sx={{ width:"100%", height: "100%" }}>
              <CardContent sx={{ p: 0 }}>
                <Box sx={{ p: 3, borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                  <Typography fontSize={18} fontWeight={700} color="white">
                    Exams Overview
                  </Typography>
                  <Typography fontSize={13} color="#94a3b8">
                    Real-time status of recent assessments
                  </Typography>
                </Box >
                <Box sx={{ overflowX: "auto" }}>
                <Table sx={{ minWidth: 600 }}>
                  <TableHead>
                    <TableRow>
                      {["Exam Name", "Date", "Status", "Action"].map((h) => (
                        <TableCell
                          key={h}
                          sx={{
                            color: "#94a3b8",
                            textTransform: "uppercase",
                            fontSize: 12,
                            fontWeight: 600,
                          }}
                        >
                          {h}
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {[
                      {
                        icon: <Science />,
                        title: "JEE Advanced Mock 4",
                        sub: "Batch A, B",
                        date: "Oct 24, 2023",
                        status: "Live",
                        color: "#22c55e",
                        action: <Visibility />,
                      },
                      {
                        icon: <Calculate />,
                        title: "Class 12 Math Term 1",
                        sub: "Batch C",
                        date: "Oct 22, 2023",
                        status: "Completed",
                        color: "#64748b",
                        action: <Download />,
                      },
                      {
                        icon: <Psychology />,
                        title: "AI Aptitude Test",
                        sub: "All Batches",
                        date: "Oct 20, 2023",
                        status: "Completed",
                        color: "#64748b",
                        action: <Download />,
                      },
                      {
                        icon: <HistoryEdu />,
                        title: "History Weekly Quiz",
                        sub: "Batch A",
                        date: "Oct 18, 2023",
                        status: "Completed",
                        color: "#64748b",
                        action: <Download />,
                      },
                    ].map((row, i) => (
                      <TableRow key={i} hover>
                        <TableCell>
                          <Stack direction="row" spacing={2} alignItems="center">
                            <Box
                              sx={{
                                width: 36,
                                height: 36,
                                borderRadius: 1,
                                bgcolor: "rgba(255,255,255,0.08)",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                flexShrink: 0,
                              }}
                            >
                              {row.icon}
                            </Box>
                            <Box>
                              <Typography color="white" fontWeight={600} fontSize={14}>
                                {row.title}
                              </Typography>
                              <Typography fontSize={12} color="#94a3b8">
                                {row.sub}
                              </Typography>
                            </Box>
                          </Stack>
                        </TableCell>
                        <TableCell sx={{ color: "#94a3b8", fontSize: 14 }}>
                          {row.date}
                        </TableCell>
                        <TableCell>
                          <Chip
                            label={row.status}
                            size="small"
                            sx={{
                              bgcolor: `${row.color}20`,
                              color: row.color,
                              fontWeight: 600,
                            }}
                          />
                        </TableCell>
                        <TableCell align="right">
                          <IconButton size="small" sx={{ color: "#94a3b8" }}>
                            {row.action}
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                </Box>
              </CardContent>
            </GlassCard>
          </Grid>

          <Grid item sx={{ width: 328 * 2 }}>
            <Stack spacing={3} sx={{ height: "100%" }}>
              <Typography fontSize={18} fontWeight={700} color="white">
                Quick Actions
              </Typography>

              <GlassCard sx={{ p: 3, cursor: "pointer", transition: "all 0.2s", "&:hover": { borderColor: "rgba(19,127,236,0.3)" } }}>
                <Stack direction="row" spacing={2} alignItems="center" onClick={()=>navigate("/institute/exams/create")}>
                  <Box
                    sx={{
                      width: 48,
                      height: 48,
                      borderRadius: 2,
                      bgcolor: "rgba(19,127,236,0.2)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#137fec",
                      flexShrink: 0,
                    }}
                  >
                    <RocketLaunch />
                  </Box>
                  <Box flex={1} >
                    <Typography color="white" fontWeight={700} fontSize={15}>
                      Launch New Exam
                    </Typography>
                    <Typography fontSize={12} color="#94a3b8">
                      Setup AI-proctored test
                    </Typography>
                  </Box>
                </Stack>
              </GlassCard>

              <GlassCard sx={{ p: 3, borderStyle: "dashed" }}>
                <Stack direction="row" spacing={2} alignItems="flex-start">
                  <Lightbulb sx={{ color: "#facc15", flexShrink: 0 }} />
                  <Box>
                    <Typography color="#e5e7eb" fontWeight={600} fontSize={14}>
                      Pro Tip
                    </Typography>
                    <Typography fontSize={12} color="#94a3b8" mt={0.5}>
                      You can schedule exams in advance using the calendar view
                      in the Exams tab.
                    </Typography>
                  </Box>
                </Stack>
              </GlassCard>

              <GlassCard
                sx={{
                  p: 3,
                  textAlign: "center",
                  bgcolor: "rgba(255,255,255,0.03)",
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <CheckCircle sx={{ fontSize: 36, color: "#64748b", mb: 1 }} />
                <Typography color="#94a3b8" fontSize={14}>
                  All systems optimal
                </Typography>
                <Typography fontSize={12} color="#64748b" mt={0.5}>
                  Ready for next action
                </Typography>
              </GlassCard>
            </Stack>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}