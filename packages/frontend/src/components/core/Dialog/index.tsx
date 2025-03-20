"use client";

import { ReactNode } from "react";
import {
  Box,
  Dialog as MuiDialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogProps as MuiDialogProps,
} from "@mui/material";

export interface DialogProps extends MuiDialogProps {
  title?: string;
  actions?: ReactNode;
  children?: ReactNode;
  open: boolean;
  onClose: () => void;
}

export const Dialog = ({ title, actions, children, ...props }: DialogProps) => {
  return (
    <MuiDialog {...props}>
      {title && <DialogTitle>{title}</DialogTitle>}
      <Box>
        <DialogContent>{children}</DialogContent>
      </Box>
      {actions && <DialogActions>{actions}</DialogActions>}
    </MuiDialog>
  );
};
