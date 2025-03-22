import { Box, Select, Pagination, Theme } from "@mui/material";
import { styled } from "@mui/material/styles";

export const StyledFooter = styled(Box)(({ theme }: { theme: Theme }) => ({
  padding: "8px 16px",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  borderTop: `1px solid ${theme.palette.divider}`,
}));

export const StyledRowsPerPage = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: "8px",
});

export const StyledSelect = styled(Select)(({ theme }: { theme: Theme }) => ({
  minWidth: "70px",
  height: "32px",
  ".MuiOutlinedInput-notchedOutline": {
    border: `1px solid ${theme.palette.divider}`,
  },
  "&.MuiInputBase-root": {
    borderRadius: "4px",
  },
}));

export const StyledPaginationItem = styled(Pagination)({
  "& .MuiPaginationItem-root": {
    margin: "0 4px",
  },
});
