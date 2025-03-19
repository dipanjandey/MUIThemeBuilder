import { useState, useEffect } from "react";
import { ThemeOptions } from "@mui/material/styles";
import { useDispatch } from "react-redux";
import { updateThemeConfig, resetTheme } from "../../store/themeSlice";

interface UseThemeEditorProps {
  initialTheme: ThemeOptions;
  theme: ThemeOptions;
  onThemeChange?: (newTheme: ThemeOptions) => void;
}

export const useThemeEditor = ({
  initialTheme,
  theme,
  onThemeChange,
}: UseThemeEditorProps) => {
  const dispatch = useDispatch();
  const [error, setError] = useState<string | null>(null);
  const [currentTheme, setCurrentTheme] = useState(
    () => JSON.stringify(theme, null, 2)
  );

  useEffect(() => {
    setCurrentTheme(JSON.stringify(theme, null, 2));
  }, [theme]);

  const handleSave = () => {
    try {
      const themeObject = JSON.parse(currentTheme);
      dispatch(updateThemeConfig(themeObject));
      
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
    dispatch(resetTheme());
    setCurrentTheme(JSON.stringify(initialTheme, null, 2));
    setError(null);
  };

  const handleEditorChange = (value: string) => {
    setCurrentTheme(value);
  };

  return {
    currentTheme,
    error,
    handleSave,
    handleReset,
    handleEditorChange,
  };
}; 