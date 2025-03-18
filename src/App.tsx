import {
  Container,
  CssBaseline,
  ThemeProvider,
  Grid,
  Box,
  Paper,
} from "@mui/material";
import { useState, useCallback } from "react";
import MUIButton from "./components/MUIButton";
import MUIInput from "./components/MUIInput";
import ThemeEditor from "./components/ThemeEditor";
import { Theme } from "@mui/material/styles";
import baseTheme, { theme as initialTheme } from "./theme";
import "./App.css";

function App() {
  const [currentTheme, setCurrentTheme] = useState<Theme>(baseTheme);
  const [themeString] = useState(() => {
    const themeFile = `import { createTheme } from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface PaletteColor {
    lighter?: string;
    darker?: string;
  }
  interface SimplePaletteColorOptions {
    lighter?: string;
    darker?: string;
  }
}

export const theme = ${JSON.stringify(initialTheme, null, 2)};

export default theme;`;
    return themeFile;
  });

  const handleThemeChange = useCallback((newTheme: Theme) => {
    console.log("Theme updated:", newTheme);
    setCurrentTheme(newTheme);
  }, []);

  return (
    <ThemeProvider theme={currentTheme}>
      <CssBaseline />
      <Box sx={{ height: "100vh", overflow: "hidden" }}>
        <Container maxWidth="xl" sx={{ py: 4, height: "100%" }}>
          <Grid container spacing={2} sx={{ height: "100%" }}>
            {/* Theme Editor - Left Side (Sticky) */}
            <Grid item xs={12} md={6} sx={{ height: "100%" }}>
              <Box
                sx={{
                  position: "sticky",
                  top: 32,
                  maxHeight: "calc(100vh - 64px)",
                }}
              >
                <ThemeEditor
                  initialTheme={themeString}
                  onThemeChange={handleThemeChange}
                />
              </Box>
            </Grid>

            {/* Components Preview - Right Side (Scrollable) */}
            <Grid
              item
              xs={12}
              md={6}
              sx={{ height: "100%", overflowY: "auto" }}
            >
              <Paper sx={{ p: 2 }}>
                <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
                  <MUIButton />
                  <MUIInput />
                </Box>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </ThemeProvider>
  );
}

export default App;
