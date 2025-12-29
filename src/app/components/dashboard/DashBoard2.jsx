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
} from "@mui/icons-material";

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
export default function DashBoard2() {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        background:
          "radial-gradient(circle at top left, rgba(19,127,236,0.15), transparent 40%), radial-gradient(circle at bottom right, rgba(168,85,247,0.15), transparent 40%), #050a10",


        px: { xs: 2, md: 5, xl: 4 },


        py: { xs: 2, md: 3 },
      }}
    >

      <Box maxWidth="1400px" mx="auto" display="flex" flexDirection="column" gap={4}>
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
        <Grid container spacing={3}>
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
              sub: "2 Live currently running",
              color: "#a855f7",
              icon: <AssignmentTurnedIn />,
              progress: 40,
            },
          ].map((card, i) => (
            <Grid item xs={12} md={4} key={i}>
              <GlassCard sx={{ p: 3, height: "100%" }}>
                <Stack spacing={2}>
                  <Stack direction="row" justifyContent="space-between">
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
                      }}
                    >
                      {card.icon}
                    </Box>
                  </Stack>
                  <Typography fontSize={13} color={card.color}>
                    {card.sub}
                  </Typography>
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
        <Grid container spacing={3}>
          <Grid item xs={12} lg={8}>
            <GlassCard>
              <CardContent sx={{ p: 0 }}>
                <Box sx={{ p: 3, borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                  <Typography fontSize={18} fontWeight={700} color="white">
                    Exams Overview
                  </Typography>
                  <Typography fontSize={13} color="#94a3b8">
                    Real-time status of recent assessments
                  </Typography>
                </Box>
                <Table>
                  <TableHead>
                    <TableRow>
                      {["Exam Name", "Date", "Status", "Action"].map((h) => (
                        <TableCell
                          key={h}
                          sx={{
                            color: "#94a3b8",
                            textTransform: "uppercase",
                            fontSize: 12,
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
                          <Stack direction="row" spacing={2}>
                            <Box
                              sx={{
                                width: 32,
                                height: 32,
                                borderRadius: 1,
                                bgcolor: "rgba(255,255,255,0.08)",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                              }}
                            >
                              {row.icon}
                            </Box>
                            <Box>
                              <Typography color="white" fontWeight={600}>
                                {row.title}
                              </Typography>
                              <Typography fontSize={12} color="#94a3b8">
                                {row.sub}
                              </Typography>
                            </Box>
                          </Stack>
                        </TableCell>
                        <TableCell sx={{ color: "#94a3b8" }}>
                          {row.date}
                        </TableCell>
                        <TableCell>
                          <Chip
                            label={row.status}
                            sx={{
                              bgcolor: `${row.color}20`,
                              color: row.color,
                              fontWeight: 600,
                            }}
                          />
                        </TableCell>
                        <TableCell align="right">
                          <IconButton sx={{ color: "#94a3b8" }}>
                            {row.action}
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </GlassCard>
          </Grid>

          <Grid item xs={12} lg={4}>
            <Stack spacing={3}>
              <Typography fontSize={18} fontWeight={700} color="white">
                Quick Actions
              </Typography>

              <GlassCard sx={{ p: 3, cursor: "pointer" }}>
                <Stack direction="row" spacing={2} alignItems="center">
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
                    }}
                  >
                    <RocketLaunch />
                  </Box>
                  <Box flex={1}>
                    <Typography color="white" fontWeight={700}>
                      Launch New Exam
                    </Typography>
                    <Typography fontSize={12} color="#94a3b8">
                      Setup AI-proctored test
                    </Typography>
                  </Box>
                </Stack>
              </GlassCard>

              <GlassCard sx={{ p: 3, borderStyle: "dashed" }}>
                <Stack direction="row" spacing={2}>
                  <Lightbulb sx={{ color: "#facc15" }} />
                  <Box>
                    <Typography color="#e5e7eb" fontWeight={600}>
                      Pro Tip
                    </Typography>
                    <Typography fontSize={12} color="#94a3b8">
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
                }}
              >
                <CheckCircle sx={{ fontSize: 36, color: "#64748b", mb: 1 }} />
                <Typography color="#94a3b8">All systems optimal</Typography>
                <Typography fontSize={12} color="#64748b">
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
