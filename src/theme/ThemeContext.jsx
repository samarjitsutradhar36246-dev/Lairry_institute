import React, { createContext, useContext,useEffect, useMemo, useState } from "react";
import { ThemeProvider, CssBaseline, createTheme } from "@mui/material";

 const ThemeContext = createContext(null);
export const AppThemeProvider = ({ children }) => {
  const [mode, setMode] = useState("dark");
  
  const toggleTheme = () => {
    setMode((prev) => (prev === "dark" ? "light" : "dark"));
  };

  

const theme = useMemo(
  () =>
    createTheme({
      palette: {
        mode,
        primary: {
          main: mode === "dark" ? "#3b82f6" : "#2563eb",
        },
        secondary: {
          main: mode === "dark" ? "#22c55e" : "#16a34a",
        },
        background: {
          default: mode === "dark" ? "#0f172a" : "#f8fafc",   // softer light bg
          paper: mode === "dark" ? "#111827" : "#ffffff",
        },
        text: {
          primary: mode === "dark" ? "#f1f5f9" : "#0f172a",
          secondary: mode === "dark" ? "#94a3b8" : "#64748b",
        },
        divider: mode === "dark" ? "#1f2937" : "#e2e8f0",
      },
      shape: { borderRadius: 12 },
      typography: {
        fontFamily: "Inter, sans-serif",
      },
      success: {
  main: mode === "dark" ? "#22c55e" : "#16a34a",
},
error: {
  main: mode === "dark" ? "#ef4444" : "#dc2626",
},
MuiCard: {
  styleOverrides: {
    root: ({ theme }) => ({
      backgroundColor: theme.palette.background.paper,
      border: `1px solid ${theme.palette.divider}`,
      boxShadow:
        theme.palette.mode === "dark"
          ? "0 4px 20px rgba(0,0,0,0.4)"
          : "0 4px 20px rgba(0,0,0,0.05)",
    }),
  },
},

      components: {
  MuiTableCell: {
    styleOverrides: {
      root: {
        borderBottom: "1px solid",
      },
    },
  },
  
  MuiFilledInput: {
  styleOverrides: {
    root: ({ theme }) => ({
      borderRadius: 12,
      border: `1px solid ${theme.palette.divider}`,
      backgroundColor:
        theme.palette.mode === "dark"
          ? "rgba(255,255,255,0.04)"
          : theme.palette.grey[100],
    }),
  },
},
MuiInputLabel: {
          styleOverrides: {
            root: ({ theme }) => ({
              color: theme.palette.text.secondary,
              "&.Mui-focused": {
                color: theme.palette.primary.main,
              },
            }),
          },
        },
   MuiTypography: {
    defaultProps: {
      color: "text.primary",
    },
  },
  MuiTextField: {
  defaultProps: {
    variant: "filled",
    size: "small",
  },
},
MuiSelect: {
  styleOverrides: {
    root: ({ theme }) => ({
      backgroundColor: theme.palette.background.paper,
    }),
  },
},

MuiMenu: {
  styleOverrides: {
    paper: ({ theme }) => ({
      backgroundColor: theme.palette.background.paper,
      color: theme.palette.text.primary,
      border: `1px solid ${theme.palette.divider}`,
    }),
  },
},

MuiMenuItem: {
  styleOverrides: {
    root: ({ theme }) => ({
      color: theme.palette.text.primary,
      "&:hover": {
        backgroundColor:
          theme.palette.mode === "dark"
            ? "rgba(255,255,255,0.08)"
            : "rgba(0,0,0,0.04)",
      },
    }),
  },
},

  MuiButton: {
    styleOverrides: {
      root: {
        textTransform: "none",
        borderRadius: 10,
      },
    },
  },
},


    }),
  [mode]
);

  
  
  useEffect(() => {
  const root = document.documentElement;

  root.style.setProperty("--bg-default", theme.palette.background.default);
  root.style.setProperty("--bg-paper", theme.palette.background.paper);

  root.style.setProperty("--text-primary", theme.palette.text.primary);
  root.style.setProperty("--text-secondary", theme.palette.text.secondary);

  root.style.setProperty("--primary", theme.palette.primary.main);
  root.style.setProperty("--secondary", theme.palette.secondary.main);

  root.style.setProperty("--border-color", theme.palette.divider);
root.style.setProperty(
  "--error-color",
  theme.palette.error.main
);

  root.style.setProperty(
    "--surface-1",
    mode === "dark" ? "#111827" : "#ffffff"
  );

  root.style.setProperty(
    "--surface-2",
    mode === "dark" ? "#1f2937" : "#e2e8f0"
  );

  root.style.setProperty(
    "--card-bg",
    mode === "dark" ? "rgba(255,255,255,0.04)" : "#ffffff"
  );

  root.style.setProperty(
    "--card-hover",
    mode === "dark" ? "rgba(255,255,255,0.08)" : "#f8fafc"
  );
root.style.setProperty(
  "--card-border",
  theme.palette.mode === "dark"
    ? "rgba(255,255,255,0.08)"
    : "#e2e8f0"
);

root.style.setProperty(
  "--muted-bg",
  theme.palette.mode === "dark"
    ? "rgba(255,255,255,0.04)"
    : "#f8fafc"
);

root.style.setProperty(
  "--stat-primary-bg",
  theme.palette.primary.main
);

root.style.setProperty(
  "--success-bg",
  theme.palette.mode === "dark"
    ? "rgba(34,197,94,0.15)"
    : "#dcfce7"
);

root.style.setProperty(
  "--success-text",
  theme.palette.success.main
);

}, [theme, mode]);


  return (
    <ThemeContext.Provider value={{ mode, toggleTheme }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};
export const useAppTheme = () => {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useAppTheme must be used inside AppThemeProvider");
  return ctx;
};