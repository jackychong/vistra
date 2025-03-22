"use client";

import { Stack, useMediaQuery, useTheme } from "@mui/material";
import { Upload as UploadIcon, Add as AddIcon } from "@mui/icons-material";
import { ActionButtonsProps } from "./ActionButtons.d";
import {
  StyledMobileUploadButton,
  StyledMobileAddButton,
  StyledDesktopUploadButton,
  StyledDesktopAddButton,
} from "./styles";

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
          <StyledMobileUploadButton onClick={onUploadFiles}>
            <UploadIcon />
          </StyledMobileUploadButton>
          <StyledMobileAddButton onClick={onAddFolder}>
            <AddIcon />
          </StyledMobileAddButton>
        </>
      ) : (
        <>
          <StyledDesktopUploadButton
            variant="outlined"
            startIcon={<UploadIcon />}
            onClick={onUploadFiles}
          >
            Upload files
          </StyledDesktopUploadButton>
          <StyledDesktopAddButton
            variant="contained"
            startIcon={<AddIcon />}
            onClick={onAddFolder}
          >
            Add new folder
          </StyledDesktopAddButton>
        </>
      )}
    </Stack>
  );
};
