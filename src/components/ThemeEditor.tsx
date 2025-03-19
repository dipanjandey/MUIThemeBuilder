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
import { ThemeOptions } from "@mui/material/styles";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { updateThemeConfig, resetTheme } from "../store/themeSlice";

interface ThemeEditorProps {
  theme: ThemeOptions;
  initialTheme: ThemeOptions;
  onThemeChange?: (newTheme: ThemeOptions) => void; // Optional now
}

const ThemeEditor: React.FC<ThemeEditorProps> = ({
  initialTheme,
  theme,
  onThemeChange,
}) => {
  const dispatch = useDispatch();
  const [error, setError] = useState<string | null>(null);
  const [currentTheme, setCurrentTheme] = useState(
    () => JSON.stringify(theme, null, 2) // Initialize with the provided theme
  );

  useEffect(() => {
    setCurrentTheme(JSON.stringify(theme, null, 2)); // Update editor content when theme changes
  }, [theme]);

  const handleSave = () => {
    try {
      const themeObject = JSON.parse(currentTheme); // Parse the editor content

      // Update the Redux store
      dispatch(updateThemeConfig(themeObject));

      // For backward compatibility
      if (onThemeChange) {
        onThemeChange(themeObject);
      }

      setError(null);
    } catch (error) {
      console.error("Error parsing theme:", error);
      setError(
        error instanceof Error ? error.message : "Failed to parse theme"
      );
    }
  };

  const handleReset = () => {
    // Reset to default theme in Redux store
    dispatch(resetTheme());
    setCurrentTheme(JSON.stringify(initialTheme, null, 2));
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
        defaultLanguage="json"
        value={currentTheme} // Display the current theme string
        onChange={(value) => setCurrentTheme(value || "")} // Update state on editor change
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
