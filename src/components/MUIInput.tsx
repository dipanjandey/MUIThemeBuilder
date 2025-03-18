import {
  TextField,
  Stack,
  Typography,
  Paper,
  InputAdornment,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircle from "@mui/icons-material/AccountCircle";

const MUIInput = () => {
  return (
    <Paper sx={{ p: 3, my: 2 }}>
      <Typography variant="h5" gutterBottom>
        MUI Input Variants
      </Typography>

      {/* Basic Variants */}
      <Stack spacing={2} sx={{ mb: 4 }}>
        <Typography variant="subtitle1">Basic Variants</Typography>
        <Stack spacing={2}>
          <TextField label="Standard" variant="standard" />
          <TextField label="Outlined" variant="outlined" />
          <TextField label="Filled" variant="filled" />
        </Stack>
      </Stack>

      {/* States */}
      <Stack spacing={2} sx={{ mb: 4 }}>
        <Typography variant="subtitle1">Input States</Typography>
        <Stack spacing={2}>
          <TextField label="Normal" />
          <TextField label="Disabled" disabled />
          <TextField label="Error" error helperText="Error message" />
          <TextField label="Required" required />
        </Stack>
      </Stack>

      {/* With Icons and Adornments */}
      <Stack spacing={2} sx={{ mb: 4 }}>
        <Typography variant="subtitle1">With Icons and Adornments</Typography>
        <Stack spacing={2}>
          <TextField
            label="Search"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
          <TextField
            label="Username"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AccountCircle />
                </InputAdornment>
              ),
            }}
          />
          <TextField
            label="Amount"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">$</InputAdornment>
              ),
              endAdornment: <InputAdornment position="end">.00</InputAdornment>,
            }}
          />
        </Stack>
      </Stack>

      {/* Sizes */}
      <Stack spacing={2}>
        <Typography variant="subtitle1">Size Variants</Typography>
        <Stack spacing={2}>
          <TextField label="Small" size="small" />
          <TextField label="Normal" />
        </Stack>
      </Stack>
    </Paper>
  );
};

export default MUIInput;
