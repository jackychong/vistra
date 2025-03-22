import { Box, IconButton, Button, Theme } from "@mui/material";
import { styled } from "@mui/material/styles";

export const StyledMobileUploadButton = styled(IconButton)(
  ({ theme }: { theme: Theme }) => ({
    color: theme.palette.primary.main,
    border: "1px solid",
    borderRadius: 8,
  }),
);

export const StyledMobileAddButton = styled(IconButton)(
  ({ theme }: { theme: Theme }) => ({
    backgroundColor: theme.palette.primary.main,
    border: "1px solid",
    borderRadius: 8,
    "&:hover": {
      backgroundColor: theme.palette.primary.dark,
    },
    "& .MuiSvgIcon-root": {
      color: theme.palette.common.white,
    },
  }),
);

export const StyledDesktopUploadButton = styled(Button)(
  ({ theme }: { theme: Theme }) => ({
    // Inherits variant="outlined" from props
  }),
);

export const StyledDesktopAddButton = styled(Button)(
  ({ theme }: { theme: Theme }) => ({
    // Inherits variant="contained" from props
  }),
);
