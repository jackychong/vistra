"use client";

import { ChangeEvent, KeyboardEvent, ReactNode } from "react";
import {
  TextField as MuiTextField,
  TextFieldProps as MuiTextFieldProps,
} from "@mui/material";

export interface TextFieldProps extends MuiTextFieldProps {
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  onKeyDown?: (event: KeyboardEvent<HTMLInputElement>) => void;
  autoFocus?: boolean;
  fullWidth?: boolean;
  error?: boolean;
  helperText?: ReactNode;
  disabled?: boolean;
  value?: string;
  label?: string;
}

export const TextField = (props: TextFieldProps) => {
  return <MuiTextField {...props} />;
};
