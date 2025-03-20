import { DataTypes } from "sequelize";
import type { Migration } from "./migrator.js";

export const up: Migration = async ({ context: queryInterface }) => {
  await queryInterface.createTable("files", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING(1000),
      allowNull: true,
    },
    mimeType: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    size: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 0,
        max: 104857600, // 100MB
      },
    },
    folderId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "folders",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "RESTRICT",
    },
    createdById: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "users",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "RESTRICT",
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    deletedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  });

  // Add unique constraint for file name within folder
  await queryInterface.addIndex("files", ["name", "folderId"], {
    unique: true,
    name: "unique_file_name_in_folder",
    where: {
      deletedAt: null,
    },
  });
};

export const down: Migration = async ({ context: queryInterface }) => {
  await queryInterface.removeIndex("files", "unique_file_name_in_folder");
  await queryInterface.dropTable("files");
};
