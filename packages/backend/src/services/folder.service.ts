import { QueryTypes } from "sequelize";
import { sequelize } from "../models/index.js";

export interface QueryParams {
  search?: string;
  page?: string;
  limit?: string;
  sortField?: string;
  sortOrder?: string;
}

interface QueryResultItem {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
  parentId: number | null;
  folderId: number | null;
  mimeType: string | null;
  size: number | null;
  itemType: "folder" | "file";
  userName: string;
  createdById: number;
  total_count: number;
}

export interface Item {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
  parentId: number | null;
  folderId: number | null;
  mimeType: string | null;
  size: number | null;
  itemType: "folder" | "file";
  user: {
    id: number;
    name: string;
  };
}

export interface PaginatedResponse {
  items: Item[];
  pagination: {
    page: number;
    limit: number;
    totalItems: number;
    totalPages: number;
  };
}

import { Folder } from "../models/Folder.js";
import { User } from "../models/User.js";

export class FolderService {
  /**
   * Create a new folder
   * @param name - The name of the folder
   * @param parentId - Optional parent folder ID
   * @param userId - ID of the user creating the folder
   */
  static async createFolder(
    name: string,
    userId: number,
    parentId?: number
  ): Promise<Item> {
    const folder = await Folder.create({
      name,
      parentId,
      createdById: userId,
    });

    const folderWithUser = await Folder.findByPk(folder.id, {
      include: [
        {
          model: User,
          as: "createdBy",
          attributes: ["id", "name"],
        },
      ],
    });

    if (!folderWithUser) {
      throw new Error("Failed to create folder");
    }

    return {
      id: folderWithUser.id,
      name: folderWithUser.name,
      createdAt: folderWithUser.createdAt.toISOString(),
      updatedAt: folderWithUser.updatedAt.toISOString(),
      parentId: folderWithUser.parentId || null,
      folderId: null,
      mimeType: null,
      size: null,
      itemType: "folder",
      user: {
        id: folderWithUser.createdBy!.id,
        name: folderWithUser.createdBy!.name,
      },
    };
  }

  /**
   * Get the path to a folder (including the folder itself)
   * @param folderId - The folder ID to get path for
   */
  static async getFolderPath(folderId: string): Promise<Item[]> {
    const query = `
      WITH RECURSIVE folder_path AS (
        -- Base case: start with the target folder
        SELECT 
          f.id,
          f.name,
          f.parentId,
          f.createdAt,
          f.updatedAt,
          f.createdById,
          u.name as userName,
          1 as level
        FROM folders f
        LEFT JOIN users u ON f.createdById = u.id
        WHERE f.id = :folderId AND f.deletedAt IS NULL

        UNION ALL

        -- Recursive case: get parent folders
        SELECT 
          f.id,
          f.name,
          f.parentId,
          f.createdAt,
          f.updatedAt,
          f.createdById,
          u.name as userName,
          fp.level + 1
        FROM folders f
        LEFT JOIN users u ON f.createdById = u.id
        INNER JOIN folder_path fp ON f.id = fp.parentId
        WHERE f.deletedAt IS NULL
      )
      SELECT * FROM folder_path
      ORDER BY level DESC
    `;

    const results = await sequelize.query<QueryResultItem>(query, {
      replacements: { folderId },
      type: QueryTypes.SELECT,
    });

    return results.map((item): Item => ({
      id: item.id,
      name: item.name,
      createdAt: item.createdAt,
      updatedAt: item.updatedAt,
      parentId: item.parentId,
      folderId: null,
      mimeType: null,
      size: null,
      itemType: "folder",
      user: {
        id: item.createdById,
        name: item.userName,
      },
    }));
  }

  /**
   * Get files and folders within a specific folder or at root level
   * @param parentId - The folder ID to get contents from. If undefined, returns root level items
   * @param queryParams - Query parameters for search, pagination and sorting
   */
  static async getFolderContents(
    parentId: string | undefined,
    queryParams: QueryParams,
  ): Promise<PaginatedResponse> {
    const {
      search,
      page = "1",
      limit = "10",
      sortField = "name",
      sortOrder = "ASC",
    } = queryParams;

    const offset = (Number(page) - 1) * Number(limit);
    const searchCondition = search ? "AND LOWER(name) LIKE LOWER(:search)" : "";
    const parentCondition = parentId === undefined ? "IS NULL" : "= :parentId";

    // First, get the total count
    const countQuery = `
      WITH combinedResults AS (
        SELECT COUNT(*) as count
        FROM folders f
        WHERE parentId ${parentCondition}
        AND f.deletedAt IS NULL
        ${searchCondition}
        
        UNION ALL
        
        SELECT COUNT(*) as count
        FROM files f
        WHERE folderId ${parentCondition}
        AND f.deletedAt IS NULL
        ${searchCondition}
      )
      SELECT SUM(count) as total_count FROM combinedResults
    `;

    const [countResult] = await sequelize.query(countQuery, {
      replacements: {
        parentId: parentId,
        search: search ? `%${search}%` : undefined,
      },
      type: QueryTypes.SELECT,
    });

    const totalCount = Number((countResult as any).total_count) || 0;

    // Then get the paginated results
    const query = `
      WITH combinedResults AS (
        SELECT 
          f.id,
          f.name,
          f.createdAt,
          f.updatedAt,
          f.parentId,
          NULL as "folderId",
          NULL as "mimeType",
          NULL as size,
          'folder' as itemType,
          u.name as "userName",
          f.createdById
        FROM folders f
        LEFT JOIN users u ON f.createdById = u.id
        WHERE parentId ${parentCondition}
        AND f.deletedAt IS NULL
        ${searchCondition}
        
        UNION ALL
        
        SELECT 
          f.id,
          f.name,
          f.createdAt,
          f.updatedAt,
          NULL as "parentId",
          f.folderId,
          f.mimeType,
          f.size,
          'file' as itemType,
          u.name as "userName",
          f.createdById
        FROM files f
        LEFT JOIN users u ON f.createdById = u.id
        WHERE folderId ${parentCondition}
        AND f.deletedAt IS NULL
        ${searchCondition}
      )
      SELECT *
      FROM combinedResults
      ORDER BY
        CASE WHEN itemType = 'folder' THEN 0 ELSE 1 END,
        ${sortField} ${sortOrder}
      LIMIT :limit
      OFFSET :offset
    `;

    const results = await sequelize.query<QueryResultItem>(query, {
      replacements: {
        parentId: parentId,
        search: search ? `%${search}%` : undefined,
        limit: Number(limit),
        offset: offset,
      },
      type: QueryTypes.SELECT,
    });

    const totalPages = Math.ceil(totalCount / Number(limit));

    const items = results.map(
      (item: QueryResultItem): Item => ({
        id: item.id,
        name: item.name,
        createdAt: item.createdAt,
        updatedAt: item.updatedAt,
        parentId: item.parentId,
        folderId: item.folderId,
        mimeType: item.mimeType,
        size: item.size,
        itemType: item.itemType,
        user: {
          id: item.createdById,
          name: item.userName,
        },
      }),
    );

    return {
      items,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        totalItems: totalCount,
        totalPages,
      },
    };
  }
}
