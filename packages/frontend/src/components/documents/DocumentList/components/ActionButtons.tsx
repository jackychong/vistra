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
      >
        Upload files
      </Button>
      <Button
        variant="contained"
        startIcon={<AddIcon />}
        onClick={onAddFolder}
      >
        Add new folder
      </Button>
    </Stack>
  );
};
