import { RocketLaunch } from "@mui/icons-material";
import {
  Box,
  Typography,
  Stack,
  Button,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const TestpaperHeader = () => {
  const navigate = useNavigate();

  return (
    <Stack
      direction={{ xs: "column", sm: "row" }}
      justifyContent="space-between"
      alignItems="center"
      spacing={2}
    >
      <Box>
        {/* Main Heading */}
        <Typography
          variant="h4"
          fontWeight={700}
          sx={{
            color: "text.primary",
          }}
        >
          Test Paper Overview
        </Typography>

        {/* Subtitle */}
        <Typography
          fontSize={14}
          sx={{
            color: "text.secondary",
            mt: 0.5,
          }}
        >
          Manage, view, and launch Testpaper for your institute.
        </Typography>
      </Box>

      {/* Primary Action Button */}
      <Button
        variant="contained"
        color="primary"
        startIcon={<RocketLaunch />}
        onClick={() =>
          navigate("/institute/exam/subject/create-testpapers")
        }
        sx={(theme) => ({
          px: 2.5,
          py: 1,
          fontWeight: 600,
          boxShadow:
            theme.palette.mode === "dark"
              ? "0 4px 14px rgba(59,130,246,0.3)"
              : "0 4px 14px rgba(37,99,235,0.25)",
        })}
      >
        Create new Testpaper
      </Button>
    </Stack>
  );
};

export default TestpaperHeader;
