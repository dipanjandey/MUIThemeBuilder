import {
  ButtonGroup,
  Button,
  Stack,
  Typography,
  Paper,
  IconButton,
} from "@mui/material";
import {
  FormatBold,
  FormatItalic,
  FormatUnderlined,
  ArrowDropDown,
  ArrowDropUp,
} from "@mui/icons-material";

const MUIButtonGroup = () => {
  return (
    <Paper sx={{ p: 3, my: 2 }}>
      <Typography variant="h5" gutterBottom>
        MUI Button Group Variants
      </Typography>

      {/* Basic Button Groups */}
      <Stack spacing={2} sx={{ mb: 4 }}>
        <Typography variant="subtitle1">Basic Variants</Typography>
        <ButtonGroup variant="contained">
          <Button>One</Button>
          <Button>Two</Button>
          <Button>Three</Button>
        </ButtonGroup>
        <ButtonGroup variant="outlined">
          <Button>One</Button>
          <Button>Two</Button>
          <Button>Three</Button>
        </ButtonGroup>
        <ButtonGroup variant="text">
          <Button>One</Button>
          <Button>Two</Button>
          <Button>Three</Button>
        </ButtonGroup>
      </Stack>

      {/* Sizes */}
      <Stack spacing={2} sx={{ mb: 4 }}>
        <Typography variant="subtitle1">Size Variants</Typography>
        <ButtonGroup size="small" variant="contained">
          <Button>Small</Button>
          <Button>Small</Button>
          <Button>Small</Button>
        </ButtonGroup>
        <ButtonGroup size="medium" variant="contained">
          <Button>Medium</Button>
          <Button>Medium</Button>
          <Button>Medium</Button>
        </ButtonGroup>
        <ButtonGroup size="large" variant="contained">
          <Button>Large</Button>
          <Button>Large</Button>
          <Button>Large</Button>
        </ButtonGroup>
      </Stack>

      {/* Colors */}
      <Stack spacing={2} sx={{ mb: 4 }}>
        <Typography variant="subtitle1">Color Variants</Typography>
        <ButtonGroup variant="contained" color="primary">
          <Button>Primary</Button>
          <Button>Primary</Button>
          <Button>Primary</Button>
        </ButtonGroup>
        <ButtonGroup variant="contained" color="secondary">
          <Button>Secondary</Button>
          <Button>Secondary</Button>
          <Button>Secondary</Button>
        </ButtonGroup>
        <ButtonGroup variant="contained" color="error">
          <Button>Error</Button>
          <Button>Error</Button>
          <Button>Error</Button>
        </ButtonGroup>
      </Stack>

      {/* With Icons */}
      <Stack spacing={2}>
        <Typography variant="subtitle1">With Icons</Typography>
        <ButtonGroup>
          <IconButton>
            <FormatBold />
          </IconButton>
          <IconButton>
            <FormatItalic />
          </IconButton>
          <IconButton>
            <FormatUnderlined />
          </IconButton>
        </ButtonGroup>
        <ButtonGroup orientation="vertical">
          <Button startIcon={<ArrowDropUp />}>Up</Button>
          <Button>Center</Button>
          <Button endIcon={<ArrowDropDown />}>Down</Button>
        </ButtonGroup>
      </Stack>
    </Paper>
  );
};

export default MUIButtonGroup;
