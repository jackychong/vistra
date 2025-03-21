"use client";

import { DocumentTableProps } from "../types";
import { formatFileSize, Item } from "@/services/api";
import {
  Box,
  LinearProgress,
  IconButton,
  Paper,
  Stack,
  Typography,
  Select,
  MenuItem,
  Pagination,
} from "@mui/material";
import { styled, Theme } from "@mui/material/styles";
import { DataGrid } from "@mui/x-data-grid";
import {
  MoreVert as MoreVertIcon,
  Folder as FolderIcon,
  InsertDriveFile as FileIcon,
} from "@mui/icons-material";

const StyledFooter = styled(Box)(({ theme }: { theme: Theme }) => ({
  padding: "8px 16px",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  borderTop: `1px solid ${theme.palette.divider}`,
}));

const StyledRowsPerPage = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: "8px",
});

const StyledSelect = styled(Select)(({ theme }: { theme: Theme }) => ({
  minWidth: "70px",
  height: "32px",
  ".MuiOutlinedInput-notchedOutline": {
    border: `1px solid ${theme.palette.divider}`,
  },
  "&.MuiInputBase-root": {
    borderRadius: "4px",
  },
}));

const StyledPaginationItem = styled(Pagination)({
  "& .MuiPaginationItem-root": {
    margin: "0 4px",
  },
});

interface CustomFooterProps {
  pagination: {
    page: number;
    limit: number;
    totalItems: number;
    totalPages: number;
  };
  onPaginationChange: (model: { page: number; pageSize: number }) => void;
}

const CustomFooter = ({
  pagination,
  onPaginationChange,
}: CustomFooterProps) => {
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
        <Typography>Show</Typography>
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
        <Typography>rows per page</Typography>
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

export const DocumentTable = ({
  items,
  loading,
  pagination,
  sorting,
  selectedItems,
  onPaginationChange,
  onSortChange,
  onSelectionChange,
  onRowClick: handleRowClick,
}: DocumentTableProps) => {
  const handleClick = (params: { row: Item }) => {
    handleRowClick(params.row);
  };

  const columns = [
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      minWidth: 200,
      renderCell: (params: any) => (
        <Stack direction="row" alignItems="center" spacing={1}>
          {params.row.itemType === "folder" ? (
            <FolderIcon sx={{ color: "warning.main" }} />
          ) : (
            <FileIcon sx={{ color: "info.main" }} />
          )}
          {params.value}
        </Stack>
      ),
    },
    {
      field: "user",
      headerName: "Created by",
      width: 150,
      renderCell: (params: any) => params.row?.user?.name,
    },
    {
      field: "updatedAt",
      headerName: "Date",
      width: 150,
      renderCell: (params: any) => {
        return new Date(params.value).toLocaleDateString("en-UK", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        });
      },
    },
    {
      field: "size",
      headerName: "File size",
      width: 120,
      valueFormatter: (params: any) => {
        return params?.row?.itemType === "file"
          ? formatFileSize(params.value)
          : "-";
      },
    },
    {
      field: "actions",
      headerName: "",
      width: 70,
      sortable: false,
      renderCell: () => (
        <IconButton size="small">
          <MoreVertIcon fontSize="small" />
        </IconButton>
      ),
    },
  ];

  return (
    <Paper sx={{ borderRadius: 2, overflow: "hidden", mb: 2, height: 500 }}>
      {loading && (
        <Box sx={{ width: "100%", position: "absolute", top: 0, zIndex: 1 }}>
          <LinearProgress />
        </Box>
      )}

      <DataGrid
        rows={items}
        columns={columns}
        initialState={{
          sorting: {
            sortModel: [
              {
                field: sorting.field,
                sort: sorting.order === "ASC" ? "asc" : "desc",
              },
            ],
          },
        }}
        paginationModel={{
          pageSize: pagination.limit,
          page: pagination.page - 1,
        }}
        pageSizeOptions={[10, 20, 50]}
        pagination
        paginationMode="server"
        rowCount={pagination.totalItems || 10}
        onPaginationModelChange={onPaginationChange}
        sortingMode="server"
        onSortModelChange={onSortChange}
        checkboxSelection
        onRowSelectionModelChange={onSelectionChange}
        rowSelectionModel={selectedItems}
        onRowClick={handleClick}
        loading={loading}
        getRowClassName={(params: any) => {
          return params.row.itemType === "folder" ? "folder-row" : "";
        }}
        slots={{
          footer: CustomFooter,
        }}
        slotProps={{
          footer: {
            pagination,
            onPaginationChange,
          },
        }}
        components={{
          LoadingOverlay: () => null,
        }}
        sx={(theme: Theme) => ({
          position: "relative",
          border: "none",
          "& .MuiDataGrid-main": {
            minHeight: "400px",
          },
          "& .MuiDataGrid-virtualScroller": {
            opacity: loading ? 0.5 : 1,
            transition: "opacity 0.2s ease-in-out",
            backgroundColor: theme.palette.background.default,
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.primary.contrastText,
          },
          "& .MuiDataGrid-columnHeaderTitle": {
            fontWeight: "bold",
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
          "& .MuiDataGrid-row": {
            "&:hover": {
              backgroundColor: theme.palette.action.hover,
            },
          },
          "& .MuiDataGrid-cell:focus, & .MuiDataGrid-cell:focus-within": {
            outline: "none",
          },
          "& .MuiDataGrid-columnHeader:focus, & .MuiDataGrid-columnHeader:focus-within":
            {
              outline: "none",
            },
        })}
      />
    </Paper>
  );
};
