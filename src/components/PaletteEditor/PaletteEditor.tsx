import React from "react";
import {
  Box,
  Paper,
  Typography,
  Grid,
  Tooltip,
  IconButton,
} from "@mui/material";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import { useDispatch, useSelector } from "react-redux";
import {
  updateThemeConfig,
  resetTheme,
  selectThemeConfig,
} from "../../store/themeSlice";
import baseTheme from "../../theme";
import { createTheme } from "@mui/material/styles";
import ColorSetEditor from "./ColorSetEditor";
import { PaletteEditorProps, ColorType, ColorVariant, ColorSet } from "./types";

// Re-export types for use in other components
export type { PaletteEditorProps, ColorType, ColorVariant, ColorSet };

const PaletteEditor: React.FC<PaletteEditorProps> = ({ theme, onChange }) => {
  const dispatch = useDispatch();
  const themeConfig = useSelector(selectThemeConfig);

  const updateColor = (
    colorType: ColorType,
    variant: ColorVariant,
    value: string
  ) => {
    // Get the current theme configuration from Redux store
    // Create an updated palette based on the theme configuration, not the full theme
    const updatedPalette = {
      ...themeConfig.palette,
      [colorType]: {
        ...themeConfig.palette?.[colorType],
        [variant]: value,
      },
    };

    // Update the theme config in Redux store with only the necessary changes
    dispatch(
      updateThemeConfig({
        ...themeConfig,
        palette: updatedPalette,
      })
    );

    // For backward compatibility with onChange prop
    if (onChange) {
      // Create a new theme with the updated palette
      const newThemeConfig = {
        ...themeConfig,
        palette: updatedPalette,
      };
      const newTheme = createTheme(newThemeConfig);
      onChange(newTheme);
    }
  };

  const handleReset = () => {
    // Reset theme in Redux store
    dispatch(resetTheme());

    // For backward compatibility
    if (onChange) {
      onChange(baseTheme);
    }
  };

  const colorSets: Array<{
    name: ColorType;
    label: string;
  }> = [
    { name: "primary", label: "Primary" },
    { name: "secondary", label: "Secondary" },
    { name: "error", label: "Error" },
    { name: "warning", label: "Warning" },
    { name: "info", label: "Info" },
    { name: "success", label: "Success" },
  ];

  return (
    <Paper sx={{ p: 3, mb: 2 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
        }}
      >
        <Typography variant="h6">Color Palette</Typography>
        <Tooltip title="Reset to Default Theme">
          <IconButton color="primary" onClick={handleReset} size="small">
            <RestartAltIcon />
          </IconButton>
        </Tooltip>
      </Box>
      <Grid container spacing={3}>
        {colorSets.map((colorSet) => (
          <Grid item xs={12} md={6} key={colorSet.name}>
            <ColorSetEditor
              theme={theme}
              colorName={colorSet.name}
              colorLabel={colorSet.label}
              onColorChange={updateColor}
            />
          </Grid>
        ))}
      </Grid>
    </Paper>
  );
};

export default PaletteEditor;
