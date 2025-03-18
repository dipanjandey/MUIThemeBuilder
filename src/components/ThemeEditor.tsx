import {
  Paper,
  Typography,
  Alert,
  IconButton,
  Box,
  Tooltip,
} from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import Editor from "@monaco-editor/react";
import { Theme, createTheme, ThemeOptions } from "@mui/material/styles";
import { useState, useEffect } from "react";

interface ThemeEditorProps {
  theme: ThemeOptions;
  onThemeChange: (newTheme: Theme) => void;
}

// Function to validate and ensure all required color variants are present
const validateTheme = (themeObject: ThemeOptions): ThemeOptions => {
  const requiredColors = [
    "primary",
    "secondary",
    "error",
    "warning",
    "info",
    "success",
  ];
  const requiredVariants = ["main", "light", "dark"];

  const validatedTheme = { ...themeObject };

  if (!validatedTheme.palette) {
    validatedTheme.palette = {};
  }

  requiredColors.forEach((color) => {
    if (!validatedTheme.palette?.[color]) {
      validatedTheme.palette[color] = {};
    }

    const colorObj = validatedTheme.palette[color];

    // Ensure all required variants exist
    requiredVariants.forEach((variant) => {
      if (!colorObj?.[variant]) {
        // If main is missing, use a default color
        if (variant === "main") {
          colorObj.main = "#000000";
        } else if (variant === "light") {
          // If light is missing but main exists, lighten main
          colorObj.light = colorObj.main || "#000000";
        } else if (variant === "dark") {
          // If dark is missing but main exists, darken main
          colorObj.dark = colorObj.main || "#000000";
        }
      }
    });
  });

  return validatedTheme;
};

const ThemeEditor: React.FC<ThemeEditorProps> = ({ theme, onThemeChange }) => {
  const [error, setError] = useState<string | null>(null);
  const [currentValue, setCurrentValue] = useState(
    () => JSON.stringify(theme, null, 2) // Initialize with the provided theme
  );

  useEffect(() => {
    setCurrentValue(JSON.stringify(theme, null, 2)); // Update editor content when theme changes
  }, [theme]);

  const handleSave = () => {
    try {
      const themeObject = JSON.parse(currentValue); // Parse the editor content
      const validatedTheme = validateTheme(themeObject); // Validate the theme
      const newTheme = createTheme(validatedTheme); // Create a new theme
      onThemeChange(newTheme); // Notify parent component
    } catch (error) {
      console.error("Error parsing theme:", error);
      setError(
        error instanceof Error ? error.message : "Failed to parse theme"
      );
    }
  };

  const handleReset = () => {
    setCurrentValue(JSON.stringify(theme, null, 2));
    setError(null);
  };

  return (
    <Paper
      sx={{
        p: 2,
        height: "100%",
        display: "flex",
        flexDirection: "column",
        maxHeight: "calc(100vh - 64px)",
      }}
      elevation={3}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
        }}
      >
        <Typography variant="h6">Theme Code</Typography>
        <Box>
          <Tooltip title="Reset Changes">
            <IconButton
              color="primary"
              onClick={handleReset}
              size="small"
              sx={{ mr: 1 }}
            >
              <RestartAltIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Save Changes">
            <IconButton color="primary" onClick={handleSave} size="small">
              <SaveIcon />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}
      <Editor
        height="calc(100vh - 200px)"
        defaultLanguage="typescript"
        value={currentValue} // Display the current theme string
        onChange={(value) => setCurrentValue(value || "")} // Update state on editor change
        options={{
          minimap: { enabled: false },
          fontSize: 14,
          wordWrap: "on",
          lineNumbers: "on",
          scrollBeyondLastLine: false,
          automaticLayout: true,
        }}
        theme="vs-dark"
      />
    </Paper>
  );
};

export default ThemeEditor;
