import { Paper } from "@mui/material";
import { ThemeOptions } from "@mui/material/styles";
import EditorHeader from "./EditorHeader";
import CodeEditor from "./CodeEditor";
import { useThemeEditor } from "./useThemeEditor";

interface ThemeEditorProps {
  theme: ThemeOptions;
  initialTheme: ThemeOptions;
  onThemeChange?: (newTheme: ThemeOptions) => void;
}

const ThemeEditor: React.FC<ThemeEditorProps> = ({
  initialTheme,
  theme,
  onThemeChange,
}) => {
  const { currentTheme, error, handleSave, handleReset, handleEditorChange } =
    useThemeEditor({
      initialTheme,
      theme,
      onThemeChange,
    });

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
      <EditorHeader onSave={handleSave} onReset={handleReset} />
      <CodeEditor
        value={currentTheme}
        onChange={handleEditorChange}
        error={error}
      />
    </Paper>
  );
};

export default ThemeEditor;
