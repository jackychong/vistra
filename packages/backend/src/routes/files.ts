import express, { Request, Response } from "express";
import { FileService } from "../services/file.service.js";

const router = express.Router();

/**
 * POST /api/files
 * Create file records in bulk
 * @body {Array<{name: string, mimeType: string, size: number, folderId?: number}>} files
 * @returns {200} {success: Array<File>, errors: Array<{name: string, error: string}>}
 * @returns {400} Validation error
 * @returns {500} Server error
 */
router.post("/", async (req: Request, res: Response) => {
  try {
    const { files } = req.body;

    if (!Array.isArray(files)) {
      return res.status(400).json({
        error: "Files must be an array",
      });
    }

    const result = await FileService.createFiles(files);
    res.json(result);
  } catch (error) {
    console.error("Error creating files:", error);
    res.status(500).json({
      error: "Failed to create files",
    });
  }
});

/**
 * GET /api/files/:id
 * Get file by ID
 * @returns {200} File object
 * @returns {404} File not found
 * @returns {500} Server error
 */
router.get("/:id", async (req: Request, res: Response) => {
  try {
    const fileId = parseInt(req.params.id);
    if (isNaN(fileId)) {
      return res.status(400).json({
        error: "Invalid file ID",
      });
    }

    const file = await FileService.getFileById(fileId);
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
 * DELETE /api/files/:id
 * Delete file by ID
 * @returns {204} No content
 * @returns {404} File not found
 * @returns {500} Server error
 */
router.delete("/:id", async (req: Request, res: Response) => {
  try {
    const fileId = parseInt(req.params.id);
    if (isNaN(fileId)) {
      return res.status(400).json({
        error: "Invalid file ID",
      });
    }

    await FileService.deleteFile(fileId);
    res.status(204).send();
  } catch (error) {
    console.error("Error deleting file:", error);
    if (error instanceof Error && error.message.includes("not found")) {
      res.status(404).json({
        error: "File not found",
      });
    } else {
      res.status(500).json({
        error: "Failed to delete file",
      });
    }
  }
});

export default router;
