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
import { useInstituteSupabase } from "../../supabase/InstituteSupabaseProvider";
import Exams from "../ExamManagement/Exams";
import StudentManagement from "../Students/StudentManagement";

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
  const {user} = useInstituteSupabase();
  return (
    <Box
      sx={{
        // minHeight: "100vh",
        // background:
        //   "radial-gradient(circle at top left, rgba(19,127,236,0.15), transparent 40%), radial-gradient(circle at bottom right, rgba(168,85,247,0.15), transparent 40%), #050a10",
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
              Welcome {user?.institute_name}
            </Typography>
            <Typography color="#94a3b8" maxWidth={520}>
              Your institute's AI-powered performance overview is ready.
            </Typography>
          </Stack>
        </GlassCard>



        {/* ---------------- TABLE + ACTIONS ---------------- */}
        
        <Grid  >
          
     <Exams/>
          

          
             <StudentManagement/>
            
        </Grid>
      </Box>
    </Box>
  );
}