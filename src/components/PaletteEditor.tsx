import React from "react";
import {
  Box,
  Paper,
  Typography,
  Grid,
  TextField,
  InputAdornment,
  IconButton,
  Tooltip,
} from "@mui/material";
import { Theme } from "@mui/material/styles";
import ColorizeIcon from "@mui/icons-material/Colorize";
import { SketchPicker } from "react-color";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import baseTheme from "../theme";

interface ColorPickerProps {
  color: string;
  onChange: (color: string) => void;
  label: string;
}

const ColorPickerField: React.FC<ColorPickerProps> = ({
  color,
  onChange,
  label,
}) => {
  const [showPicker, setShowPicker] = React.useState(false);

  return (
    <Box sx={{ position: "relative" }}>
      <TextField
        fullWidth
        value={color}
        label={label}
        onChange={(e) => onChange(e.target.value)}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <Box
                sx={{
                  width: 24,
                  height: 24,
                  bgcolor: color,
                  border: "1px solid #ccc",
                  borderRadius: 1,
                  mr: 1,
                }}
              />
              <IconButton
                size="small"
                onClick={() => setShowPicker(!showPicker)}
              >
                <ColorizeIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      {showPicker && (
        <Box
          sx={{
            position: "absolute",
            zIndex: 1000,
            right: 0,
            top: "100%",
          }}
        >
          <Box
            sx={{
              position: "fixed",
              top: 0,
              right: 0,
              bottom: 0,
              left: 0,
            }}
            onClick={() => setShowPicker(false)}
          />
          <SketchPicker
            color={color}
            onChange={(color) => onChange(color.hex)}
          />
        </Box>
      )}
    </Box>
  );
};

interface ColorSet {
  main: string;
  light: string;
  dark: string;
  lighter?: string;
  darker?: string;
}

interface PaletteEditorProps {
  theme: Theme;
  onChange: (newTheme: Theme) => void;
}

const PaletteEditor: React.FC<PaletteEditorProps> = ({ theme, onChange }) => {
  const updateColor = (
    colorType:
      | "primary"
      | "secondary"
      | "error"
      | "warning"
      | "info"
      | "success",
    variant: keyof ColorSet,
    value: string
  ) => {
    const newTheme = {
      ...theme,
      palette: {
        ...theme.palette,
        [colorType]: {
          ...theme.palette[colorType],
          [variant]: value,
        },
      },
    };
    onChange(newTheme);
  };

  const handleReset = () => {
    const newTheme = {
      ...theme,
      palette: baseTheme.palette,
    };
    onChange(newTheme);
  };

  const colorSets: Array<{
    name: "primary" | "secondary" | "error" | "warning" | "info" | "success";
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
        <Typography variant="h6">Palette Editor</Typography>
        <Tooltip title="Reset to Default Theme">
          <IconButton color="primary" onClick={handleReset} size="small">
            <RestartAltIcon />
          </IconButton>
        </Tooltip>
      </Box>
      <Grid container spacing={3}>
        {colorSets.map((colorSet) => (
          <Grid item xs={12} md={6} key={colorSet.name}>
            <Paper
              variant="outlined"
              sx={{ p: 2, bgcolor: "background.default" }}
            >
              <Typography variant="subtitle1" gutterBottom>
                {colorSet.label}
              </Typography>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                <ColorPickerField
                  color={theme.palette[colorSet.name].main}
                  onChange={(color) =>
                    updateColor(colorSet.name, "main", color)
                  }
                  label="Main"
                />
                <ColorPickerField
                  color={theme.palette[colorSet.name].light}
                  onChange={(color) =>
                    updateColor(colorSet.name, "light", color)
                  }
                  label="Light"
                />
                <ColorPickerField
                  color={theme.palette[colorSet.name].dark}
                  onChange={(color) =>
                    updateColor(colorSet.name, "dark", color)
                  }
                  label="Dark"
                />
                {(colorSet.name === "primary" ||
                  colorSet.name === "secondary") && (
                  <>
                    <ColorPickerField
                      color={theme.palette[colorSet.name].lighter || ""}
                      onChange={(color) =>
                        updateColor(colorSet.name, "lighter", color)
                      }
                      label="Lighter"
                    />
                    <ColorPickerField
                      color={theme.palette[colorSet.name].darker || ""}
                      onChange={(color) =>
                        updateColor(colorSet.name, "darker", color)
                      }
                      label="Darker"
                    />
                  </>
                )}
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Paper>
  );
};

export default PaletteEditor;
