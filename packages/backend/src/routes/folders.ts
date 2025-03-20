import { Router, Request, Response } from "express";
import { FolderService, QueryParams } from "../services/folder.service.js";

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
router.get("/:id?", async (req: FolderContentsRequest, res: Response) => {
  try {
    const result = await FolderService.getFolderContents(req.params.id, req.query);
    res.json(result);
  } catch (error) {
    console.error("Error fetching folder contents:", error);
    res.status(500).json({ error: "Failed to fetch folder contents" });
  }
});

export default router;
