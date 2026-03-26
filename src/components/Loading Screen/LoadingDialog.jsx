import React, { useEffect, useRef } from "react";
import { Dialog, Box, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import gsap from "gsap";

export default function LoadingDialog({ open }) {
  const theme = useTheme();
  const logoRef = useRef(null);

  const logoText = "L.AI.RRY".split("");

  const handleEnter = () => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      tl.fromTo(
        ".logo-letter",
        {
          y: -80,
          opacity: 0,
          scale: 0.8,
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          stagger: 0.08,
          duration: 0.9,
          ease: "bounce.out",
        }
      );

      tl.to(
        ".dot",
        {
          y: -8,
          repeat: -1,
          yoyo: true,
          stagger: 0.2,
          duration: 0.6,
          ease: "power1.inOut",
        },
        "-=0.4"
      );
    }, logoRef);

    return () => ctx.revert();
  };

  useEffect(() => {
    if (open) {
      // Blur BEFORE dialog fully mounts
      if (document.activeElement instanceof HTMLElement) {
        document.activeElement.blur();
      }
    }
  }, [open]);

  return (
    <Dialog
      open={open}
      onClose={() => {}}
      fullWidth
      maxWidth="xs"
      keepMounted
      disableAutoFocus
      disableEnforceFocus
      disableRestoreFocus
      TransitionProps={{ onEntered: handleEnter }}
      PaperProps={{
        sx: {
          borderRadius: 4,
          p: 6,
          textAlign: "center",
          background:
            theme.palette.mode === "dark"
              ? "linear-gradient(145deg,#0f172a,#1e293b)"
              : "linear-gradient(145deg,#ffffff,#f1f5f9)",
          backdropFilter: "blur(20px)",
          border: `1px solid ${theme.palette.divider}`,
          boxShadow:
            theme.palette.mode === "dark"
              ? `0 0 40px ${theme.palette.primary.main}55`
              : `0 20px 60px rgba(15,23,42,0.1)`,
        },
      }}
    >
      <Box ref={logoRef}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            mb: 2,
          }}
        >
          {logoText.map((letter, index) => (
            <Typography
              key={index}
              className="logo-letter"
              variant="h4"
              sx={{
                fontWeight: 900,
                letterSpacing: 2,
                color: "text.primary",
                display: "inline-block",
              }}
            >
              {letter}
            </Typography>
          ))}
        </Box>

        <Box sx={{ display: "flex", justifyContent: "center", gap: 1 }}>
          {[1, 2, 3].map((d) => (
            <Box
              key={d}
              className="dot"
              sx={{
                width: 10,
                height: 10,
                borderRadius: "50%",
                backgroundColor: "primary.main",
              }}
            />
          ))}
        </Box>

        <Typography
          variant="body2"
          sx={{
            mt: 3,
            color: "text.secondary",
            letterSpacing: 1,
          }}
        >
          Preparing your experience...
        </Typography>
      </Box>
    </Dialog>
  );
}