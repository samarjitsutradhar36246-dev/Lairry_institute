import { Box, Typography, Chip } from "@mui/material";
import { useTheme } from "@mui/material/styles";

const ExamSection = ({ examData }) => {
  const theme = useTheme();

  return (
    <Box
      
      
      sx={{
        backgroundColor: "background.paper",
        border: (theme) => `1px solid ${theme.palette.divider}`,
        borderRadius: 4,
        p: 4,
        transform: "scale(0.98)",
        boxShadow:
          theme.palette.mode === "dark"
            ? "0 6px 30px rgba(0,0,0,0.4)"
            : "0 6px 30px rgba(0,0,0,0.06)",
      }}
    >
      <Typography
        variant="h6"
        sx={{
          fontWeight: 700,
          mb: 3,
          color: "text.primary",
        }}
        className="exam-item"
      >
        Exam Details
      </Typography>

      {examData.map((data, index) => (
        <Box
          key={index}
          sx={{ display: "flex", flexDirection: "column", gap: 4 }}
        >
          {/* Exam Name */}
          <Box className="exam-item">
            <Typography
              variant="caption"
              sx={{
                textTransform: "uppercase",
                fontWeight: 600,
                letterSpacing: 1,
                color: "text.secondary",
              }}
            >
              Exam Name
            </Typography>

            <Typography
              variant="body1"
              sx={{
                fontWeight: 600,
                fontSize: "1.1rem",
                color: "text.primary",
                mt: 0.5,
              }}
            >
              {data.exam_title}
            </Typography>
          </Box>

          {/* Category */}
          <Box className="exam-item">
            <Typography
              variant="caption"
              sx={{
                textTransform: "uppercase",
                fontWeight: 600,
                letterSpacing: 1,
                color: "text.secondary",
                mb: 1,
                display: "block",
              }}
            >
              Category
            </Typography>

            <Chip
              label={data.exam_category}
              size="small"
              sx={{
                px: 1.5,
                fontWeight: 500,
                backgroundColor:
                  theme.palette.mode === "dark"
                    ? "rgba(59,130,246,0.15)"
                    : "rgba(37,99,235,0.08)",
                color: "primary.main",
                border: `1px solid ${
                  theme.palette.mode === "dark"
                    ? "rgba(59,130,246,0.4)"
                    : "rgba(37,99,235,0.25)"
                }`,
              }}
            />
          </Box>

          {/* Language */}
          <Box className="exam-item">
            <Typography
              variant="caption"
              sx={{
                textTransform: "uppercase",
                fontWeight: 600,
                letterSpacing: 1,
                color: "text.secondary",
                mb: 1,
                display: "block",
              }}
            >
              Language
            </Typography>

            <Chip
              label={data.language}
              size="small"
              sx={{
                px: 1.5,
                fontWeight: 500,
                backgroundColor:
                  theme.palette.mode === "dark"
                    ? "rgba(59,130,246,0.15)"
                    : "rgba(37,99,235,0.08)",
                color: "primary.main",
                border: `1px solid ${
                  theme.palette.mode === "dark"
                    ? "rgba(59,130,246,0.4)"
                    : "rgba(37,99,235,0.25)"
                }`,
              }}
            />
          </Box>

          {/* Exam Status */}
          <Box className="exam-item">
            <Typography
              variant="caption"
              sx={{
                textTransform: "uppercase",
                fontWeight: 600,
                letterSpacing: 1,
                color: "text.secondary",
                mb: 1,
                display: "block",
              }}
            >
              Exam Status
            </Typography>

            <Chip
              label={data.exam_status}
              size="small"
              sx={{
                px: 1.5,
                fontWeight: 500,
                backgroundColor:
                  theme.palette.mode === "dark"
                    ? "rgba(59,130,246,0.15)"
                    : "rgba(37,99,235,0.08)",
                color: "primary.main",
                border: `1px solid ${
                  theme.palette.mode === "dark"
                    ? "rgba(59,130,246,0.4)"
                    : "rgba(37,99,235,0.25)"
                }`,
              }}
            />
          </Box>
        </Box>
      ))}
    </Box>
  );
};

export default ExamSection;
