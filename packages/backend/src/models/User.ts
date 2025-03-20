import { Table, Model, Column, HasMany } from "sequelize-typescript";
import { File } from "./File.js";
import { Folder } from "./Folder.js";

@Table({
  tableName: "users",
  timestamps: true,
})
export class User extends Model {
  @Column({
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
  name!: string;

  @HasMany(() => File)
  files?: File[];

  @HasMany(() => Folder)
  folders?: Folder[];
}
