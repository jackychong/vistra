"use client";

import { useState, DragEvent, ReactNode, ChangeEvent } from "react";
import { Box, Button, Typography, styled, Theme, CircularProgress } from "@mui/material";
import { Dialog, DialogProps } from "@/components/core/Dialog";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { uploadFiles, formatFileSize } from "@/services/api";

interface UploadFilesDialogProps {
  open: boolean;
  onClose: () => void;
  folderId?: number;
  onSuccess: () => void;
}

const DropZone = styled(Box)(({ theme }: { theme: Theme }) => ({
  border: `2px dashed ${theme.palette.divider}`,
  borderRadius: theme.shape.borderRadius,
  padding: theme.spacing(4),
  textAlign: "center",
  backgroundColor: theme.palette.background.default,
  cursor: "pointer",
  transition: "border-color 0.2s ease-in-out",
  "&:hover": {
    borderColor: theme.palette.primary.main,
  },
  minHeight: "200px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  gap: theme.spacing(2),
}));

export const UploadFilesDialog = ({
  open,
  onClose,
  folderId,
  onSuccess,
}: UploadFilesDialogProps) => {
  const [files, setFiles] = useState<Array<File>>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleDragEnter = (e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const droppedFiles = Array.from(e.dataTransfer.files);
    setFiles((prevFiles: Array<File>) => [...prevFiles, ...droppedFiles]);
  };

  const handleFileSelect = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files);
      setFiles((prevFiles: Array<File>) => [...prevFiles, ...selectedFiles]);
    }
  };

  const handleClick = () => {
    const fileInput = document.getElementById("file-upload-input");
    if (fileInput) {
      fileInput.click();
    }
  };

  const handleUpload = async () => {
    if (files.length === 0) return;

    setIsUploading(true);
    setError(null);

    try {
      const response = await uploadFiles(files, folderId);
      
      if (response.error) {
        setError(response.error);
      } else {
        setFiles([]);
        onSuccess();
        onClose();
      }
    } catch (err) {
      setError("Failed to upload files. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleClose = () => {
    setFiles([]);
    setError(null);
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      title="Upload Files"
      actions={
        <>
          <Button onClick={handleClose} disabled={isUploading}>
            Close
          </Button>
          {files.length > 0 && (
            <Button
              onClick={handleUpload}
              variant="contained"
              disabled={isUploading}
              startIcon={isUploading ? <CircularProgress size={20} /> : undefined}
            >
              {isUploading ? "Uploading..." : "Upload"}
            </Button>
          )}
        </>
      }
    >
      <input
        type="file"
        id="file-upload-input"
        multiple
        onChange={handleFileSelect}
        style={{ display: "none" }}
      />
      <DropZone
        onClick={handleClick}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        sx={{
          borderColor: isDragging ? "primary.main" : "divider",
          opacity: isUploading ? 0.7 : 1,
          pointerEvents: isUploading ? "none" : "auto",
        }}
      >
        <CloudUploadIcon sx={{ fontSize: 48, color: "primary.main" }} />
        <Typography variant="h6" color="textPrimary">
          Drag and drop files here
        </Typography>
        <Typography variant="body2" color="textSecondary">
          {files.length > 0
            ? `${files.length} file${files.length === 1 ? "" : "s"} selected`
            : "or click to select files"}
        </Typography>
      </DropZone>
      {error && (
        <Typography color="error" variant="body2" sx={{ mt: 2 }}>
          {error}
        </Typography>
      )}
      {files.length > 0 && (
        <Box sx={{ mt: 2 }}>
          <Typography variant="subtitle2" color="textSecondary" gutterBottom>
            Files to upload:
          </Typography>
          {files.map((file: File, index: number) => (
            <Box
              key={index}
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                py: 0.5,
              }}
            >
              <Box>
                <Typography variant="body2">{file.name}</Typography>
                <Typography variant="caption" color="textSecondary">
                  {file.type || "Unknown type"} • Last modified: {new Date(file.lastModified).toLocaleDateString()}
                </Typography>
              </Box>
              <Typography variant="body2" color="textSecondary">
                {formatFileSize(file.size)}
              </Typography>
            </Box>
          ))}
        </Box>
      )}
    </Dialog>
  );
};
