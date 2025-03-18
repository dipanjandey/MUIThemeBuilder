import {
  Container,
  CssBaseline,
  ThemeProvider,
  Grid,
  Box,
  Paper,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { useState, useCallback } from "react";
import MUIButton from "./components/MUIButton";
import MUIInput from "./components/MUIInput";
import MUIAutocomplete from "./components/MUIAutocomplete";
import MUIButtonGroup from "./components/MUIButtonGroup";
import MUICheckboxRadio from "./components/MUICheckboxRadio";
import MUIRating from "./components/MUIRating";
import MUISelect from "./components/MUISelect";
import MUISlider from "./components/MUISlider";
import MUISwitch from "./components/MUISwitch";
import ThemeEditor from "./components/ThemeEditor";
import { Theme } from "@mui/material/styles";
import baseTheme, { theme as initialTheme } from "./theme";
import "./App.css";

function App() {
  const [currentTheme, setCurrentTheme] = useState<Theme>(baseTheme);
  const [selectedComponent, setSelectedComponent] = useState<string>("button");
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

  const renderSelectedComponent = () => {
    switch (selectedComponent) {
      case "button":
        return <MUIButton />;
      case "input":
        return <MUIInput />;
      case "autocomplete":
        return <MUIAutocomplete />;
      case "buttongroup":
        return <MUIButtonGroup />;
      case "checkboxradio":
        return <MUICheckboxRadio />;
      case "rating":
        return <MUIRating />;
      case "select":
        return <MUISelect />;
      case "slider":
        return <MUISlider />;
      case "switch":
        return <MUISwitch />;
      default:
        return <MUIButton />;
    }
  };

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
                <FormControl fullWidth sx={{ mb: 3 }}>
                  <InputLabel id="component-select-label">Component</InputLabel>
                  <Select
                    labelId="component-select-label"
                    id="component-select"
                    value={selectedComponent}
                    label="Component"
                    onChange={(e) => setSelectedComponent(e.target.value)}
                  >
                    <MenuItem value="button">Buttons</MenuItem>
                    <MenuItem value="input">Inputs</MenuItem>
                    <MenuItem value="autocomplete">Autocomplete</MenuItem>
                    <MenuItem value="buttongroup">Button Group</MenuItem>
                    <MenuItem value="checkboxradio">Checkbox & Radio</MenuItem>
                    <MenuItem value="rating">Rating</MenuItem>
                    <MenuItem value="select">Select</MenuItem>
                    <MenuItem value="slider">Slider</MenuItem>
                    <MenuItem value="switch">Switch</MenuItem>
                  </Select>
                </FormControl>
                <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
                  {renderSelectedComponent()}
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
