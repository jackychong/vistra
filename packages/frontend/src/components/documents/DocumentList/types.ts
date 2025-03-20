import { GridSortModel } from "@mui/x-data-grid";
import { Item } from "@/services/api";

export interface PaginationState {
  page: number;
  limit: number;
  totalItems: number;
  totalPages: number;
}

export interface SortingState {
  field: string;
  order: "ASC" | "DESC";
}

// Component Props
export interface PageHeaderProps {
  currentFolderId?: string;
  folderPath: Item[];
  onBackToRoot: () => void;
  onFolderClick: (folderId: number) => void;
  children?: React.ReactNode;
}

export interface ActionButtonsProps {
  onUploadFiles: () => void;
  onAddFolder: () => void;
}

export interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export interface DocumentTableProps {
  items: Item[];
  loading: boolean;
  pagination: PaginationState;
  sorting: SortingState;
  selectedItems: number[];
  onPaginationChange: (model: { page: number; pageSize: number }) => void;
  onSortChange: (model: GridSortModel) => void;
  onSelectionChange: (selection: number[]) => void;
  onRowClick: (item: Item) => void;
}

export interface ErrorSnackbarProps {
  error: string | null;
  onClose: () => void;
}
