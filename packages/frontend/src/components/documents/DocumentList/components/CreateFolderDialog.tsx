"use client";

import { useState, ChangeEvent, KeyboardEvent } from "react";
import { Button } from "@mui/material";
import { Dialog, DialogProps } from "@/components/core/Dialog";
import { TextField } from "@/components/core/TextField";
import { createFolder } from "@/services/api";

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
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    // Validate empty folder name
    if (!folderName.trim()) {
      setError("Folder name is required");
      return;
    }

    setIsSubmitting(true);
    setError("");

    try {
      const response = await createFolder(folderName.trim(), parentId);

      if (response.error) {
        setError(response.error);
      } else {
        setFolderName("");
        onSuccess();
        onClose();
      }
    } catch (err) {
      setError("Failed to create folder");
    } finally {
      setIsSubmitting(false);
    }
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
            disabled={isSubmitting}
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
        disabled={isSubmitting}
        onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => {
          if (e.key === "Enter" && !isSubmitting) {
            handleSubmit();
          }
        }}
      />
    </Dialog>
  );
};
