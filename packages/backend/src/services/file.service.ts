import { File } from "../models/File.js";
import { User } from "../models/User.js";

interface CreateFileParams {
  name: string;
  mimeType: string;
  size: number;
  folderId?: number | null;
  userId?: number;
}

interface FileValidationResult {
  success: File[];
  errors: Array<{ name: string; error: string }>;
}

export class FileService {
  /**
   * Validate file records before creation
   */
  static validateFiles(files: any[]): {
    validFiles: CreateFileParams[];
    errors: Array<{ name: string; error: string }>;
  } {
    const errors: Array<{ name: string; error: string }> = [];
    const validFiles = files.filter((file) => {
      if (!file.name || !file.mimeType || typeof file.size !== "number") {
        errors.push({
          name: file.name || "Unknown file",
          error: "Each file must have name, mimeType, and size",
        });
        return false;
      }
      return true;
    });

    return { validFiles, errors };
  }

  /**
   * Create multiple file records
   */
  static async createFiles(files: any[]): Promise<FileValidationResult> {
    // First validate all files
    const { validFiles, errors } = this.validateFiles(files);

    if (validFiles.length === 0) {
      return { success: [], errors };
    }

    const results: FileValidationResult = {
      success: [],
      errors: [...errors], // Include validation errors
    };

    // Process each valid file
    for (const file of validFiles) {
      try {
        // Create single file
        const createdFile = await (File as any).create({
          name: file.name,
          mimeType: file.mimeType,
          size: file.size,
          folderId: file.folderId || null,
          createdById: file.userId || 1, // Default to 1 if not provided
        });

        // Fetch file with user data
        const fileWithUser = await (File as any).findOne({
          where: { id: createdFile.id },
          include: [
            {
              model: User,
              as: "user",
              attributes: ["id", "name"],
            },
          ],
        });

        if (fileWithUser) {
          results.success.push(fileWithUser);
        }
      } catch (error: any) {
        console.error(`Error creating file ${file.name}:`, error);
        const errorMessage =
          error.name === "SequelizeValidationError" ||
          error.name === "SequelizeUniqueConstraintError"
            ? error.errors[0].message
            : "Failed to create file";

        results.errors.push({
          name: file.name,
          error: errorMessage,
        });
      }
    }

    return results;
  }

  /**
   * Get file by ID
   */
  static async getFileById(id: number): Promise<File | null> {
    try {
      const file = await (File as any).findOne({
        where: { id },
        include: [
          {
            model: User,
            as: "user",
            attributes: ["id", "name"],
          },
        ],
      });

      return file;
    } catch (error) {
      console.error("Error getting file:", error);
      throw new Error("Failed to get file");
    }
  }

  /**
   * Delete file by ID
   */
  static async deleteFile(id: number): Promise<void> {
    try {
      const file = await (File as any).findOne({ where: { id } });
      if (!file) {
        throw new Error("File not found");
      }
      await file.destroy();
    } catch (error) {
      console.error("Error deleting file:", error);
      throw new Error("Failed to delete file");
    }
  }

  /**
   * Update file name
   */
  static async updateFileName(id: number, name: string): Promise<File> {
    try {
      const file = await (File as any).findOne({
        where: { id },
        include: [
          {
            model: User,
            as: "user",
            attributes: ["id", "name"],
          },
        ],
      });

      if (!file) {
        throw new Error("File not found");
      }

      await file.update({ name });
      return file;
    } catch (error) {
      console.error("Error updating file name:", error);
      throw new Error("Failed to update file name");
    }
  }
}
