import { Typography, IconButton, Box, Tooltip } from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import RestartAltIcon from "@mui/icons-material/RestartAlt";

interface EditorHeaderProps {
  onSave: () => void;
  onReset: () => void;
}

const EditorHeader: React.FC<EditorHeaderProps> = ({ onSave, onReset }) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        mb: 2,
      }}
    >
      <Typography variant="h6">Theme Code</Typography>
      <Box>
        <Tooltip title="Reset Changes">
          <IconButton
            color="primary"
            onClick={onReset}
            size="small"
            sx={{ mr: 1 }}
          >
            <RestartAltIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Save Changes">
          <IconButton color="primary" onClick={onSave} size="small">
            <SaveIcon />
          </IconButton>
        </Tooltip>
      </Box>
    </Box>
  );
};

export default EditorHeader;
