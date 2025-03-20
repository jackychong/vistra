     "use client";

import { DocumentTableProps } from "../types";
import { formatFileSize, Item } from "@/services/api";
import { Box, CircularProgress, IconButton, Paper, Stack, Typography, Select, MenuItem, Pagination } from "@mui/material";
import { styled } from "@mui/material/styles";
import { DataGrid } from "@mui/x-data-grid";
import {
  MoreVert as MoreVertIcon,
  Folder as FolderIcon,
  InsertDriveFile as FileIcon,
} from "@mui/icons-material";

const StyledFooter = styled(Box)({
  padding: "8px 16px",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  borderTop: "1px solid rgba(224, 224, 224, 1)"
});

const StyledRowsPerPage = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: "8px"
});

const StyledSelect = styled(Select)({
  minWidth: "70px",
  height: "32px",
  ".MuiOutlinedInput-notchedOutline": {
    border: "1px solid rgba(0, 0, 0, 0.23)"
  },
  "&.MuiInputBase-root": {
    borderRadius: "4px"
  }
});

const StyledPaginationItem = styled(Pagination)({
  "& .MuiPaginationItem-root": {
    margin: "0 4px"
  }
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

const CustomFooter = ({ pagination, onPaginationChange }: CustomFooterProps) => {
  const handlePageSizeChange = (event: any) => {
    onPaginationChange({
      page: 0,
      pageSize: Number(event.target.value)
    });
  };

  const handlePageChange = (_: any, newPage: number) => {
    onPaginationChange({
      page: newPage - 1,
      pageSize: pagination.limit
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
            <FolderIcon sx={{ color: "#FFA726" }} />
          ) : (
            <FileIcon sx={{ color: "#2196F3" }} />
          )}
          {params.value}
        </Stack>
      ),
    },
    {
      field: "user",
      headerName: "Created by",
      width: 150,
      valueGetter: (params: any) => params.row?.user.name,
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
      {loading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
          }}
        >
          <CircularProgress size={40} />
        </Box>
      ) : (
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
            page: pagination.page - 1, // DataGrid uses 0-based indexing
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
            footer: CustomFooter
          }}
          slotProps={{
            footer: {
              pagination,
              onPaginationChange
            }
          }}
          sx={{
            border: "none",
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: "#0D47A1", // Dark blue
              color: "white",
            },
            "& .MuiDataGrid-columnHeaderTitle": {
              fontWeight: "bold",
            },
            "& .folder-row": {
              cursor: "pointer",
            },
            "& .MuiDataGrid-cell:focus-within": {
              outline: "none",
            },
          }}
        />
      )}
    </Paper>
  );
};
