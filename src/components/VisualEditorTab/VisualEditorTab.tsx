import React from "react";
import { Box, Container } from "@mui/material";
import { useSelector } from "react-redux";
import { selectTheme } from "../../store/themeSlice";
import PaletteEditor from "../PaletteEditor/PaletteEditor";
import TypographyEditor from "./TypographyEditor";
import SpacingEditor from "./SpacingEditor";

const VisualEditorTab: React.FC = () => {
  const theme = useSelector(selectTheme);

  const handleThemeChange = () => {
    // This is here for backward compatibility with PaletteEditor
    // The actual updates happen through the Redux store
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
        <PaletteEditor theme={theme} onChange={handleThemeChange} />
        <TypographyEditor theme={theme} />
        <SpacingEditor theme={theme} />
      </Box>
    </Container>
  );
};

export default VisualEditorTab;
export { default as TypographyEditor } from "./TypographyEditor";
export { default as SpacingEditor } from "./SpacingEditor";
