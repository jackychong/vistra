import { Table, Model, Column, HasMany } from "sequelize-typescript";
import { DataTypes } from "sequelize";
import { File } from "./File.js";
import { Folder } from "./Folder.js";

@Table({
  tableName: "users",
  timestamps: true,
  paranoid: true,
})
export class User extends Model<User> {
  @Column({
    type: DataTypes.STRING(50),
    allowNull: false,
    validate: {
      notEmpty: {
        msg: "Name cannot be empty",
      },
      len: {
        args: [2, 50],
        msg: "Name must be between 2 and 50 characters",
      },
    },
  })
  declare name: string;

  @HasMany(() => File)
  declare files?: File[];

  @HasMany(() => Folder)
  declare folders?: Folder[];

  // Timestamps
  declare createdAt: Date;
  declare updatedAt: Date;
  declare deletedAt: Date | null;
}
