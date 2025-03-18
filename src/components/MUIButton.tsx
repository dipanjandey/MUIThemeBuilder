import { Button, Stack, Typography, Paper } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import DeleteIcon from "@mui/icons-material/Delete";

const MUIButton = () => {
  return (
    <Paper sx={{ p: 3, my: 2 }}>
      <Typography variant="h5" gutterBottom>
        MUI Button Variants
      </Typography>

      {/* Basic Variants */}
      <Stack spacing={2} sx={{ mb: 4 }}>
        <Typography variant="subtitle1">Basic Variants</Typography>
        <Stack direction="row" spacing={2}>
          <Button variant="text">Text</Button>
          <Button variant="contained" color="primary">
            Contained
          </Button>
          <Button variant="outlined">Outlined</Button>
        </Stack>
      </Stack>

      {/* Color Variants */}
      <Stack spacing={2} sx={{ mb: 4 }}>
        <Typography variant="subtitle1">Color Variants</Typography>
        <Stack direction="row" spacing={2}>
          <Button variant="contained" color="primary">
            Primary
          </Button>
          <Button variant="contained" color="secondary">
            Secondary
          </Button>
          <Button variant="contained" color="error">
            Error
          </Button>
          <Button variant="contained" color="warning">
            Warning
          </Button>
          <Button variant="contained" color="info">
            Info
          </Button>
          <Button variant="contained" color="success">
            Success
          </Button>
        </Stack>
      </Stack>

      {/* Sizes */}
      <Stack spacing={2} sx={{ mb: 4 }}>
        <Typography variant="subtitle1">Size Variants</Typography>
        <Stack direction="row" spacing={2} alignItems="center">
          <Button variant="contained" size="small">
            Small
          </Button>
          <Button variant="contained" size="medium">
            Medium
          </Button>
          <Button variant="contained" size="large">
            Large
          </Button>
        </Stack>
      </Stack>

      {/* With Icons */}
      <Stack spacing={2}>
        <Typography variant="subtitle1">With Icons</Typography>
        <Stack direction="row" spacing={2}>
          <Button variant="contained" startIcon={<SendIcon />}>
            Send
          </Button>
          <Button variant="outlined" startIcon={<DeleteIcon />}>
            Delete
          </Button>
        </Stack>
      </Stack>
    </Paper>
  );
};

export default MUIButton;
