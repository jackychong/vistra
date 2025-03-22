"use client";

import { Stack, Typography } from "@mui/material";
import { PageHeaderProps } from "../types";

export const PageHeader = ({ children }: PageHeaderProps) => {
  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      mb={3}
    >
      <Typography variant="h4" component="h1" sx={{ fontWeight: "normal" }}>
        Documents
      </Typography>
      {children}
    </Stack>
  );
};
