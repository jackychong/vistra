import type { Seeder } from "./seeder.js";
import { User } from "../models/User.js";

export const up: Seeder = async ({ context: sequelize }) => {
  // Create users
  const users = await User.bulkCreate([
    {
      name: "Admin User",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: "Demo User",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: "Test User",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]);

  return users;
};

export const down: Seeder = async ({ context: sequelize }) => {
  await User.destroy({
    where: {
      name: ["Admin User", "Demo User", "Test User"],
    },
  });
};
