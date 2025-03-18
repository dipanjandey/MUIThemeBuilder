import { Paper, Typography, Alert } from "@mui/material";
import Editor from "@monaco-editor/react";
import { Theme, createTheme } from "@mui/material/styles";
import { useState } from "react";

interface ThemeEditorProps {
  initialTheme: string;
  onThemeChange: (newTheme: Theme) => void;
}

const ThemeEditor: React.FC<ThemeEditorProps> = ({
  initialTheme,
  onThemeChange,
}) => {
  const [error, setError] = useState<string | null>(null);

  const handleEditorChange = (value: string | undefined) => {
    if (!value) return;
    setError(null);

    try {
      // Extract the theme object from the code
      const themeMatch = value.match(/export const theme = ({[\s\S]*?});/);
      if (!themeMatch) {
        throw new Error("Could not find theme object in code");
      }

      const themeObjectString = themeMatch[1];
      // Parse the theme object and create a new theme
      const themeObject = eval(`(${themeObjectString})`);
      const newTheme = createTheme(themeObject);

      onThemeChange(newTheme);
    } catch (error) {
      console.error("Error parsing theme:", error);
      setError(
        error instanceof Error ? error.message : "Failed to parse theme"
      );
    }
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
      <Typography variant="h5" gutterBottom>
        Theme Editor
      </Typography>
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}
      <Editor
        height="calc(100vh - 160px)"
        defaultLanguage="typescript"
        value={initialTheme}
        onChange={handleEditorChange}
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
