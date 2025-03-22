"use client";

import { Breadcrumbs, Link } from "@mui/material";
import { Home as HomeIcon } from "@mui/icons-material";
import { BreadCrumbProps } from "../types";

export const BreadCrumb = ({
  folderPath,
  onBackToRoot,
  onFolderClick,
}: BreadCrumbProps) => {
  return (
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
      {folderPath?.map((folder, index) => (
        <Link
          key={folder.id}
          component="button"
          variant="body2"
          onClick={() => onFolderClick(folder.id)}
          underline="hover"
          color={index === folderPath.length - 1 ? "text.primary" : "inherit"}
          sx={{ cursor: "pointer" }}
        >
          {folder.name}
        </Link>
      ))}
    </Breadcrumbs>
  );
};
