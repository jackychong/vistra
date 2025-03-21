import express, { Request, Response } from "express";
import { FileService } from "../services/file.service.js";

const router = express.Router();

/**
 * Create file records
 */
router.post("/", async (req: Request, res: Response) => {
  try {
    const { files } = req.body;

    if (!Array.isArray(files)) {
      return res.status(400).json({
        error: "Files must be an array",
      });
    }

    // Validate required fields
    for (const file of files) {
      if (!file.name || !file.mimeType || typeof file.size !== "number") {
        return res.status(400).json({
          error: "Each file must have name, mimeType, and size",
        });
      }
    }

    // Add userId to each file record
    const filesWithUser = files.map(file => ({
      ...file,
      userId: 1, // TODO: Get from auth
    }));

    const createdFiles = await FileService.createFiles(filesWithUser);

    res.json(createdFiles);
  } catch (error) {
    console.error("Error creating files:", error);
    res.status(500).json({
      error: "Failed to create files",
    });
  }
});

/**
 * Get file by ID
 */
router.get("/:id", async (req: Request, res: Response) => {
  try {
    const file = await FileService.getFileById(parseInt(req.params.id));

    if (!file) {
      return res.status(404).json({
        error: "File not found",
      });
    }

    res.json(file);
  } catch (error) {
    console.error("Error getting file:", error);
    res.status(500).json({
      error: "Failed to get file",
    });
  }
});

/**
 * Delete file by ID
 */
router.delete("/:id", async (req: Request, res: Response) => {
  try {
    await FileService.deleteFile(parseInt(req.params.id));
    res.status(204).send();
  } catch (error) {
    console.error("Error deleting file:", error);
    res.status(500).json({
      error: "Failed to delete file",
    });
  }
});

export default router;
