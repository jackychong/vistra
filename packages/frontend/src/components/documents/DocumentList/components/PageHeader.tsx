"use client";

import { Breadcrumbs, Button, Link, Stack, Typography } from "@mui/material";
import { Home as HomeIcon } from "@mui/icons-material";
import { PageHeaderProps } from "../types";

export const PageHeader = ({
  currentFolderId,
  folderPath,
  onBackToRoot,
  onFolderClick,
  children,
}: PageHeaderProps) => {
  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      mb={3}
    >
      <Stack direction="column" spacing={1}>
        <Typography variant="h4" component="h1" sx={{ fontWeight: "normal" }}>
          Documents
        </Typography>
        <Breadcrumbs aria-label="folder navigation">
          <Link
            component="button"
            variant="body2"
            onClick={onBackToRoot}
            underline="hover"
            color="inherit"
            sx={{ cursor: "pointer", display: "flex", alignItems: "center" }}
          >
            <HomeIcon sx={{ fontSize: 24, lineHeight: 0 }} />
          </Link>
          {folderPath.map((folder, index) => (
            <Link
              key={folder.id}
              component="button"
              variant="body2"
              onClick={() => onFolderClick(folder.id)}
              underline="hover"
              color={
                index === folderPath.length - 1 ? "text.primary" : "inherit"
              }
              sx={{ cursor: "pointer" }}
            >
              {folder.name}
            </Link>
          ))}
        </Breadcrumbs>
      </Stack>
      {children}
    </Stack>
  );
};
