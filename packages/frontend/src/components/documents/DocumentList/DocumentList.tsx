"use client";

import { useState, useEffect } from "react";
import {
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Stack,
} from "@mui/material";
import { CreateFolderDialog } from "./components/CreateFolderDialog";
import { UploadFilesDialog } from "./components/UploadFilesDialog";
import { GridSortModel } from "@mui/x-data-grid";
import { Item, PaginationParams } from "@/services/api";
import { PageHeader } from "./components/PageHeader";
import { ActionButtons } from "./components/ActionButtons";
import { SearchBar } from "./components/SearchBar";
import { BreadCrumb } from "./components/BreadCrumb";
import { DocumentTable } from "./components/DocumentTable";
import { ErrorSnackbar } from "./components/ErrorSnackbar";
import { PaginationState, SortingState } from "./types";
import {
  useGetFolderContents,
  useGetFolderPath,
  useDeleteFile,
} from "@/hooks/useDocuments";

interface DocumentListProps {
  folderId?: string;
}

export const DocumentList = ({ folderId }: DocumentListProps) => {
  // Local state
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

  // Query params
  const params: PaginationParams = {
    page: pagination.page,
    limit: pagination.limit,
    sortField: sorting.field,
    sortOrder: sorting.order,
    search: searchTerm || undefined,
  };

  // React Query hooks
  const {
    data: folderContents,
    isLoading,
    error: queryError,
  } = useGetFolderContents(currentFolderId, params);

  const { data: folderPath = [] } = useGetFolderPath(
    currentFolderId ? currentFolderId : "0",
  );

  // Update pagination when data changes
  useEffect(() => {
    if (folderContents?.pagination) {
      setPagination(folderContents.pagination);
    }
  }, [folderContents?.pagination]);

  // Reset pagination when folder changes
  useEffect(() => {
    setPagination((prev: PaginationState) => ({ ...prev, page: 1 }));
  }, [currentFolderId]);

  const { mutate: deleteFileMutation } = useDeleteFile();

  // Update current folder when prop changes
  useEffect(() => {
    setCurrentFolderId(folderId);
  }, [folderId]);

  // Event handlers
  const handleBackToRoot = () => {
    setCurrentFolderId(undefined);
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
    setIsUploadDialogOpen(false);
  };

  const handleAddFolder = () => {
    setIsCreateDialogOpen(true);
  };

  const handleCreateSuccess = () => {
    setIsCreateDialogOpen(false);
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
    // Always set sorting state to trigger API call
    setSorting({
      field: sortModel.length > 0 ? sortModel[0].field : "name",
      order: sortModel.length > 0 && sortModel[0].sort === "asc" ? "ASC" : "DESC",
    });
  };

  const handleSelectionChange = (selectionModel: number[]) => {
    setSelectedItems(selectionModel);
  };

  const handleRowClick = (item: Item) => {
    if (item.itemType === "folder") {
      setSelectedItems([]);
      setCurrentFolderId(item.id.toString());
    }
  };

  const handleDeleteItem = (item: Item) => {
    if (item.itemType === "folder") {
      setNotImplementedDialog({ open: true, action: "Delete folder" });
      return;
    }
    setDeleteDialog({ open: true, item });
  };

  const handleConfirmDelete = () => {
    if (!deleteDialog.item) return;

    deleteFileMutation(
      { fileId: deleteDialog.item.id, folderId: currentFolderId },
      {
        onSuccess: () => {
          setDeleteDialog({ open: false, item: null });
        },
        onError: (error: unknown) => {
          console.error("Error deleting file:", error);
        },
      },
    );
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
      <ErrorSnackbar
        error={queryError?.message || null}
        onClose={() => {
          /* Error handling managed by React Query */
        }}
      />

      <PageHeader>
        <ActionButtons
          onUploadFiles={handleUploadFiles}
          onAddFolder={handleAddFolder}
        />
      </PageHeader>

      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={2}
        alignItems={{ xs: null, sm: "center" }}
        mb={3}
      >
        <SearchBar value={searchTerm} onChange={handleSearch} />
        <BreadCrumb
          folderPath={folderPath}
          onBackToRoot={handleBackToRoot}
          onFolderClick={handleFolderClick}
        />
      </Stack>

      <CreateFolderDialog
        open={isCreateDialogOpen}
        onClose={() => setIsCreateDialogOpen(false)}
        onSuccess={handleCreateSuccess}
        parentId={currentFolderId ? parseInt(currentFolderId) : undefined}
      />

      <UploadFilesDialog
        open={isUploadDialogOpen}
        onClose={() => setIsUploadDialogOpen(false)}
        onSuccess={handleUploadSuccess}
        parentId={currentFolderId ? parseInt(currentFolderId) : undefined}
      />

      <DocumentTable
        items={folderContents?.items || []}
        loading={isLoading}
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

      <Dialog open={deleteDialog.open} onClose={handleCancelDelete}>
        <DialogTitle>Delete File</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete "{deleteDialog.item?.name}"? This
            action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelDelete}>Cancel</Button>
          <Button
            onClick={handleConfirmDelete}
            color="error"
            variant="contained"
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};
