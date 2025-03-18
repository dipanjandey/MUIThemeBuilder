import { Slider, Stack, Typography, Paper } from "@mui/material";
import VolumeDown from "@mui/icons-material/VolumeDown";
import VolumeUp from "@mui/icons-material/VolumeUp";
import { useState } from "react";

const marks = [
  {
    value: 0,
    label: "0°C",
  },
  {
    value: 20,
    label: "20°C",
  },
  {
    value: 37,
    label: "37°C",
  },
  {
    value: 100,
    label: "100°C",
  },
];

function valuetext(value: number) {
  return `${value}°C`;
}

const MUISlider = () => {
  const [value, setValue] = useState<number>(30);
  const [rangeValue, setRangeValue] = useState<number[]>([20, 37]);

  const handleChange = (event: Event, newValue: number | number[]) => {
    setValue(newValue as number);
  };

  const handleRangeChange = (event: Event, newValue: number | number[]) => {
    setRangeValue(newValue as number[]);
  };

  return (
    <Paper sx={{ p: 3, my: 2 }}>
      <Typography variant="h5" gutterBottom>
        MUI Slider Variants
      </Typography>

      {/* Basic Slider */}
      <Stack spacing={2} sx={{ mb: 4 }}>
        <Typography variant="subtitle1">Basic Slider</Typography>
        <Slider
          defaultValue={30}
          aria-label="Default"
          valueLabelDisplay="auto"
        />
      </Stack>

      {/* Discrete Slider */}
      <Stack spacing={2} sx={{ mb: 4 }}>
        <Typography variant="subtitle1">Discrete Slider</Typography>
        <Slider
          aria-label="Temperature"
          defaultValue={30}
          getAriaValueText={valuetext}
          valueLabelDisplay="auto"
          step={10}
          marks
          min={0}
          max={100}
        />
      </Stack>

      {/* Range Slider */}
      <Stack spacing={2} sx={{ mb: 4 }}>
        <Typography variant="subtitle1">Range Slider</Typography>
        <Slider
          value={rangeValue}
          onChange={handleRangeChange}
          valueLabelDisplay="auto"
          getAriaValueText={valuetext}
          marks={marks}
        />
      </Stack>

      {/* With Icons */}
      <Stack spacing={2} sx={{ mb: 4 }}>
        <Typography variant="subtitle1">With Icons</Typography>
        <Stack spacing={2} direction="row" alignItems="center">
          <VolumeDown />
          <Slider
            aria-label="Volume"
            value={value}
            onChange={handleChange}
            sx={{ mx: 2 }}
          />
          <VolumeUp />
        </Stack>
      </Stack>

      {/* Sizes */}
      <Stack spacing={2} sx={{ mb: 4 }}>
        <Typography variant="subtitle1">Sizes</Typography>
        <Slider
          size="small"
          defaultValue={30}
          aria-label="Small"
          valueLabelDisplay="auto"
        />
        <Slider
          defaultValue={30}
          aria-label="Normal"
          valueLabelDisplay="auto"
        />
      </Stack>

      {/* Colors */}
      <Stack spacing={2}>
        <Typography variant="subtitle1">Colors</Typography>
        <Slider
          defaultValue={30}
          color="secondary"
          aria-label="Secondary"
          valueLabelDisplay="auto"
        />
        <Slider
          defaultValue={30}
          color="error"
          aria-label="Error"
          valueLabelDisplay="auto"
        />
        <Slider
          defaultValue={30}
          color="info"
          aria-label="Info"
          valueLabelDisplay="auto"
        />
        <Slider
          defaultValue={30}
          color="success"
          aria-label="Success"
          valueLabelDisplay="auto"
        />
        <Slider
          defaultValue={30}
          color="warning"
          aria-label="Warning"
          valueLabelDisplay="auto"
        />
      </Stack>
    </Paper>
  );
};

export default MUISlider;
