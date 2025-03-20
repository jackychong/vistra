"use client";

import { Button, Stack } from "@mui/material";
import { Upload as UploadIcon, Add as AddIcon } from "@mui/icons-material";
import { ActionButtonsProps } from "../types";

export const ActionButtons = ({
  onUploadFiles,
  onAddFolder,
}: ActionButtonsProps) => {
  return (
    <Stack direction="row" spacing={2}>
      <Button
        variant="outlined"
        startIcon={<UploadIcon />}
        onClick={onUploadFiles}
        sx={{
          borderRadius: "50px",
          textTransform: "none",
          color: "primary.main",
          borderColor: "primary.main",
          px: 3,
        }}
      >
        Upload files
      </Button>
      <Button
        variant="contained"
        startIcon={<AddIcon />}
        onClick={onAddFolder}
        sx={{
          borderRadius: "50px",
          textTransform: "none",
          bgcolor: "#1a237e",
          "&:hover": {
            bgcolor: "#0d47a1",
          },
          px: 3,
        }}
      >
        Add new folder
      </Button>
    </Stack>
  );
};
