import Editor from "@monaco-editor/react";
import { Alert } from "@mui/material";

interface CodeEditorProps {
  value: string;
  onChange: (value: string) => void;
  error: string | null;
}

const CodeEditor: React.FC<CodeEditorProps> = ({ value, onChange, error }) => {
  return (
    <>
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}
      <Editor
        height="calc(100vh - 200px)"
        defaultLanguage="json"
        value={value}
        onChange={(value) => onChange(value || "")}
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
    </>
  );
};

export default CodeEditor;
