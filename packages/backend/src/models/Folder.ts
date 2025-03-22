import {
  Table,
  Model,
  Column,
  ForeignKey,
  BelongsTo,
  HasMany,
  Index,
} from "sequelize-typescript";
import { DataTypes, Op } from "sequelize";
import { User } from "./User.js";
import { File } from "./File.js";

@Table({
  tableName: "folders",
  timestamps: true,
  paranoid: true,
  indexes: [
    {
      unique: true,
      fields: ["name", "parentId"],
      name: "unique_folder_name_in_parent",
      where: {
        deletedAt: null,
      },
    },
  ],
  validate: {
    async uniqueNameInParent(this: Folder) {
      const where = {
        name: this.name,
        id: { [Op.ne]: this.id || 0 },
        deletedAt: null,
      };

      // For root level folders (parentId is null/undefined)
      if (this.parentId === undefined || this.parentId === null) {
        Object.assign(where, { parentId: null });
      } else {
        Object.assign(where, { parentId: this.parentId });
      }

      const existingFolder = await Folder.findOne({ where });
      if (existingFolder) {
        throw new Error(
          "A folder with this name already exists in this location",
        );
      }
    },
    async isValidParent(this: Folder) {
      if (this.parentId === this.id) {
        throw new Error("Folder cannot be its own parent");
      }
      // Check for circular reference
      if (this.parentId) {
        let parent = await Folder.findByPk(this.parentId);
        while (parent) {
          if (parent.id === this.id) {
            throw new Error("Circular folder reference detected");
          }
          parent = parent.parentId
            ? await Folder.findByPk(parent.parentId)
            : null;
        }
      }
    },
  },
})
@Index("unique_folder_name_in_parent")
export class Folder extends Model<Folder> {
  @Column({
    type: DataTypes.STRING(255),
    allowNull: false,
    validate: {
      notEmpty: {
        msg: "Folder name cannot be empty",
      },
      len: {
        args: [1, 255],
        msg: "Folder name must be between 1 and 255 characters",
      },
      notIn: {
        args: [["/", ".", ".."]],
        msg: "Invalid folder name",
      },
    },
  })
  declare name: string;

  @ForeignKey(() => Folder)
  @Column({
    type: DataTypes.INTEGER,
    allowNull: true,
  })
  declare parentId?: number;

  @BelongsTo(() => Folder)
  declare parent?: Folder;

  @HasMany(() => Folder)
  declare subfolders?: Folder[];

  @HasMany(() => File)
  declare files?: File[];

  @ForeignKey(() => User)
  @Column({
    type: DataTypes.INTEGER,
    allowNull: false,
  })
  declare createdById: number;

  @BelongsTo(() => User)
  declare createdBy?: User;

  // Timestamps
  declare createdAt: Date;
  declare updatedAt: Date;
  declare deletedAt: Date | null;
}
