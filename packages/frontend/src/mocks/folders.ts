export interface Folder {
  id: string;
  name: string;
  parentId: string | null;
  createdAt: string;
  updatedAt: string;
}

export const mockFolders: Folder[] = [
  {
    id: "1",
    name: "Projects",
    parentId: null,
    createdAt: "2025-03-20T10:00:00Z",
    updatedAt: "2025-03-20T10:00:00Z",
  },
  {
    id: "2",
    name: "Reports",
    parentId: "1",
    createdAt: "2025-03-19T15:30:00Z",
    updatedAt: "2025-03-19T16:45:00Z",
  },
  {
    id: "3",
    name: "Meetings",
    parentId: "1",
    createdAt: "2025-03-18T09:15:00Z",
    updatedAt: "2025-03-18T14:20:00Z",
  },
  {
    id: "4",
    name: "Personal",
    parentId: null,
    createdAt: "2025-03-17T11:00:00Z",
    updatedAt: "2025-03-17T11:00:00Z",
  },
];

export const buildFolderTree = (folders: Folder[]) => {
  const folderMap = new Map(
    folders.map((folder) => [folder.id, { ...folder, children: [] }]),
  );
  const tree: (Folder & { children: (Folder & { children: Folder[] })[] })[] =
    [];

  folders.forEach((folder) => {
    const node = folderMap.get(folder.id)!;
    if (folder.parentId === null) {
      tree.push(node);
    } else {
      const parent = folderMap.get(folder.parentId);
      if (parent) {
        parent.children.push(node);
      }
    }
  });

  return tree;
};
