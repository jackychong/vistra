"use client";

import { Button, Stack, Typography } from "@mui/material";
import { PageHeaderProps } from "../types";

export const PageHeader = ({ currentFolderId, onBackToRoot, children }: PageHeaderProps) => {
  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      mb={3}
    >
      <Stack direction="row" alignItems="center">
        <Typography variant="h4" component="h1" sx={{ fontWeight: "normal" }}>
          Documents
        </Typography>
        {currentFolderId && (
          <Button
            variant="text"
            onClick={onBackToRoot}
            sx={{ ml: 2, textTransform: "none" }}
          >
            (Back to Root)
          </Button>
        )}
      </Stack>
      {children}
    </Stack>
  );
};
