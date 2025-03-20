"use client";

import { Breadcrumbs, Button, Link, Stack, Typography } from "@mui/material";
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
            variant="body1"
            onClick={onBackToRoot}
            underline="hover"
            color="inherit"
            sx={{ cursor: "pointer" }}
          >
            Root
          </Link>
          {folderPath.map((folder, index) => (
            <Link
              key={folder.id}
              component="button"
              variant="body1"
              onClick={() => onFolderClick(folder.id)}
              underline="hover"
              color={index === folderPath.length - 1 ? "text.primary" : "inherit"}
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
