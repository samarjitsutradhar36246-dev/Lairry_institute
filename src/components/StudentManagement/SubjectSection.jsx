import React from "react";
import { Box, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";

const SubjectSection = ({ subjectData }) => {
  if (!subjectData || subjectData.length === 0) return null;

  const theme = useTheme();

  const {
    subject_name,
    total_chapters,
    chapters_and_topics_name,
  } = subjectData[0];

  const chapterNames = chapters_and_topics_name.flatMap((cls) =>
    cls.chapters.map((ch) => ch.chapter_name)
  );

  return (
    <Box
      sx={{
        gridColumn: { md: "span 2" },
        borderRadius: 4,
        p: { xs: 3, sm: 4 },
        position: "relative",
        overflow: "hidden",

        background:
          theme.palette.mode === "dark"
            ? "linear-gradient(145deg, #1e293b, #0f172a)"
            : "linear-gradient(145deg, #ffffff, #f8fafc)",

        backdropFilter: "blur(12px)",
        border: `1px solid ${theme.palette.divider}`,

        boxShadow:
          theme.palette.mode === "dark"
            ? "0 10px 40px rgba(0,0,0,0.5)"
            : "0 10px 40px rgba(0,0,0,0.08)",

        transition: "all 0.3s ease",
      }}
    >
      {/* Decorative Glow */}
      <Box
        sx={{
          position: "absolute",
          top: -50,
          right: -50,
          width: 150,
          height: 150,
          background: "primary.main",
          opacity: 0.08,
          borderRadius: "50%",
          filter: "blur(60px)",
        }}
      />

      {/* Header */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 4,
          flexWrap: "wrap",
          gap: 1,
        }}
      >
        {/* ✅ Subject Name Color Fixed */}
        <Typography
          variant="h6"
          sx={{
            fontWeight: 800,
            letterSpacing: 0.5,
            color:
              theme.palette.mode === "dark"
                ? "#ffffff"
                : "#000000",
          }}
        >
          {subject_name}
        </Typography>

        <Typography
          variant="body2"
          sx={{
            px: 2,
            py: 0.5,
            borderRadius: 2,
            fontWeight: 600,
            backgroundColor:
              theme.palette.mode === "dark"
                ? "rgba(255,255,255,0.05)"
                : theme.palette.grey[100],
            border: `1px solid ${theme.palette.divider}`,
            color: "text.secondary",
          }}
        >
          {chapterNames.length} Chapters
        </Typography>
      </Box>

      {/* Chapter Tags */}
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 2,
        }}
      >
        {chapterNames.map((c, i) => {
          const isActive = i === 0;

          return (
            <Box
              key={i}
              sx={{
                px: 3,
                py: 1.2,
                borderRadius: 3,
                fontSize: "0.85rem",
                fontWeight: 600,
                cursor: "pointer",
                transition: "all 0.3s ease",
                position: "relative",

                // Default styles
                backgroundColor:
                  theme.palette.mode === "dark"
                    ? "rgba(255,255,255,0.04)"
                    : theme.palette.grey[100],
                color: "text.secondary",
                border: `1px solid ${theme.palette.divider}`,

                // Optional: Slight highlight for first tag initially
                ...(isActive && {
                  border: `1px solid ${theme.palette.primary.main}`,
                }),

                // ✅ Hover for ALL tags
                "&:hover": {
                  transform: "translateY(-4px)",
                  backgroundColor: theme.palette.primary.main,
                  color: "#ffffff",
                  border: `1px solid ${theme.palette.primary.main}`,
                  boxShadow:
                    theme.palette.mode === "dark"
                      ? "0 0 25px rgba(99,102,241,0.7)"
                      : "0 10px 30px rgba(99,102,241,0.4)",
                },
              }}
            >
              {c}
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};

export default SubjectSection;
