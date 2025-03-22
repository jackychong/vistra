import {
  Table,
  Model,
  Column,
  ForeignKey,
  BelongsTo,
  Index,
} from "sequelize-typescript";
import { DataTypes, Op } from "sequelize";
import { User } from "./User.js";
import { Folder } from "./Folder.js";

@Table({
  tableName: "files",
  timestamps: true,
  paranoid: true,
  indexes: [
    {
      unique: true,
      fields: ["name", "folderId"],
      name: "unique_file_name_in_folder",
      where: {
        deletedAt: null,
      },
    },
  ],
})
@Index("unique_file_name_in_folder")
export class File extends Model<File> {
  @Column({
    type: DataTypes.STRING(255),
    allowNull: false,
    validate: {
      notEmpty: {
        msg: "File name cannot be empty",
      },
      len: {
        args: [1, 255],
        msg: "File name must be between 1 and 255 characters",
      },
      isUnique: async function (this: File) {
        await this.uniqueNameInFolder();
      },
    },
  })
  declare name: string;

  @Column({
    type: DataTypes.STRING(255),
    allowNull: false,
    validate: {
      notEmpty: {
        msg: "MIME type cannot be empty",
      },
    },
  })
  declare mimeType: string;

  @Column({
    type: DataTypes.INTEGER,
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
  declare size: number;

  @ForeignKey(() => Folder)
  @Column({
    type: DataTypes.INTEGER,
    allowNull: true,
  })
  declare folderId: number | null;

  @BelongsTo(() => Folder, { foreignKey: "folderId" })
  declare folder?: Folder;

  @ForeignKey(() => User)
  @Column({
    type: DataTypes.INTEGER,
    allowNull: false,
  })
  declare createdById: number;

  @BelongsTo(() => User)
  declare user?: User;

  // Timestamps
  declare createdAt: Date;
  declare updatedAt: Date;
  declare deletedAt: Date | null;

  // Custom validation method
  async uniqueNameInFolder() {
    const existingFile = await File.findOne({
      where: {
        name: this.name,
        folderId: this.folderId,
        id: { [Op.ne]: this.id },
      },
    });
    if (existingFile) {
      throw new Error("A file with this name already exists in this folder");
    }
  }
}
