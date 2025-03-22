/**
 * API service for interacting with the backend
 */

// Base URL for API requests
const API_BASE_URL = "http://localhost:4001/api";

// Types
export interface ApiResponse<T> {
  data: T;
  error?: string;
}

export interface PaginationParams {
  page?: number;
  limit?: number;
  sortField?: string;
  sortOrder?: "ASC" | "DESC";
  search?: string;
}

export interface Pagination {
  page: number;
  limit: number;
  totalItems: number;
  totalPages: number;
}

export interface User {
  id: number;
  name: string;
}

export interface Item {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
  parentId: number | null;
  folderId: number | null;
  mimeType: string | null;
  size: number | null;
  itemType: "folder" | "file";
  user: User;
}

export interface FolderContentsResponse {
  items: Item[];
  pagination: Pagination;
}

/**
 * Fetch folder contents from the API
 * @param folderId - Optional folder ID. If not provided, returns root level items
 * @param params - Pagination, sorting, and search parameters
 */
export const getFolderContents = async (
  folderId?: string | number,
  params: PaginationParams = {},
): Promise<ApiResponse<FolderContentsResponse>> => {
  try {
    // Build query string from params
    const queryParams = new URLSearchParams();
    if (params.page) queryParams.append("page", params.page.toString());
    if (params.limit) queryParams.append("limit", params.limit.toString());
    if (params.sortField) queryParams.append("sortField", params.sortField);
    if (params.sortOrder) queryParams.append("sortOrder", params.sortOrder);
    if (params.search) queryParams.append("search", params.search);

    // Build URL
    const url = `${API_BASE_URL}/folders${folderId ? `/${folderId}` : ""}?${queryParams.toString()}`;

    // Fetch data
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      return {
        data: {} as FolderContentsResponse,
        error: errorData.error || "Failed to fetch folder contents",
      };
    }

    const data = await response.json();
    return { data };
  } catch (error) {
    console.error("Error fetching folder contents:", error);
    return {
      data: {} as FolderContentsResponse,
      error:
        error instanceof Error ? error.message : "An unknown error occurred",
    };
  }
};

/**
 * Format file size for display
 * @param bytes - File size in bytes
 */
/**
 * Get the path to a folder (including the folder itself)
 * @param folderId - Folder ID to get path for
 */
export const getFolderPath = async (
  folderId: string | number,
): Promise<ApiResponse<Item[]>> => {
  try {
    const url = `${API_BASE_URL}/folders/${folderId}/path`;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      return {
        data: [],
        error: errorData.error || "Failed to fetch folder path",
      };
    }

    const data = await response.json();
    return { data };
  } catch (error) {
    console.error("Error fetching folder path:", error);
    return {
      data: [],
      error:
        error instanceof Error ? error.message : "An unknown error occurred",
    };
  }
};

/**
 * Create a new folder
 * @param name - Folder name
 * @param folderId - Optional folder folder ID
 */
export const createFolder = async (
  name: string,
  folderId?: number,
): Promise<ApiResponse<Item>> => {
  try {
    const response = await fetch(`${API_BASE_URL}/folders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        parentId: folderId ? Number(folderId) : undefined,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      return {
        data: {} as Item,
        error: errorData.error || "Failed to create folder",
      };
    }

    const data = await response.json();
    return { data };
  } catch (error) {
    console.error("Error creating folder:", error);
    return {
      data: {} as Item,
      error:
        error instanceof Error ? error.message : "An unknown error occurred",
    };
  }
};

/**
 * Create file records in the database
 * @param files - Array of files to create records for
 * @param folderId - Optional parent folder ID
 */
export interface UploadResult {
  success: Item[];
  errors: { name: string; error: string }[];
}

export const uploadFiles = async (
  files: File[],
  folderId?: number,
): Promise<ApiResponse<UploadResult>> => {
  try {
    const fileRecords = files.map((file) => ({
      name: file.name,
      mimeType: file.type || "application/octet-stream",
      size: file.size,
      folderId: folderId || null,
    }));

    const response = await fetch(`${API_BASE_URL}/files`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ files: fileRecords }),
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        data: { success: [], errors: data.errors || [] },
        error: data.error || "Failed to create files",
      };
    }

    return {
      data: {
        success: data.success || [],
        errors: data.errors || [],
      },
    };
  } catch (error) {
    console.error("Error uploading files:", error);
    return {
      data: { success: [], errors: [] },
      error:
        error instanceof Error ? error.message : "An unknown error occurred",
    };
  }
};

/**
 * Delete a file by ID
 * @param fileId - ID of the file to delete
 */
export const deleteFile = async (
  fileId: number,
): Promise<ApiResponse<void>> => {
  try {
    const response = await fetch(`${API_BASE_URL}/files/${fileId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.status === 404) {
      return {
        data: undefined,
        error: "File not found",
      };
    }

    if (!response.ok) {
      const errorData = await response.json();
      return {
        data: undefined,
        error: errorData.error || "Failed to delete file",
      };
    }

    return { data: undefined };
  } catch (error) {
    console.error("Error deleting file:", error);
    return {
      data: undefined,
      error:
        error instanceof Error ? error.message : "An unknown error occurred",
    };
  }
};

export const formatFileSize = (bytes: number | null): string => {
  if (bytes === null) return "-";

  if (bytes === 0) return "0 Bytes";

  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
};
