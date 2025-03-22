  import React from "react";
import { Typography, MenuItem } from "@mui/material";
import type { CustomFooterProps } from "./DocumentTable.d";
import {
  StyledFooter,
  StyledRowsPerPage,
  StyledSelect,
  StyledPaginationItem,
} from "./styles";

export const CustomFooter = ({ pagination, onPaginationChange }: CustomFooterProps) => {
  const handlePageSizeChange = (event: any) => {
    onPaginationChange({
      page: 0,
      pageSize: Number(event.target.value),
    });
  };

  const handlePageChange = (_: any, newPage: number) => {
    onPaginationChange({
      page: newPage - 1,
      pageSize: pagination.limit,
    });
  };

  return (
    <StyledFooter>
      <StyledRowsPerPage>
        <Typography variant="caption">Show</Typography>
        <StyledSelect
          size="small"
          value={pagination.limit}
          onChange={handlePageSizeChange}
        >
          {[10, 20, 50].map((size) => (
            <MenuItem key={size} value={size}>
              {size}
            </MenuItem>
          ))}
        </StyledSelect>
        <Typography variant="caption">rows per page</Typography>
      </StyledRowsPerPage>
      <StyledPaginationItem
        page={pagination.page}
        count={pagination.totalPages}
        onChange={handlePageChange}
        shape="rounded"
        boundaryCount={2}
        siblingCount={1}
      />
    </StyledFooter>
  );
};
