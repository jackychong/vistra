"use client";

import {
  Dialog as MuiDialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogProps as MuiDialogProps,
} from "@mui/material";

export interface DialogProps extends MuiDialogProps {
  title?: string;
  actions?: React.ReactNode;
}

export const Dialog = ({ title, actions, children, ...props }: DialogProps) => {
  return (
    <MuiDialog {...props}>
      {title && <DialogTitle>{title}</DialogTitle>}
      <DialogContent>{children}</DialogContent>
      {actions && <DialogActions>{actions}</DialogActions>}
    </MuiDialog>
  );
};
