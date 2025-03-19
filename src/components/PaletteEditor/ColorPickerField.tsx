import React from "react";
import { Box, TextField, InputAdornment, IconButton } from "@mui/material";
import ColorizeIcon from "@mui/icons-material/Colorize";
import { SketchPicker, ColorResult } from "react-color";

interface ColorPickerFieldProps {
  color: string;
  onChange: (color: string) => void;
  label: string;
}

const ColorPickerField: React.FC<ColorPickerFieldProps> = ({
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
            onChange={(color: ColorResult) => onChange(color.hex)}
          />
        </Box>
      )}
    </Box>
  );
};

export default ColorPickerField;
