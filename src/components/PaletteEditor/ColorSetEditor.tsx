import React from "react";
import { Box, Paper, Typography } from "@mui/material";
import { Theme } from "@mui/material/styles";
import ColorPickerField from "./ColorPickerField";
import { ColorType, ColorVariant } from "./types";

interface ColorSetEditorProps {
  theme: Theme;
  colorName: ColorType;
  colorLabel: string;
  onColorChange: (
    colorType: ColorType,
    variant: ColorVariant,
    value: string
  ) => void;
}

const ColorSetEditor: React.FC<ColorSetEditorProps> = ({
  theme,
  colorName,
  colorLabel,
  onColorChange,
}) => {
  const isPrimaryOrSecondary =
    colorName === "primary" || colorName === "secondary";

  return (
    <Paper variant="outlined" sx={{ p: 2, bgcolor: "background.default" }}>
      <Typography variant="subtitle1" gutterBottom>
        {colorLabel}
      </Typography>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <ColorPickerField
          color={theme.palette[colorName].main}
          onChange={(color) => onColorChange(colorName, "main", color)}
          label="Main"
        />
        <ColorPickerField
          color={theme.palette[colorName].light}
          onChange={(color) => onColorChange(colorName, "light", color)}
          label="Light"
        />
        <ColorPickerField
          color={theme.palette[colorName].dark}
          onChange={(color) => onColorChange(colorName, "dark", color)}
          label="Dark"
        />
        {isPrimaryOrSecondary && (
          <>
            <ColorPickerField
              color={theme.palette[colorName].lighter || ""}
              onChange={(color) => onColorChange(colorName, "lighter", color)}
              label="Lighter"
            />
            <ColorPickerField
              color={theme.palette[colorName].darker || ""}
              onChange={(color) => onColorChange(colorName, "darker", color)}
              label="Darker"
            />
          </>
        )}
      </Box>
    </Paper>
  );
};

export default ColorSetEditor;
