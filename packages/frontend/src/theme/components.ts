import { Components, Theme } from "@mui/material/styles";

export const components: Components<Theme> = {
  MuiButton: {
    styleOverrides: {
      root: ({ theme }) => ({
        textTransform: "none",
        borderRadius: "50px",
        padding: "8px 24px",
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
      root: ({ theme }) => ({
        "& .MuiOutlinedInput-root": {
          borderRadius: "8px",
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: theme.palette.primary.main,
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: theme.palette.primary.main,
          },
        },
      }),
    },
  },
  MuiCard: {
    styleOverrides: {
      root: ({ theme }) => ({
        borderRadius: "12px",
        boxShadow: "0px 2px 4px " + theme.palette.divider,
      }),
    },
  },
  MuiTableCell: {
    styleOverrides: {
      root: ({ theme }) => ({
        borderBottom: `1px solid ${theme.palette.divider}`,
        padding: "16px",
      }),
      head: ({ theme }) => ({
        fontWeight: 600,
        backgroundColor: theme.palette.background.default,
        color: theme.palette.text.primary,
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
      root: ({ theme }) => ({
        fontSize: "1.25rem",
        fontWeight: 500,
        color: theme.palette.text.primary,
      }),
    },
  },
  MuiChip: {
    styleOverrides: {
      root: ({ theme }) => ({
        borderRadius: "8px",
        "&.MuiChip-filled": {
          backgroundColor: theme.palette.primary.main,
          color: theme.palette.primary.contrastText,
        },
        "&.MuiChip-outlined": {
          borderColor: theme.palette.primary.main,
          color: theme.palette.primary.main,
        },
      }),
    },
  },
  MuiTooltip: {
    styleOverrides: {
      tooltip: ({ theme }) => ({
        backgroundColor: theme.palette.grey[800],
        color: theme.palette.common.white,
        borderRadius: "4px",
        fontSize: "0.75rem",
      }),
    },
  },
  MuiAlert: {
    styleOverrides: {
      root: {
        borderRadius: "8px",
      },
      standardSuccess: ({ theme }) => ({
        backgroundColor: theme.palette.success.light,
        color: theme.palette.success.main,
      }),
      standardError: ({ theme }) => ({
        backgroundColor: theme.palette.error.light,
        color: theme.palette.error.main,
      }),
      standardWarning: ({ theme }) => ({
        backgroundColor: theme.palette.warning.light,
        color: theme.palette.warning.main,
      }),
      standardInfo: ({ theme }) => ({
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
};
