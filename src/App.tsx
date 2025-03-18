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
  Tabs,
  Tab,
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
import PaletteEditor from "./components/PaletteEditor";
import { Theme } from "@mui/material/styles";
import baseTheme, { theme as initialTheme } from "./theme"; // Import `theme` for initial code editor content
import "./App.css";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`editor-tabpanel-${index}`}
      aria-labelledby={`editor-tab-${index}`}
      {...other}
    >
      {value === index && <Box>{children}</Box>}
    </div>
  );
}

function App() {
  const [currentTheme, setCurrentTheme] = useState<Theme>(baseTheme);
  const [selectedComponent, setSelectedComponent] = useState<string>("button");
  const [selectedTab, setSelectedTab] = useState(0);
  const [themeString, setThemeString] = useState(
    () => JSON.stringify(initialTheme, null, 2) // Load initial theme from `theme.ts`
  );

  const handleThemeChange = useCallback((newTheme: Theme) => {
    console.log("Theme updated:", newTheme);
    setCurrentTheme(newTheme);
    setThemeString(JSON.stringify(newTheme, null, 2)); // Update the theme string
  }, []);

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue);
  };

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
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Paper sx={{ mb: 2 }}>
                  <Tabs
                    value={selectedTab}
                    onChange={handleTabChange}
                    aria-label="theme editor tabs"
                    variant="fullWidth"
                  >
                    <Tab label="Visual Editor" />
                    <Tab label="Code Editor" />
                  </Tabs>
                </Paper>
                <Box sx={{ flexGrow: 1, overflowY: "auto" }}>
                  <TabPanel value={selectedTab} index={0}>
                    <PaletteEditor
                      theme={currentTheme}
                      onChange={handleThemeChange}
                    />
                  </TabPanel>
                  <TabPanel value={selectedTab} index={1}>
                    <ThemeEditor
                      theme={JSON.parse(themeString)} // Pass the parsed theme string
                      onThemeChange={handleThemeChange}
                    />
                  </TabPanel>
                </Box>
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
