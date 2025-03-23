"use client";

import { useState, DragEvent, ChangeEvent } from "react";
import {
  Box,
  Button,
  Typography,
  styled,
  Theme,
  CircularProgress,
  Alert,
} from "@mui/material";
import { Dialog } from "@/components/core/Dialog";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { formatFileSize } from "@/services/api";
import { useUploadFiles } from "@/hooks/useDocuments";

interface UploadFilesDialogProps {
  open: boolean;
  onClose: () => void;
  parentId?: number;
  onSuccess: () => void;
}

interface UploadResult {
  result: {
    data: {
      success: Array<unknown>;
      errors: Array<{ name: string; error: string }>;
    };
  };
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
  parentId,
  onSuccess,
}: UploadFilesDialogProps) => {
  const [files, setFiles] = useState<Array<File>>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [errors, setErrors] = useState<Array<{ name: string; error: string }>>(
    [],
  );
  const [successCount, setSuccessCount] = useState(0);

  const { mutate: uploadFilesMutation, isPending: isUploading } =
    useUploadFiles();

  const handleDragEnter = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const droppedFiles = Array.from(e.dataTransfer.files);
    setFiles((prevFiles: File[]) => [...prevFiles, ...droppedFiles]);
  };

  const handleFileSelect = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files);
      setFiles((prevFiles: File[]) => [...prevFiles, ...selectedFiles]);
    }
  };

  const handleClick = () => {
    const fileInput = document.getElementById("file-upload-input");
    if (fileInput) {
      fileInput.click();
    }
  };

  const handleUpload = () => {
    if (files.length === 0) return;

    setErrors([]);
    setSuccessCount(0);

    uploadFilesMutation(
      { files, folderId: parentId },
      {
        onSuccess: ({ result }: UploadResult) => {
          setSuccessCount(result.data.success.length);
          setErrors(result.data.errors);

          // Call onSuccess when all files were uploaded successfully
          if (result.data.success.length === files.length) {
            onSuccess();
          }

          // Only close if all files were uploaded successfully
          if (result.data.errors.length === 0) {
            handleClose();
          }
        },
        onError: (error: unknown) => {
          setErrors([
            {
              name: "Upload",
              error:
                error instanceof Error
                  ? error.message
                  : "Failed to upload files",
            },
          ]);
        },
      },
    );
  };

  const handleClose = () => {
    setFiles([]);
    setErrors([]);
    setSuccessCount(0);
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
              startIcon={
                isUploading ? <CircularProgress size={20} /> : undefined
              }
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

      {successCount > 0 && (
        <Alert severity="success" sx={{ mt: 2 }}>
          Successfully uploaded {successCount} file
          {successCount === 1 ? "" : "s"}
        </Alert>
      )}

      {errors.map((error: { name: string; error: string }, index: number) => (
        <Alert key={index} severity="error" sx={{ mt: 2 }}>
          {error.name === "Upload"
            ? error.error
            : `${error.name}: ${error.error}`}
        </Alert>
      ))}

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
                  {file.type || "Unknown type"} • Last modified:{" "}
                  {new Date(file.lastModified).toLocaleDateString()}
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
