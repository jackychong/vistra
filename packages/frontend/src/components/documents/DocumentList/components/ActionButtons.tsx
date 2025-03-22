"use client";

import { Button, Stack, IconButton, useMediaQuery, useTheme } from "@mui/material";
import { Upload as UploadIcon, Add as AddIcon } from "@mui/icons-material";
import { ActionButtonsProps } from "../types";

export const ActionButtons = ({
  onUploadFiles,
  onAddFolder,
}: ActionButtonsProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Stack direction="row" spacing={2}>
      {isMobile ? (
        <>
          <IconButton
            color="primary"
            onClick={onUploadFiles}
          >
            <UploadIcon />
          </IconButton>
          <IconButton
            color="primary"
            onClick={onAddFolder}
            sx={{
              backgroundColor: "primary.main",
              "&:hover": {
                backgroundColor: "primary.dark",
              },
            }}
          >
            <AddIcon sx={{ color: "common.white" }} />
          </IconButton>
        </>
      ) : (
        <>
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
        </>
      )}
    </Stack>
  );
};
