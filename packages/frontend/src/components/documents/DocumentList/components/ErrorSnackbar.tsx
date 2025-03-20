"use client";

import { Alert, Snackbar } from "@mui/material";
import { ErrorSnackbarProps } from "../types";

export const ErrorSnackbar = ({ error, onClose }: ErrorSnackbarProps) => {
  return (
    <Snackbar
      open={!!error}
      autoHideDuration={6000}
      onClose={onClose}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
    >
      <Alert severity="error" onClose={onClose}>
        {error}
      </Alert>
    </Snackbar>
  );
};
