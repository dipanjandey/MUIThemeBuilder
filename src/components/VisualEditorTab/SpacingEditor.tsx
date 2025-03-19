import React from "react";
import {
  Paper,
  Typography,
  Box,
  Grid,
  Slider,
  Tooltip,
  IconButton,
} from "@mui/material";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import { Theme } from "@mui/material/styles";
import { useDispatch, useSelector } from "react-redux";
import { updateThemeConfig, selectThemeConfig } from "../../store/themeSlice";

interface SpacingEditorProps {
  theme: Theme;
}

interface SpacingPreviewProps {
  size: number;
  label: string;
}

const SpacingPreview: React.FC<SpacingPreviewProps> = ({ size, label }) => (
  <Box sx={{ textAlign: "center", mb: 2 }}>
    <Box
      sx={{
        width: `${size}px`,
        height: `${size}px`,
        bgcolor: "primary.main",
        mb: 1,
        mx: "auto",
        borderRadius: 1,
      }}
    />
    <Typography variant="caption" display="block">
      {label}: {size}px
    </Typography>
  </Box>
);

const SpacingEditor: React.FC<SpacingEditorProps> = ({ theme }) => {
  const dispatch = useDispatch();
  const themeConfig = useSelector(selectThemeConfig);

  // MUI spacing unit (default is 8px)
  // Use themeConfig.spacing if available, otherwise fall back to current theme spacing or 8px
  const spacingUnit =
    themeConfig.spacing !== undefined
      ? Number(themeConfig.spacing)
      : typeof theme.spacing === "function"
      ? Number(theme.spacing(1).replace("px", ""))
      : 8;

  const borderRadius =
    themeConfig.shape?.borderRadius || theme.shape?.borderRadius || 4;

  const handleSpacingChange = (value: number) => {
    console.log("Updating spacing to:", value);
    dispatch(
      updateThemeConfig({
        ...themeConfig,
        spacing: value,
      })
    );
  };

  const handleBorderRadiusChange = (value: number) => {
    dispatch(
      updateThemeConfig({
        ...themeConfig,
        shape: {
          ...themeConfig.shape,
          borderRadius: value,
        },
      })
    );
  };

  const handleReset = () => {
    dispatch(
      updateThemeConfig({
        ...themeConfig,
        spacing: undefined,
        shape: {
          ...themeConfig.shape,
          borderRadius: undefined,
        },
      })
    );
  };

  return (
    <Paper sx={{ p: 3 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
        }}
      >
        <Typography variant="h6">Spacing & Shape</Typography>
        <Tooltip title="Reset Spacing Settings">
          <IconButton color="primary" onClick={handleReset} size="small">
            <RestartAltIcon />
          </IconButton>
        </Tooltip>
      </Box>

      <Box sx={{ mb: 4 }}>
        <Typography variant="subtitle1" gutterBottom>
          Base Spacing Unit
        </Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          The base unit for all spacing in your theme (default is 8px)
        </Typography>
        <Box sx={{ px: 2 }}>
          <Slider
            min={4}
            max={16}
            step={1}
            value={spacingUnit}
            onChange={(_event, newValue) => {
              handleSpacingChange(Number(newValue));
            }}
            aria-label="Spacing Unit"
            valueLabelDisplay="auto"
            sx={{ mt: 3, mb: 1 }}
          />
        </Box>

        <Grid container spacing={2} sx={{ mt: 2 }}>
          <Grid item xs={4}>
            <SpacingPreview size={spacingUnit * 1} label="1x" />
          </Grid>
          <Grid item xs={4}>
            <SpacingPreview size={spacingUnit * 2} label="2x" />
          </Grid>
          <Grid item xs={4}>
            <SpacingPreview size={spacingUnit * 4} label="4x" />
          </Grid>
        </Grid>
      </Box>

      <Box>
        <Typography variant="subtitle1" gutterBottom>
          Border Radius
        </Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          Default border radius for components
        </Typography>
        <Box sx={{ px: 2 }}>
          <Slider
            min={0}
            max={24}
            step={1}
            value={borderRadius}
            onChange={(_, value) => handleBorderRadiusChange(value as number)}
            valueLabelDisplay="auto"
            sx={{ mt: 3, mb: 1 }}
          />
        </Box>

        <Grid container spacing={2} sx={{ mt: 2 }}>
          <Grid item xs={3}>
            <Box
              sx={{
                width: 64,
                height: 64,
                bgcolor: "primary.main",
                borderRadius: 0,
                mx: "auto",
                mb: 1,
              }}
            />
            <Typography variant="caption" align="center" display="block">
              0px
            </Typography>
          </Grid>
          <Grid item xs={3}>
            <Box
              sx={{
                width: 64,
                height: 64,
                bgcolor: "primary.main",
                borderRadius: 1,
                mx: "auto",
                mb: 1,
              }}
            />
            <Typography variant="caption" align="center" display="block">
              4px
            </Typography>
          </Grid>
          <Grid item xs={3}>
            <Box
              sx={{
                width: 64,
                height: 64,
                bgcolor: "primary.main",
                borderRadius: borderRadius,
                mx: "auto",
                mb: 1,
              }}
            />
            <Typography variant="caption" align="center" display="block">
              {borderRadius}px
            </Typography>
          </Grid>
          <Grid item xs={3}>
            <Box
              sx={{
                width: 64,
                height: 64,
                bgcolor: "primary.main",
                borderRadius: "50%",
                mx: "auto",
                mb: 1,
              }}
            />
            <Typography variant="caption" align="center" display="block">
              Round
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </Paper>
  );
};

export default SpacingEditor;
