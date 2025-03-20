"use client";

import {
  TextField as MuiTextField,
  TextFieldProps as MuiTextFieldProps,
} from "@mui/material";

export interface TextFieldProps extends MuiTextFieldProps {}

export const TextField = (props: TextFieldProps) => {
  return <MuiTextField {...props} />;
};
