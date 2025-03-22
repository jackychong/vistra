import { Box, Select, Pagination, Theme } from "@mui/material";
import { styled } from "@mui/material/styles";
import { DataGrid } from "@mui/x-data-grid";

export const StyledDataGrid = styled(DataGrid)(({ theme }: { theme: Theme }) => ({
  position: "relative",
  border: "none",
  "& .MuiDataGrid-main": {
    minHeight: "400px",
  },
  "& .MuiDataGrid-virtualScroller": {
    opacity: ({ loading }: { loading: boolean }) => loading ? 0.5 : 1,
    transition: "opacity 0.2s ease-in-out",
  },
  "& .MuiDataGrid-sortIcon": {
    opacity: 1
  },
  "& .MuiDataGrid-columnHeader .MuiIconButton-root:hover": {
    backgroundColor: "transparent"
  },
}));

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

export const StyledPaginationItem = styled(Pagination)(({ theme }: { theme: Theme }) => ({
  "& .MuiPaginationItem-root": {
    margin: "0 4px",
  },
  "& .Mui-selected": {
    backgroundColor: "transparent !important",
    color: "#0909b7",
    fontWeight: "bold",
  },
}));
