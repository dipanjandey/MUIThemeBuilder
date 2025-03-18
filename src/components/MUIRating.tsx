import { Rating, Stack, Typography, Paper } from "@mui/material";
import {
  Favorite,
  FavoriteBorder,
  SentimentVeryDissatisfied,
  SentimentDissatisfied,
  SentimentSatisfied,
  SentimentSatisfiedAlt,
  SentimentVerySatisfied,
} from "@mui/icons-material";
import { useState } from "react";

const customIcons: {
  [index: string]: {
    icon: React.ReactElement;
    label: string;
  };
} = {
  1: {
    icon: <SentimentVeryDissatisfied color="error" />,
    label: "Very Dissatisfied",
  },
  2: {
    icon: <SentimentDissatisfied color="error" />,
    label: "Dissatisfied",
  },
  3: {
    icon: <SentimentSatisfied color="warning" />,
    label: "Neutral",
  },
  4: {
    icon: <SentimentSatisfiedAlt color="success" />,
    label: "Satisfied",
  },
  5: {
    icon: <SentimentVerySatisfied color="success" />,
    label: "Very Satisfied",
  },
};

function IconContainer(props: { value: number }) {
  const { value } = props;
  return <span>{customIcons[value].icon}</span>;
}

const MUIRating = () => {
  const [value, setValue] = useState<number | null>(2);

  return (
    <Paper sx={{ p: 3, my: 2 }}>
      <Typography variant="h5" gutterBottom>
        MUI Rating Variants
      </Typography>

      {/* Basic Rating */}
      <Stack spacing={2} sx={{ mb: 4 }}>
        <Typography variant="subtitle1">Basic Rating</Typography>
        <Rating
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
        />
      </Stack>

      {/* Precision */}
      <Stack spacing={2} sx={{ mb: 4 }}>
        <Typography variant="subtitle1">Precision</Typography>
        <Rating name="half-rating" defaultValue={2.5} precision={0.5} />
        <Rating name="quarter-rating" defaultValue={2.75} precision={0.25} />
      </Stack>

      {/* Custom Icon */}
      <Stack spacing={2} sx={{ mb: 4 }}>
        <Typography variant="subtitle1">Custom Icons</Typography>
        <Rating
          name="customized-color"
          defaultValue={2}
          getLabelText={(value) => `${value} Heart${value !== 1 ? "s" : ""}`}
          precision={0.5}
          icon={<Favorite sx={{ color: "error.main" }} />}
          emptyIcon={<FavoriteBorder />}
        />
      </Stack>

      {/* Sizes */}
      <Stack spacing={2} sx={{ mb: 4 }}>
        <Typography variant="subtitle1">Sizes</Typography>
        <Rating name="size-small" defaultValue={2} size="small" />
        <Rating name="size-medium" defaultValue={2} />
        <Rating name="size-large" defaultValue={2} size="large" />
      </Stack>

      {/* Custom Rating */}
      <Stack spacing={2}>
        <Typography variant="subtitle1">Custom Rating</Typography>
        <Rating
          name="highlight-selected-only"
          defaultValue={2}
          IconContainerComponent={IconContainer}
          getLabelText={(value) => customIcons[value].label}
          highlightSelectedOnly
        />
      </Stack>
    </Paper>
  );
};

export default MUIRating;
