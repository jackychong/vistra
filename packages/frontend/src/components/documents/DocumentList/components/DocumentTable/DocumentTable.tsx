import React, { useState } from "react";
import { Box, IconButton, Paper, Stack, Typography, MenuItem, Menu } from "@mui/material";
import {
  MoreVert as MoreVertIcon,
  FolderOpenOutlined as FolderIcon,
  DescriptionOutlined as FileIcon,
} from "@mui/icons-material";
import { formatFileSize, Item } from "@/services/api";
import type { DocumentTableProps, CustomFooterProps } from "./Component";
import {
  StyledFooter,
  StyledRowsPerPage,
  StyledSelect,
  StyledPaginationItem,
  StyledDataGrid,
  StyledNameCell,
  StyledNameText,
} from "./styles";

const CustomFooter = ({ pagination, onPaginationChange }: CustomFooterProps) => {
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
  onDeleteItem,
  onMoveItem,
  onArchiveItem,
}: DocumentTableProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);

  const handleMenuOpen = (event: React.MouseEvent<HTMLButtonElement>, item: Item) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
    setSelectedItem(item);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedItem(null);
  };

  const handleClick = (params: { row: Item }) => {
    handleRowClick(params.row);
  };

  const handleDelete = () => {
    if (selectedItem && onDeleteItem) {
      onDeleteItem(selectedItem);
    }
    handleMenuClose();
  };

  const handleMove = () => {
    if (selectedItem && onMoveItem) {
      onMoveItem(selectedItem);
    }
    handleMenuClose();
  };

  const handleArchive = () => {
    if (selectedItem && onArchiveItem) {
      onArchiveItem(selectedItem);
    }
    handleMenuClose();
  };

  const columns = [
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      minWidth: 200,
      sortable: true,
      renderCell: (params: any) => (
        <StyledNameCell>
          {params.row.itemType === "folder" ? (
            <FolderIcon sx={{ color: "info.main", flexShrink: 0 }} />
          ) : (
            <FileIcon sx={{ color: "info.main", flexShrink: 0 }} />
          )}
          <StyledNameText>{params.value}</StyledNameText>
        </StyledNameCell>
      ),
    },
    {
      field: "user",
      headerName: "Created by",
      width: 150,
      sortable: false,
      renderCell: (params: any) => params.row?.user?.name,
    },
    {
      field: "updatedAt",
      headerName: "Date",
      width: 150,
      sortable: true,
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
      sortable: false,
      renderCell: (params: any) => {
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
      renderCell: (params: any) => (
        <>
          <IconButton
            size="small"
            onClick={(e: React.MouseEvent<HTMLButtonElement>) => handleMenuOpen(e, params.row)}
          >
            <MoreVertIcon fontSize="small" />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl) && selectedItem?.id === params.row.id}
            onClose={handleMenuClose}
            onClick={(e: React.MouseEvent<HTMLElement>) => e.stopPropagation()}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
          >
            {selectedItem?.itemType === "file" && (
              <MenuItem onClick={handleDelete}>Delete</MenuItem>
            )}
            <MenuItem onClick={handleMove}>Move</MenuItem>
            <MenuItem onClick={handleArchive}>Archive</MenuItem>
          </Menu>
        </>
      ),
    },
  ];

  return (
    <Paper sx={{ borderRadius: 2, overflow: "hidden", mb: 2, height: 500 }}>
      <StyledDataGrid
        rows={items}
        columns={columns}
        disableColumnFilter
        disableColumnSelector
        disableColumnMenu
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
      />
    </Paper>
  );
};
