"use client";

import { Box, CircularProgress, IconButton, Paper, Stack } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import {
  MoreVert as MoreVertIcon,
  Folder as FolderIcon,
  InsertDriveFile as FileIcon,
} from "@mui/icons-material";
import { DocumentTableProps } from "../types";
import { formatFileSize, Item } from "@/services/api";

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
      field: "createdAt",
      headerName: "Date",
      width: 150,
      valueFormatter: (params: any) => {
        return new Date(params.value).toLocaleDateString("en-US", {
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
        return params?.row?.itemType === "file" ? formatFileSize(params.value) : "-";
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
