import {
  Box,
  Typography,
  Stack,
  Button,
} from "@mui/material";
import { RocketLaunch } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const ExamHeader = () => {
  const navigate = useNavigate();

  return (
    <Stack
      direction={{ xs: "column", sm: "row" }}
      justifyContent="space-between"
      alignItems="center"
      spacing={2}
      sx={{
        bgcolor: "background.paper",
        p: 3,
        borderRadius: 3,
        border: "1px solid",
        borderColor: "divider",
      }}
    >
      <Box>
        <Typography
          variant="h4"
          fontWeight={700}
          color="text.primary"
        >
          Exams Overview
        </Typography>

        <Typography
          color="text.secondary"
          fontSize={14}
          mt={0.5}
        >
          Manage, view, and launch exams for your institute.
        </Typography>
      </Box>

      <Button
        variant="contained"
        color="primary"
        startIcon={<RocketLaunch />}
        onClick={() => navigate("/institute/create-exams")}
        sx={{
          textTransform: "none",
          fontWeight: 600,
          px: 3,
          py: 1.2,
          boxShadow: 3,
        }}
      >
        Launch New Exam
      </Button>
    </Stack>
  );
};

export default ExamHeader;
