import { Components, Theme } from "@mui/material/styles";

export const components: Components<Theme> = {
  MuiButton: {
    styleOverrides: {
      root: {
        textTransform: "none",
        borderRadius: "50px",
        padding: "8px 24px",
      },
      contained: {
        boxShadow: "none",
        "&:hover": {
          boxShadow: "0px 2px 4px rgba(0,0,0,0.2)",
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
      root: {
        "& .MuiOutlinedInput-root": {
          borderRadius: "8px",
        },
      },
    },
  },
  MuiCard: {
    styleOverrides: {
      root: {
        borderRadius: "12px",
        boxShadow: "0px 2px 4px rgba(0,0,0,0.1)",
      },
    },
  },
  MuiTableCell: {
    styleOverrides: {
      root: {
        borderBottom: "1px solid #e0e0e0",
        padding: "16px",
      },
      head: {
        fontWeight: 600,
        backgroundColor: "#fafafa",
      },
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
      root: {
        fontSize: "1.25rem",
        fontWeight: 500,
      },
    },
  },
  MuiChip: {
    styleOverrides: {
      root: {
        borderRadius: "8px",
      },
    },
  },
  MuiTooltip: {
    styleOverrides: {
      tooltip: {
        borderRadius: "4px",
        fontSize: "0.75rem",
      },
    },
  },
  MuiAlert: {
    styleOverrides: {
      root: {
        borderRadius: "8px",
      },
    },
  },
};
