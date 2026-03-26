import {
  Box,
  Typography,
  Stack,
  Button,
} from "@mui/material";
import { RocketLaunch } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const SubjectHeader = () => {
  const navigate = useNavigate();

  return (
    <Stack
      direction={{ xs: "column", sm: "row" }}
      justifyContent="space-between"
      alignItems="center"
      spacing={2}
    >
      <Box>
        <Typography
          variant="h4"
          fontWeight={700}
          sx={(theme) => ({
            color: theme.palette.text.primary,
          })}
        >
          Subjects Overview
        </Typography>

        <Typography
          sx={(theme) => ({
            color: theme.palette.text.secondary,
            fontSize: 14,
          })}
        >
          Manage, view, and launch subjects for your institute.
        </Typography>
      </Box>

      <Button
        variant="contained"
        color="primary"
        startIcon={<RocketLaunch />}
        onClick={() => navigate("/institute/create-subjects")}
        sx={(theme) => ({
          boxShadow:
            theme.palette.mode === "dark"
              ? "0 4px 14px rgba(59,130,246,0.4)"
              : "0 4px 14px rgba(37,99,235,0.3)",
        })}
      >
        Launch New Subjects
      </Button>
    </Stack>
  );
};

export default SubjectHeader;
