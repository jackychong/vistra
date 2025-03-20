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
 * GET /api/folders/:id?
 * Get all files and folders in a specific folder with pagination and sorting
 * If no id is provided, returns root level items (items without parent)
 */
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
    res.status(500).json({ error: "Failed to fetch folder path" });
  }
});

/**
 * GET /api/folders/:id?
 * Get all files and folders in a specific folder with pagination and sorting
 * If no id is provided, returns root level items (items without parent)
 */
/**
 * POST /api/folders
 * Create a new folder
 */
router.post("/", async (req: CreateFolderRequest, res: Response) => {
  try {
    const { name, parentId } = req.body;

    if (!name?.trim()) {
      return res.status(400).json({ error: "Folder name is required" });
    }

    // TODO: Get user ID from auth middleware
    const userId = 1; // Using test user for now

    const folder = await FolderService.createFolder(name, userId, parentId);
    res.status(201).json(folder);
  } catch (error) {
    console.error("Error creating folder:", error);
    if (error instanceof Error) {
      // Handle validation errors
      if (error.message.includes("Validation error") || 
          error.message.includes("already exists") ||
          error.message.includes("cannot be empty") ||
          error.message.includes("Invalid folder name")) {
        return res.status(400).json({ error: error.message });
      }
    }
    res.status(500).json({ error: "Failed to create folder" });
  }
});

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
