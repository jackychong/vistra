import { GridSortModel } from "@mui/x-data-grid";
import { Item } from "@/services/api";
import { PaginationState, SortingState } from "../../types";

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
  onDeleteItem?: (item: Item) => void;
  onMoveItem?: (item: Item) => void;
  onArchiveItem?: (item: Item) => void;
  onNameEdit?: (item: Item, newName: string) => void;
}

export interface CustomFooterProps {
  pagination: {
    page: number;
    limit: number;
    totalItems: number;
    totalPages: number;
  };
  onPaginationChange: (model: { page: number; pageSize: number }) => void;
}
