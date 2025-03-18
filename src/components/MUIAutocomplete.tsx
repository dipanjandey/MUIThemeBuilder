import {
  Autocomplete,
  TextField,
  Stack,
  Typography,
  Paper,
} from "@mui/material";

const top100Films = [
  { label: "The Shawshank Redemption", year: 1994 },
  { label: "The Godfather", year: 1972 },
  { label: "The Dark Knight", year: 2008 },
  { label: "12 Angry Men", year: 1957 },
  { label: "Schindler's List", year: 1993 },
  { label: "Pulp Fiction", year: 1994 },
];

const countries = [
  { code: "US", label: "United States" },
  { code: "GB", label: "United Kingdom" },
  { code: "FR", label: "France" },
  { code: "DE", label: "Germany" },
  { code: "IT", label: "Italy" },
];

const MUIAutocomplete = () => {
  return (
    <Paper sx={{ p: 3, my: 2 }}>
      <Typography variant="h5" gutterBottom>
        MUI Autocomplete Variants
      </Typography>

      {/* Basic Autocomplete */}
      <Stack spacing={3} sx={{ mb: 4 }}>
        <Typography variant="subtitle1">Basic Autocomplete</Typography>
        <Autocomplete
          options={top100Films}
          renderInput={(params) => (
            <TextField {...params} label="Choose a movie" />
          )}
        />
      </Stack>

      {/* Multiple Values */}
      <Stack spacing={3} sx={{ mb: 4 }}>
        <Typography variant="subtitle1">Multiple Values</Typography>
        <Autocomplete
          multiple
          options={top100Films}
          renderInput={(params) => (
            <TextField {...params} label="Multiple movies" />
          )}
        />
      </Stack>

      {/* With Size Variant */}
      <Stack spacing={3} sx={{ mb: 4 }}>
        <Typography variant="subtitle1">Size Variants</Typography>
        <Autocomplete
          size="small"
          options={countries}
          renderInput={(params) => <TextField {...params} label="Small size" />}
        />
        <Autocomplete
          options={countries}
          renderInput={(params) => (
            <TextField {...params} label="Normal size" />
          )}
        />
      </Stack>

      {/* Disabled State */}
      <Stack spacing={3}>
        <Typography variant="subtitle1">States</Typography>
        <Autocomplete
          disabled
          options={countries}
          renderInput={(params) => <TextField {...params} label="Disabled" />}
        />
        <Autocomplete
          options={countries}
          renderInput={(params) => (
            <TextField {...params} label="Required" required />
          )}
        />
      </Stack>
    </Paper>
  );
};

export default MUIAutocomplete;
