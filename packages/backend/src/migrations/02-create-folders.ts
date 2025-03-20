import { DataTypes } from "sequelize";
import type { Migration } from "./migrator.js";

export const up: Migration = async ({ context: queryInterface }) => {
  await queryInterface.createTable("folders", {
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
    parentId: {
      type: DataTypes.INTEGER,
      allowNull: true,
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

  // Add unique constraint for folder name within parent
  await queryInterface.addIndex("folders", ["name", "parentId"], {
    unique: true,
    name: "unique_folder_name_in_parent",
    where: {
      deletedAt: null,
    },
  });
};

export const down: Migration = async ({ context: queryInterface }) => {
  await queryInterface.removeIndex("folders", "unique_folder_name_in_parent");
  await queryInterface.dropTable("folders");
};
