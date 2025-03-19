import React from "react";
import {
  Paper,
  Typography,
  Box,
  Grid,
  Slider,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Tooltip,
  IconButton,
} from "@mui/material";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import { Theme } from "@mui/material/styles";
import { useDispatch, useSelector } from "react-redux";
import { updateThemeConfig, selectThemeConfig } from "../../store/themeSlice";

interface TypographyEditorProps {
  theme: Theme;
}

type TypographyVariant =
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6"
  | "subtitle1"
  | "subtitle2"
  | "body1"
  | "body2"
  | "button"
  | "caption"
  | "overline";

interface TypographyVariantStyles {
  fontSize?: string;
  fontWeight?: number;
  [key: string]: unknown;
}

interface ThemeTypography {
  fontFamily?: string;
  [key: string]: unknown;
}

const fontWeightOptions = [300, 400, 500, 600, 700];
const fontFamilyOptions = [
  "Roboto, sans-serif",
  "Arial, sans-serif",
  "Helvetica, sans-serif",
  "Inter, sans-serif",
  "Poppins, sans-serif",
  "Montserrat, sans-serif",
  "Open Sans, sans-serif",
];

const typographyVariants = [
  { key: "h1" as TypographyVariant, label: "Heading 1" },
  { key: "h2" as TypographyVariant, label: "Heading 2" },
  { key: "h3" as TypographyVariant, label: "Heading 3" },
  { key: "h4" as TypographyVariant, label: "Heading 4" },
  { key: "h5" as TypographyVariant, label: "Heading 5" },
  { key: "h6" as TypographyVariant, label: "Heading 6" },
  { key: "subtitle1" as TypographyVariant, label: "Subtitle 1" },
  { key: "subtitle2" as TypographyVariant, label: "Subtitle 2" },
  { key: "body1" as TypographyVariant, label: "Body 1" },
  { key: "body2" as TypographyVariant, label: "Body 2" },
  { key: "button" as TypographyVariant, label: "Button" },
  { key: "caption" as TypographyVariant, label: "Caption" },
  { key: "overline" as TypographyVariant, label: "Overline" },
];

const TypographyEditor: React.FC<TypographyEditorProps> = ({ theme }) => {
  const dispatch = useDispatch();
  const themeConfig = useSelector(selectThemeConfig);

  const handleTypographyChange = (
    variant: string,
    property: string,
    value: unknown
  ) => {
    // Create a safe copy of typography
    const typography = themeConfig.typography || ({} as ThemeTypography);

    // Create a safe copy of the variant settings
    const variantSettings =
      (typography as Record<string, TypographyVariantStyles>)[variant] || {};

    // Create updated variant settings
    const updatedVariantSettings = {
      ...variantSettings,
      [property]: value,
    };

    // Create updated typography
    const updatedTypography = {
      ...typography,
      [variant]: updatedVariantSettings,
    };

    dispatch(
      updateThemeConfig({
        ...themeConfig,
        typography: updatedTypography,
      })
    );
  };

  const handleFontFamilyChange = (value: string) => {
    dispatch(
      updateThemeConfig({
        ...themeConfig,
        typography: {
          ...themeConfig.typography,
          fontFamily: value,
        },
      })
    );
  };

  const handleReset = () => {
    dispatch(
      updateThemeConfig({
        ...themeConfig,
        typography: undefined, // Reset to default
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
        <Typography variant="h6">Typography</Typography>
        <Tooltip title="Reset Typography Settings">
          <IconButton color="primary" onClick={handleReset} size="small">
            <RestartAltIcon />
          </IconButton>
        </Tooltip>
      </Box>

      <Box sx={{ mb: 4 }}>
        <Typography variant="subtitle1" gutterBottom>
          Global Font Settings
        </Typography>
        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel>Font Family</InputLabel>
          <Select
            value={theme.typography.fontFamily || fontFamilyOptions[0]}
            onChange={(e) => handleFontFamilyChange(e.target.value)}
            label="Font Family"
          >
            {fontFamilyOptions.map((font) => (
              <MenuItem key={font} value={font}>
                {font}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      <Typography variant="subtitle1" gutterBottom>
        Typography Variants
      </Typography>
      <Grid container spacing={3}>
        {typographyVariants.map((variant) => {
          // Access the variant in a type-safe way
          const typography = theme.typography as Record<
            TypographyVariant,
            TypographyVariantStyles
          >;
          const variantStyle = typography[variant.key] || {};

          return (
            <Grid item xs={12} md={6} key={variant.key}>
              <Paper
                variant="outlined"
                sx={{ p: 2, bgcolor: "background.default" }}
              >
                <Typography variant="subtitle2" gutterBottom>
                  {variant.label}
                </Typography>
                <Box sx={{ mb: 1.5 }}>
                  <Typography variant={variant.key} component="div">
                    Sample Text
                  </Typography>
                </Box>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Typography variant="body2" gutterBottom>
                      Font Size
                    </Typography>
                    <Slider
                      min={8}
                      max={72}
                      step={1}
                      value={
                        parseFloat(
                          (variantStyle.fontSize || "16px").toString()
                        ) || 16
                      }
                      onChange={(_, value) =>
                        handleTypographyChange(
                          variant.key,
                          "fontSize",
                          `${value}px`
                        )
                      }
                      valueLabelDisplay="auto"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="body2" gutterBottom>
                      Font Weight
                    </Typography>
                    <FormControl fullWidth size="small">
                      <Select
                        value={variantStyle.fontWeight || 400}
                        onChange={(e) =>
                          handleTypographyChange(
                            variant.key,
                            "fontWeight",
                            e.target.value
                          )
                        }
                      >
                        {fontWeightOptions.map((weight) => (
                          <MenuItem key={weight} value={weight}>
                            {weight}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
          );
        })}
      </Grid>
    </Paper>
  );
};

export default TypographyEditor;
