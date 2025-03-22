import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  uploadFiles,
  deleteFile,
  UploadResult,
  ApiResponse,
} from "@/services/api";
import { folderKeys } from "./useFolders";

// Query keys
export const fileKeys = {
  all: ["files"] as const,
  list: () => [...fileKeys.all, "list"] as const,
  file: (id: number) => [...fileKeys.list(), id] as const,
};

// Mutations
export const useUploadFiles = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      files,
      folderId,
    }: {
      files: File[];
      folderId?: number;
    }) => {
      const result = await uploadFiles(files, folderId);
      return { result, folderId };
    },
    onSuccess: ({
      result,
      folderId,
    }: {
      result: ApiResponse<UploadResult>;
      folderId?: number;
    }) => {
      // Invalidate folder contents query for the current folder
      queryClient.invalidateQueries({
        queryKey: folderKeys.folder(folderId),
      });

      // If files were successfully uploaded, also invalidate parent folder queries
      if (result.data.success.length > 0) {
        queryClient.invalidateQueries({
          queryKey: folderKeys.list(),
          refetchType: "all",
        });
      }
    },
  });
};

export const useDeleteFile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      fileId,
      folderId,
    }: {
      fileId: number;
      folderId?: string;
    }) => {
      const result = await deleteFile(fileId);
      return { result, folderId };
    },
    onSuccess: ({ folderId }: { result?: unknown; folderId?: string }) => {
      // Invalidate folder contents query
      queryClient.invalidateQueries({
        queryKey: folderKeys.folder(folderId),
      });
    },
  });
};
