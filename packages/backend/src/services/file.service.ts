import { File } from "../models/File.js";
import { User } from "../models/User.js";

interface CreateFileParams {
  name: string;
  mimeType: string;
  size: number;
  folderId: number | null;
  createdById: number;
}

export class FileService {
  /**
   * Create multiple file records
   */
  static async createFiles(files: CreateFileParams[]): Promise<{
    success: File[];
    errors: { name: string; error: string }[];
  }> {
    const results = {
      success: [] as File[],
      errors: [] as { name: string; error: string }[]
    };

    // Process each file individually
    for (const file of files) {
      try {
        const [createdFile] = await File.bulkCreate(
          [{
            name: file.name,
            mimeType: file.mimeType,
            size: file.size,
            folderId: file.folderId,
            createdById: 1, // TODO: Get from auth
          }],
          {
            validate: true,
            individualHooks: true
          }
        );

        // Fetch file with user data
        const fileWithUser = await File.findByPk(createdFile.id, {
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
        const errorMessage = error.name === 'SequelizeValidationError' || error.name === 'SequelizeUniqueConstraintError'
          ? error.errors[0].message
          : "Failed to create file";
        
        results.errors.push({
          name: file.name,
          error: errorMessage
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
      const file = await File.findByPk(id, {
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
      const file = await File.findByPk(id);
      if (!file) {
        throw new Error("File not found");
      }
      await file.destroy();
    } catch (error) {
      console.error("Error deleting file:", error);
      throw new Error("Failed to delete file");
    }
  }
}
