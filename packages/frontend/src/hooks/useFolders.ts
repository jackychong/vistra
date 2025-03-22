import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getFolderContents,
  getFolderPath,
  createFolder,
  PaginationParams,
  Item,
  FolderContentsResponse,
  ApiResponse,
} from "@/services/api";

// Query keys
export const folderKeys = {
  all: ["folders"] as const,
  list: () => [...folderKeys.all, "list"] as const,
  folder: (id?: string | number) => [...folderKeys.list(), id] as const,
  folderPath: (id: string | number) =>
    [...folderKeys.folder(id), "path"] as const,
};

// Queries
export const useGetFolderContents = (
  folderId?: string | number,
  params: PaginationParams = {},
) => {
  return useQuery({
    queryKey: [...folderKeys.folder(folderId), params],
    queryFn: () => getFolderContents(folderId, params),
    select: (response: ApiResponse<FolderContentsResponse>) => response.data,
    keepPreviousData: true, // Keep previous data while loading new data
    staleTime: 1000 * 30, // Consider data fresh for 30 seconds
  });
};

export const useGetFolderPath = (folderId: string | number) => {
  return useQuery({
    queryKey: folderKeys.folderPath(folderId),
    queryFn: () => getFolderPath(folderId),
    select: (response: ApiResponse<Item[]>) => response.data,
    enabled: !!folderId,
  });
};

// Mutations
export const useCreateFolder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      name,
      parentId,
    }: {
      name: string;
      parentId?: number;
    }) => {
      const response = await createFolder(name, parentId);
      if (response.error) {
        throw { response: { data: { error: response.error } } };
      }
      return response.data;
    },
    onSuccess: (
      _data: unknown,
      { parentId }: { name: string; parentId?: number },
    ) => {
      // Invalidate both current folder and parent folder queries
      queryClient.invalidateQueries({
        queryKey: folderKeys.list(),
        refetchType: "all",
      });
    },
  });
};
