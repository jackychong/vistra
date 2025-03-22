"use client";

import { useEffect, useState, useCallback } from "react";
import { Box, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button, Alert } from "@mui/material";
import { CreateFolderDialog } from "./components/CreateFolderDialog";
import { UploadFilesDialog } from "./components/UploadFilesDialog";
import { GridSortModel } from "@mui/x-data-grid";
import {
  getFolderContents,
  getFolderPath,
  deleteFile,
  Item,
  PaginationParams,
} from "@/services/api";
import { PageHeader } from "./components/PageHeader";
import { ActionButtons } from "./components/ActionButtons";
import { SearchBar } from "./components/SearchBar";
import { DocumentTable } from "./components/DocumentTable";
import { ErrorSnackbar } from "./components/ErrorSnackbar";
import { PaginationState, SortingState } from "./types";

interface DocumentListProps {
  folderId?: string;
}

export const DocumentList = ({ folderId }: DocumentListProps) => {
  // State
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [pagination, setPagination] = useState<PaginationState>({
    page: 1,
    limit: 10,
    totalItems: 0,
    totalPages: 0,
  });
  const [sorting, setSorting] = useState<SortingState>({
    field: "name",
    order: "ASC",
  });
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [currentFolderId, setCurrentFolderId] = useState<string | undefined>(
    folderId,
  );
  const [folderPath, setFolderPath] = useState<Item[]>([]);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false);
  const [notImplementedDialog, setNotImplementedDialog] = useState({
    open: false,
    action: "",
  });
  const [deleteDialog, setDeleteDialog] = useState<{
    open: boolean;
    item: Item | null;
  }>({
    open: false,
    item: null,
  });

  // Fetch folder path when current folder changes
  useEffect(() => {
    const fetchFolderPath = async () => {
      if (!currentFolderId) {
        setFolderPath([]);
        return;
      }

      const response = await getFolderPath(currentFolderId);
      if (!response.error) {
        setFolderPath(response.data);
      }
    };

    fetchFolderPath();
  }, [currentFolderId]);

  // Fetch data
  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);

    const params: PaginationParams = {
      page: pagination.page,
      limit: pagination.limit,
      sortField: sorting.field,
      sortOrder: sorting.order,
      search: searchTerm || undefined,
    };

    try {
      const response = await getFolderContents(currentFolderId, params);

      if (response.error) {
        setError(response.error);
      } else {
        setItems(response.data.items || []);
        setPagination(
          response.data.pagination || {
            page: 1,
            limit: 10,
            totalItems: 0,
            totalPages: 0,
          },
        );
      }
    } catch (err) {
      setError("Failed to fetch data. Please try again.");
      console.error("Error fetching data:", err);
    } finally {
      setLoading(false);
    }
  }, [currentFolderId, pagination.page, pagination.limit, sorting, searchTerm]);

  // Initial data fetch
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Update current folder when prop changes
  useEffect(() => {
    setCurrentFolderId(folderId);
  }, [folderId]);

  // Event handlers
  const handleBackToRoot = () => {
    setCurrentFolderId(undefined);
    setFolderPath([]);
    setPagination((prev: PaginationState) => ({ ...prev, page: 1 }));
    setSelectedItems([]);
  };

  const handleFolderClick = (folderId: number) => {
    setCurrentFolderId(folderId.toString());
    setPagination((prev: PaginationState) => ({ ...prev, page: 1 }));
    setSelectedItems([]);
  };

  const handleUploadFiles = () => {
    setIsUploadDialogOpen(true);
  };

  const handleUploadSuccess = () => {
    fetchData();
  };

  const handleAddFolder = () => {
    setIsCreateDialogOpen(true);
  };

  const handleCreateSuccess = () => {
    fetchData();
  };

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    setPagination((prev: PaginationState) => ({ ...prev, page: 1 }));
  };

  const handlePaginationChange = (model: {
    page: number;
    pageSize: number;
  }) => {
    setPagination((prev: PaginationState) => ({
      ...prev,
      page: model.page + 1, // DataGrid uses 0-based indexing
      limit: model.pageSize,
    }));
  };

  const handleSortChange = (sortModel: GridSortModel) => {
    if (sortModel.length > 0) {
      setSorting({
        field: sortModel[0].field,
        order: sortModel[0].sort === "asc" ? "ASC" : "DESC",
      });
    } else {
      setSorting({
        field: "name",
        order: "ASC",
      });
    }
  };

  const handleSelectionChange = (selectionModel: number[]) => {
    setSelectedItems(selectionModel);
  };

  const handleRowClick = (item: Item) => {
    if (item.itemType === "folder") {
      setCurrentFolderId(item.id.toString());
      setPagination((prev: PaginationState) => ({ ...prev, page: 1 }));
      setSelectedItems([]);
    }
  };

  const handleDeleteItem = (item: Item) => {
    if (item.itemType === "folder") {
      setNotImplementedDialog({ open: true, action: "Delete folder" });
      return;
    }
    setDeleteDialog({ open: true, item });
  };

  const handleConfirmDelete = async () => {
    if (!deleteDialog.item) return;

    const response = await deleteFile(deleteDialog.item.id);
    if (response.error) {
      setError(response.error);
    } else {
      fetchData();
    }
    setDeleteDialog({ open: false, item: null });
  };

  const handleCancelDelete = () => {
    setDeleteDialog({ open: false, item: null });
  };

  const handleMoveItem = () => {
    setNotImplementedDialog({ open: true, action: "Move" });
  };

  const handleArchiveItem = () => {
    setNotImplementedDialog({ open: true, action: "Archive" });
  };

  const handleCloseNotImplemented = () => {
    setNotImplementedDialog({ open: false, action: "" });
  };

  return (
    <Box sx={{ p: 3 }}>
      <ErrorSnackbar error={error} onClose={() => setError(null)} />

      <PageHeader
        currentFolderId={currentFolderId}
        folderPath={folderPath}
        onBackToRoot={handleBackToRoot}
        onFolderClick={handleFolderClick}
      >
        <ActionButtons
          onUploadFiles={handleUploadFiles}
          onAddFolder={handleAddFolder}
        />
      </PageHeader>

      <SearchBar value={searchTerm} onChange={handleSearch} loading={loading} />

      <CreateFolderDialog
        open={isCreateDialogOpen}
        onClose={() => setIsCreateDialogOpen(false)}
        onSuccess={handleCreateSuccess}
        folderId={currentFolderId ? parseInt(currentFolderId) : undefined}
      />

      <UploadFilesDialog
        open={isUploadDialogOpen}
        onClose={() => setIsUploadDialogOpen(false)}
        onSuccess={handleUploadSuccess}
        parentId={currentFolderId ? parseInt(currentFolderId) : undefined}
      />

      <DocumentTable
        items={items}
        loading={loading}
        pagination={pagination}
        sorting={sorting}
        selectedItems={selectedItems}
        onPaginationChange={handlePaginationChange}
        onSortChange={handleSortChange}
        onSelectionChange={handleSelectionChange}
        onRowClick={handleRowClick}
        onDeleteItem={handleDeleteItem}
        onMoveItem={handleMoveItem}
        onArchiveItem={handleArchiveItem}
      />

      <Dialog
        open={notImplementedDialog.open}
        onClose={handleCloseNotImplemented}
      >
        <DialogTitle>{notImplementedDialog.action} Action</DialogTitle>
        <DialogContent>
          <DialogContentText>
            This feature is not implemented yet.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseNotImplemented}>Close</Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={deleteDialog.open}
        onClose={handleCancelDelete}
      >
        <DialogTitle>Delete File</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete "{deleteDialog.item?.name}"? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelDelete}>Cancel</Button>
          <Button onClick={handleConfirmDelete} color="error" variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};
