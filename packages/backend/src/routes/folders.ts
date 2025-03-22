import { Router, Request, Response } from "express";
import { FolderService, QueryParams } from "../services/folder.service.js";

interface CreateFolderRequest extends Request {
  body: {
    name: string;
    parentId?: number;
  };
}

interface FolderContentsRequest extends Request {
  params: {
    id?: string;
  };
  query: QueryParams;
}

const router = Router();

/**
 * GET /api/folders/:id/path
 * Get the path to a folder (including the folder itself)
 */
router.get("/:id/path", async (req: Request, res: Response) => {
  try {
    const result = await FolderService.getFolderPath(req.params.id);
    res.json(result);
  } catch (error) {
    console.error("Error fetching folder path:", error);
    if (error instanceof Error) {
      if (error.message === "Folder ID is required" || error.message === "Invalid folder ID") {
        return res.status(400).json({ error: error.message });
      }
    }
    res.status(500).json({ error: "Failed to fetch folder path" });
  }
});

/**
 * POST /api/folders
 * Create a new folder
 * @body {name: string, parentId?: number}
 * @returns {201} Created folder
 * @returns {400} Validation error
 * @returns {500} Server error
 */
router.post("/", async (req: CreateFolderRequest, res: Response) => {
  try {
    const { name, parentId } = req.body;
    const userId = 1; // TODO: Get from auth middleware

    const folder = await FolderService.createFolder(name, userId, parentId);
    res.status(201).json(folder);
  } catch (error) {
    console.error("Error creating folder:", error);
    if (error instanceof Error) {
      if (
        error.message === "Folder name is required" ||
        error.message.includes("Validation error") ||
        error.message.includes("already exists") ||
        error.message.includes("cannot be empty") ||
        error.message.includes("Invalid folder name")
      ) {
        return res.status(400).json({ error: error.message });
      }
    }
    res.status(500).json({ error: "Failed to create folder" });
  }
});

/**
 * GET /api/folders/:id?
 * Get all files and folders in a specific folder with pagination and sorting
 * If no id is provided, returns root level items (items without parent)
 * @query {number} page - Page number
 * @query {number} limit - Items per page
 * @query {string} sortField - Field to sort by
 * @query {string} sortOrder - Sort direction (ASC/DESC)
 * @query {string} search - Search term
 * @returns {200} Folder contents with pagination
 * @returns {500} Server error
 */
router.get("/:id?", async (req: FolderContentsRequest, res: Response) => {
  try {
    const result = await FolderService.getFolderContents(
      req.params.id,
      req.query,
    );
    res.json(result);
  } catch (error) {
    console.error("Error fetching folder contents:", error);
    res.status(500).json({ error: "Failed to fetch folder contents" });
  }
});

export default router;
