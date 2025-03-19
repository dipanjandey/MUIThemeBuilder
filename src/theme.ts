import { createTheme } from "@mui/material/styles";

declare module "@mui/material/styles" {
  interface PaletteColor {
    lighter?: string;
    darker?: string;
  }
  interface SimplePaletteColorOptions {
    lighter?: string;
    darker?: string;
  }
}

export const theme = {
  palette: {
    primary: {
      main: "#1976d2",
      light: "#42a5f5",
      dark: "#1565c0",
      lighter: "#e3f2fd",
      darker: "#0d47a1",
    },
    secondary: {
      main: "#9c27b0",
      light: "#ba68c8",
      dark: "#7b1fa2",
      lighter: "#f3e5f5",
      darker: "#4a148c",
    },
    error: {
      main: "#d32f2f",
      light: "#ef5350",
      dark: "#c62828",
    },
    warning: {
      main: "#ed6c02",
      light: "#ff9800",
      dark: "#e65100",
    },
    info: {
      main: "#0288d1",
      light: "#03a9f4",
      dark: "#01579b",
    },
    success: {
      main: "#2e7d32",
      light: "#4caf50",
      dark: "#1b5e20",
    },
  },
  typography: {
    fontFamily: "Roboto, sans-serif",
    h1: {
      fontSize: "40px",
      fontWeight: 500,
    },
    h2: {
      fontSize: "32px",
      fontWeight: 500,
    },
    h3: {
      fontSize: "28px",
      fontWeight: 500,
    },
    h4: {
      fontSize: "24px",
      fontWeight: 500,
    },
    h5: {
      fontSize: "20px",
      fontWeight: 600,
      marginBottom: "1rem",
    },
    h6: {
      fontSize: "18px",
      fontWeight: 500,
    },
    subtitle1: {
      fontSize: "16px",
      fontWeight: 500,
      color: "#666",
    },
    subtitle2: {
      fontSize: "14px",
      fontWeight: 500,
    },
    body1: {
      fontSize: "16px",
      fontWeight: 400,
    },
    body2: {
      fontSize: "14px",
      fontWeight: 400,
    },
    button: {
      fontSize: "14px",
      fontWeight: 600,
      textTransform: "none",
    },
    caption: {
      fontSize: "12px",
      fontWeight: 400,
    },
    overline: {
      fontSize: "12px",
      fontWeight: 400,
      textTransform: "uppercase",
    },
  },
  spacing: 8,
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: "none",
          fontWeight: 600,
        },
        contained: {
          boxShadow: "none",
          "&:hover": {
            boxShadow: "none",
          },
        },
        outlined: {
          borderWidth: 2,
          "&:hover": {
            borderWidth: 2,
          },
        },
      },
      defaultProps: {
        disableElevation: true,
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            borderRadius: 8,
            "&.Mui-focused": {
              "& .MuiOutlinedInput-notchedOutline": {
                borderWidth: 2,
              },
            },
          },
        },
      },
      defaultProps: {
        variant: "outlined",
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 12,
        },
      },
    },
  },
} as const;

export default createTheme(theme);
