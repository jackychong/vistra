"use client";

import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  Typography,
  Box,
} from "@mui/material";
import { Folder as FolderIcon } from "@mui/icons-material";
import { mockFolders } from "@/mocks/folders";

interface FolderListProps {
  selectedFolder?: string;
  onFolderSelect?: (folderId: string) => void;
}

export const FolderList = ({
  selectedFolder,
  onFolderSelect,
}: FolderListProps) => {
  return (
    <Box sx={{ minWidth: 250 }}>
      <Paper sx={{ p: 2, mb: 2 }}>
        <Typography variant="h6" component="h2">
          Folders
        </Typography>
      </Paper>
      <List component="nav">
        {mockFolders.map((folder) => (
          <ListItem key={folder.id} disablePadding>
            <ListItemButton
              selected={folder.id === selectedFolder}
              onClick={() => onFolderSelect?.(folder.id)}
            >
              <ListItemIcon>
                <FolderIcon />
              </ListItemIcon>
              <ListItemText primary={folder.name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};
