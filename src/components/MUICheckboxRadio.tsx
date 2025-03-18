import {
  Checkbox,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  FormGroup,
  Stack,
  Typography,
  Paper,
} from "@mui/material";
import { Favorite, FavoriteBorder } from "@mui/icons-material";
import { useState } from "react";

const MUICheckboxRadio = () => {
  const [radioValue, setRadioValue] = useState("female");
  const [state, setState] = useState({
    gilad: true,
    jason: false,
    antoine: false,
  });

  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRadioValue(event.target.value);
  };

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState({
      ...state,
      [event.target.name]: event.target.checked,
    });
  };

  return (
    <Paper sx={{ p: 3, my: 2 }}>
      <Typography variant="h5" gutterBottom>
        MUI Checkbox & Radio Variants
      </Typography>

      {/* Basic Checkboxes */}
      <Stack spacing={2} sx={{ mb: 4 }}>
        <Typography variant="subtitle1">Basic Checkboxes</Typography>
        <FormGroup>
          <FormControlLabel
            control={<Checkbox defaultChecked />}
            label="Default"
          />
          <FormControlLabel required control={<Checkbox />} label="Required" />
          <FormControlLabel disabled control={<Checkbox />} label="Disabled" />
        </FormGroup>
      </Stack>

      {/* Checkbox with Icon */}
      <Stack spacing={2} sx={{ mb: 4 }}>
        <Typography variant="subtitle1">Checkbox with Custom Icon</Typography>
        <FormControlLabel
          control={
            <Checkbox icon={<FavoriteBorder />} checkedIcon={<Favorite />} />
          }
          label="Custom icon"
        />
      </Stack>

      {/* Checkbox Group */}
      <Stack spacing={2} sx={{ mb: 4 }}>
        <Typography variant="subtitle1">Checkbox Group</Typography>
        <FormControl component="fieldset">
          <FormLabel component="legend">Assign responsibility</FormLabel>
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  checked={state.gilad}
                  onChange={handleCheckboxChange}
                  name="gilad"
                />
              }
              label="Gilad Gray"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={state.jason}
                  onChange={handleCheckboxChange}
                  name="jason"
                />
              }
              label="Jason Killian"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={state.antoine}
                  onChange={handleCheckboxChange}
                  name="antoine"
                />
              }
              label="Antoine Llorca"
            />
          </FormGroup>
        </FormControl>
      </Stack>

      {/* Radio Buttons */}
      <Stack spacing={2} sx={{ mb: 4 }}>
        <Typography variant="subtitle1">Radio Buttons</Typography>
        <FormControl>
          <FormLabel id="demo-radio-buttons-group-label">Gender</FormLabel>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            value={radioValue}
            onChange={handleRadioChange}
            name="radio-buttons-group"
          >
            <FormControlLabel
              value="female"
              control={<Radio />}
              label="Female"
            />
            <FormControlLabel value="male" control={<Radio />} label="Male" />
            <FormControlLabel value="other" control={<Radio />} label="Other" />
          </RadioGroup>
        </FormControl>
      </Stack>

      {/* Radio Button Sizes */}
      <Stack spacing={2}>
        <Typography variant="subtitle1">Radio Button Sizes</Typography>
        <div>
          <Radio size="small" />
          <Radio />
          <Radio size="medium" />
        </div>
      </Stack>
    </Paper>
  );
};

export default MUICheckboxRadio;
