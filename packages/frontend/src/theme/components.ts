import { Components, Theme, ThemeOptions } from "@mui/material/styles";
import { colors } from "./palette";

export const components: Components<Theme> = {
  MuiDataGrid: {
    styleOverrides: {
      root: ({ theme }: { theme: Theme }) => ({
        "& .MuiDataGrid-row": {
          "&:hover": {
            backgroundColor: theme.palette.action.hover,
          },
        },
        "& .MuiDataGrid-columnHeaders": {
          backgroundColor: colors.vistraBlue,
        },
        "& .MuiDataGrid-columnHeaderTitle": {
          color: theme.palette.common.white,
          fontSize: "14px",
        },
        "& .folder-row": {
          cursor: "pointer",
        },
        "& .MuiDataGrid-cell": {
          borderBottom: `1px solid ${theme.palette.divider}`,
          "&:focus-within": {
            outline: "none",
          },
        },
        "& .MuiDataGrid-cell:focus, & .MuiDataGrid-cell:focus-within": {
          outline: "none",
        },
        "& .MuiDataGrid-columnHeader:focus, & .MuiDataGrid-columnHeader:focus-within":
          {
            outline: "none",
          },
        "& .MuiDataGrid-columnHeaderTitleContainer": {
          color: "white",
          ".MuiSvgIcon-root": {
            color: "white",
          },
        },
        "& .MuiDataGrid-columnSeparator": {
          display: "none",
        },
      }),
    },
  },
  MuiButton: {
    styleOverrides: {
      root: ({ theme }: { theme: Theme }) => ({
        textTransform: "none",
        borderRadius: "8px",
        padding: "8px 24px",
        fontSize: "14px",
        fontWeight: 500,
        "&.MuiButton-contained": {
          backgroundColor: theme.palette.primary.main,
          color: theme.palette.primary.contrastText,
          "&:hover": {
            backgroundColor: theme.palette.primary.dark,
          },
        },
        "&.MuiButton-outlined": {
          borderColor: theme.palette.primary.main,
          color: theme.palette.primary.main,
          backgroundColor: theme.palette.background.paper,
          "&:hover": {
            backgroundColor: theme.palette.action.hover,
          },
        },
      }),
      contained: {
        boxShadow: "none",
        "&:hover": {
          boxShadow: "none",
        },
      },
    },
    defaultProps: {
      disableElevation: true,
    },
  },
  MuiTextField: {
    defaultProps: {
      variant: "outlined",
      size: "small",
    },
    styleOverrides: {
      root: ({ theme }: { theme: Theme }) => ({
        "& .MuiOutlinedInput-root": {
          borderRadius: "8px",
          backgroundColor: theme.palette.background.paper,
          transition: "all 0.2s ease-in-out",
          "&:hover": {
            backgroundColor: theme.palette.background.default,
          },
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: theme.palette.primary.main,
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: theme.palette.primary.main,
          },
          "& .MuiOutlinedInput-input": {
            padding: "12px 16px",
          },
          "& .MuiInputAdornment-root": {
            marginRight: "12px",
          },
        },
      }),
    },
  },
  MuiCard: {
    styleOverrides: {
      root: ({ theme }: { theme: Theme }) => ({
        borderRadius: "12px",
        boxShadow: "0px 2px 4px " + theme.palette.divider,
      }),
    },
  },
  MuiDialog: {
    styleOverrides: {
      paper: {
        borderRadius: "12px",
      },
    },
  },
  MuiDialogTitle: {
    styleOverrides: {
      root: ({ theme }: { theme: Theme }) => ({
        fontSize: "1.25rem",
        fontWeight: 500,
        color: theme.palette.text.primary,
      }),
    },
  },
  MuiAlert: {
    styleOverrides: {
      root: {
        borderRadius: "8px",
      },
      standardSuccess: ({ theme }: { theme: Theme }) => ({
        backgroundColor: theme.palette.success.light,
        color: theme.palette.success.main,
      }),
      standardError: ({ theme }: { theme: Theme }) => ({
        backgroundColor: theme.palette.error.light,
        color: theme.palette.error.main,
      }),
      standardWarning: ({ theme }: { theme: Theme }) => ({
        backgroundColor: theme.palette.warning.light,
        color: theme.palette.warning.main,
      }),
      standardInfo: ({ theme }: { theme: Theme }) => ({
        backgroundColor: theme.palette.info.light,
        color: theme.palette.info.main,
      }),
    },
  },
  MuiLinearProgress: {
    styleOverrides: {
      root: {
        borderRadius: "4px",
      },
    },
  },
  MuiCheckbox: {
    styleOverrides: {
      root: ({ theme }: { theme: Theme }) => ({
        padding: "8px",
        color: theme.palette.text.secondary,
        "&.Mui-checked": {
          color: theme.palette.primary.main,
        },
      }),
    },
  },
  MuiIconButton: {
    styleOverrides: {
      root: ({ theme }: { theme: Theme }) => ({
        color: theme.palette.text.secondary,
        "&:hover": {
          backgroundColor: theme.palette.action.hover,
        },
      }),
    },
  },
};
