import {
  Table,
  Model,
  Column,
  ForeignKey,
  BelongsTo,
  Index,
} from "sequelize-typescript";
import { Op } from "sequelize";
import { User } from "./User.js";
import { Folder } from "./Folder.js";

@Table({
  tableName: "files",
  timestamps: true,
  indexes: [
    {
      unique: true,
      fields: ["name", "folderId"],
      name: "unique_file_name_in_folder",
      where: {
        deletedAt: null, // If using paranoid/soft deletes
      },
    },
  ],
})
@Index("unique_file_name_in_folder")
export class File extends Model {
  @Column({
    allowNull: false,
    validate: {
      notEmpty: {
        msg: "File name cannot be empty",
      },
      len: {
        args: [1, 255],
        msg: "File name must be between 1 and 255 characters",
      },
      async uniqueNameInFolder(this: File) {
        const existingFile = await File.findOne({
          where: {
            name: this.name,
            folderId: this.folderId,
            id: { [Op.ne]: this.id },
          },
        });
        if (existingFile) {
          throw new Error(
            "A file with this name already exists in this folder",
          );
        }
      },
    },
  })
  name!: string;

  @Column({
    allowNull: true,
    validate: {
      len: {
        args: [0, 1000],
        msg: "Description cannot exceed 1000 characters",
      },
    },
  })
  description?: string;

  @Column({
    allowNull: false,
    validate: {
      notEmpty: {
        msg: "MIME type cannot be empty",
      },
      isValidMimeType(value: string) {
        const mimeTypePattern = /^[\w-]+\/[\w-]+$/;
        if (!mimeTypePattern.test(value)) {
          throw new Error("Invalid MIME type format");
        }
      },
    },
  })
  mimeType!: string;

  @Column({
    allowNull: false,
    validate: {
      min: {
        args: [0],
        msg: "File size cannot be negative",
      },
      max: {
        args: [1024 * 1024 * 100], // 100MB
        msg: "File size cannot exceed 100MB",
      },
    },
  })
  size!: number;

  @ForeignKey(() => Folder)
  @Column({
    allowNull: false,
  })
  folderId!: number;

  @BelongsTo(() => Folder)
  folder?: Folder;

  @ForeignKey(() => User)
  @Column({
    allowNull: false,
  })
  createdById!: number;

  @BelongsTo(() => User)
  createdBy?: User;
}
