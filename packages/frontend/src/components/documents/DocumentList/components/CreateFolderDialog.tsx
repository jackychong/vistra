"use client";

import { useState, ChangeEvent, KeyboardEvent } from "react";
import { Button } from "@mui/material";
import { Dialog, DialogProps } from "@/components/core/Dialog";
import { TextField } from "@/components/core/TextField";
import { useCreateFolder } from "@/hooks/useDocuments";

interface CreateFolderDialogProps
  extends Omit<DialogProps, "onClose" | "title" | "actions"> {
  open: boolean;
  onClose: () => void;
  parentId?: number;
  onSuccess: () => void;
}

export const CreateFolderDialog = ({
  open,
  onClose,
  parentId,
  onSuccess,
}: CreateFolderDialogProps) => {
  const [folderName, setFolderName] = useState("");
  const [error, setError] = useState("");

  const { mutate: createFolder, isPending } = useCreateFolder();

  const handleSubmit = () => {
    // Validate empty folder name
    if (!folderName.trim()) {
      setError("Folder name is required");
      return;
    }

    setError("");

    createFolder(
      { name: folderName.trim(), parentId },
      {
        onSuccess: () => {
          setFolderName("");
          onSuccess();
          onClose();
        },
        onError: (error: any) => {
          // Handle API error response
          if (error.response?.data?.error) {
            setError(error.response.data.error);
          } else if (error instanceof Error) {
            setError(error.message);
          } else {
            setError("Failed to create folder");
          }
        },
      },
    );
  };

  const handleClose = () => {
    setFolderName("");
    setError("");
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="xs"
      fullWidth
      title="Create New Folder"
      actions={
        <>
          <Button onClick={handleClose}>Cancel</Button>
          <Button
            onClick={handleSubmit}
            variant="contained"
            disabled={isPending}
          >
            Save
          </Button>
        </>
      }
    >
      <TextField
        autoFocus
        fullWidth
        label="Folder Name"
        value={folderName}
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          setFolderName(e.target.value);
          if (error) setError("");
        }}
        error={!!error}
        helperText={error}
        disabled={isPending}
        onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => {
          if (e.key === "Enter" && !isPending) {
            handleSubmit();
          }
        }}
      />
    </Dialog>
  );
};
