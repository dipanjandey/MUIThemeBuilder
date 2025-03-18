import {
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Stack,
  Typography,
  Paper,
  Chip,
  OutlinedInput,
  SelectChangeEvent,
} from "@mui/material";
import { useState } from "react";

const names = [
  "Oliver Hansen",
  "Van Henry",
  "April Tucker",
  "Ralph Hubbard",
  "Omar Alexander",
  "Carlos Abbott",
  "Miriam Wagner",
  "Bradley Wilkerson",
  "Virginia Andrews",
  "Kelly Snyder",
];

const MUISelect = () => {
  const [age, setAge] = useState("");
  const [personName, setPersonName] = useState<string[]>([]);

  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value as string);
  };

  const handleMultipleChange = (
    event: SelectChangeEvent<typeof personName>
  ) => {
    const {
      target: { value },
    } = event;
    setPersonName(typeof value === "string" ? value.split(",") : value);
  };

  return (
    <Paper sx={{ p: 3, my: 2 }}>
      <Typography variant="h5" gutterBottom>
        MUI Select Variants
      </Typography>

      {/* Basic Select */}
      <Stack spacing={3} sx={{ mb: 4 }}>
        <Typography variant="subtitle1">Basic Select</Typography>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Age</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={age}
            label="Age"
            onChange={handleChange}
          >
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
        </FormControl>
      </Stack>

      {/* Multiple Select */}
      <Stack spacing={3} sx={{ mb: 4 }}>
        <Typography variant="subtitle1">Multiple Select</Typography>
        <FormControl fullWidth>
          <InputLabel id="demo-multiple-name-label">Name</InputLabel>
          <Select
            labelId="demo-multiple-name-label"
            id="demo-multiple-name"
            multiple
            value={personName}
            onChange={handleMultipleChange}
            input={<OutlinedInput label="Name" />}
            renderValue={(selected) => (
              <Stack direction="row" spacing={0.5} flexWrap="wrap">
                {selected.map((value) => (
                  <Chip key={value} label={value} />
                ))}
              </Stack>
            )}
          >
            {names.map((name) => (
              <MenuItem key={name} value={name}>
                {name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Stack>

      {/* Variants */}
      <Stack spacing={3} sx={{ mb: 4 }}>
        <Typography variant="subtitle1">Variants</Typography>
        <FormControl variant="standard" fullWidth>
          <InputLabel id="demo-simple-select-standard-label">Age</InputLabel>
          <Select
            labelId="demo-simple-select-standard-label"
            id="demo-simple-select-standard"
            value={age}
            onChange={handleChange}
            label="Age"
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
        </FormControl>

        <FormControl variant="filled" fullWidth>
          <InputLabel id="demo-simple-select-filled-label">Age</InputLabel>
          <Select
            labelId="demo-simple-select-filled-label"
            id="demo-simple-select-filled"
            value={age}
            onChange={handleChange}
            label="Age"
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
        </FormControl>
      </Stack>

      {/* Sizes */}
      <Stack spacing={3}>
        <Typography variant="subtitle1">Sizes</Typography>
        <FormControl size="small" fullWidth>
          <InputLabel id="demo-select-small-label">Age</InputLabel>
          <Select
            labelId="demo-select-small-label"
            id="demo-select-small"
            value={age}
            label="Age"
            onChange={handleChange}
          >
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
        </FormControl>
      </Stack>
    </Paper>
  );
};

export default MUISelect;
