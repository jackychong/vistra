import {
  Table,
  Model,
  Column,
  ForeignKey,
  BelongsTo,
  HasMany,
  Index,
} from "sequelize-typescript";
import { Op } from "sequelize";
import { User } from "./User.js";
import { File } from "./File.js";

@Table({
  tableName: "folders",
  timestamps: true,
  indexes: [
    {
      unique: true,
      fields: ["name", "parentId"],
      name: "unique_folder_name_in_parent",
      where: {
        deletedAt: null, // If using paranoid/soft deletes
      },
    },
  ],
})
@Index("unique_folder_name_in_parent")
export class Folder extends Model {
  @Column({
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
      async uniqueNameInParent(this: Folder) {
        const existingFolder = await Folder.findOne({
          where: {
            name: this.name,
            parentId: this.parentId,
            id: { [Op.ne]: this.id },
          },
        });
        if (existingFolder) {
          throw new Error(
            "A folder with this name already exists in this location",
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

  @ForeignKey(() => Folder)
  @Column({
    allowNull: true,
    validate: {
      async isValidParent(this: Folder, value: number) {
        if (value === this.id) {
          throw new Error("Folder cannot be its own parent");
        }
        // Check for circular reference
        if (value) {
          let parent = await Folder.findByPk(value);
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
  parentId?: number;

  @BelongsTo(() => Folder)
  parent?: Folder;

  @HasMany(() => Folder)
  subfolders?: Folder[];

  @HasMany(() => File)
  files?: File[];

  @ForeignKey(() => User)
  @Column({
    allowNull: false,
  })
  createdById!: number;

  @BelongsTo(() => User)
  createdBy?: User;
}
