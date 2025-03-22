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
  static async createFiles(files: CreateFileParams[]): Promise<File[]> {
    try {
      const createdFiles = await File.bulkCreate(
        files.map((file: CreateFileParams) => ({
          name: file.name,
          mimeType: file.mimeType,
          size: file.size,
          folderId: file.folderId,
          createdById: 1, // TODO: Get from auth
        })),
      );

      // Fetch files with user data
      const filesWithUser = await File.findAll({
        where: {
          id: createdFiles.map((file: File) => file.id),
        },
        include: [
          {
            model: User,
            as: "user",
            attributes: ["id", "name"],
          },
        ],
      });

      return filesWithUser;
    } catch (error) {
      console.error("Error creating files:", error);
      throw new Error("Failed to create files");
    }
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
