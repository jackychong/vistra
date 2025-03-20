import type { Seeder } from "./seeder.js";
import { User } from "../models/User.js";
import { Folder } from "../models/Folder.js";

export const up: Seeder = async ({ context: sequelize }) => {
  // Get demo user
  const demoUser = await User.findOne({
    where: { name: "Demo User" },
  });

  if (!demoUser) {
    throw new Error("Demo user not found");
  }

  // Create root folders
  const documents = await Folder.create({
    name: "Documents",
    description: "General documents folder",
    createdById: demoUser.id,
  });

  const photos = await Folder.create({
    name: "Photos",
    description: "Photo collections",
    createdById: demoUser.id,
  });

  const projects = await Folder.create({
    name: "Projects",
    description: "Project files and resources",
    createdById: demoUser.id,
  });

  const personal = await Folder.create({
    name: "Personal",
    description: "Personal files and documents",
    createdById: demoUser.id,
  });

  // Documents subfolders
  const work = await Folder.create({
    name: "Work",
    description: "Work-related documents",
    parentId: documents.id,
    createdById: demoUser.id,
  });

  const finance = await Folder.create({
    name: "Finance",
    description: "Financial documents",
    parentId: documents.id,
    createdById: demoUser.id,
  });

  const education = await Folder.create({
    name: "Education",
    description: "Educational materials",
    parentId: documents.id,
    createdById: demoUser.id,
  });

  // Work subfolders
  await Folder.create({
    name: "Reports",
    description: "Work reports",
    parentId: work.id,
    createdById: demoUser.id,
  });

  await Folder.create({
    name: "Presentations",
    description: "Work presentations",
    parentId: work.id,
    createdById: demoUser.id,
  });

  await Folder.create({
    name: "Contracts",
    description: "Work contracts",
    parentId: work.id,
    createdById: demoUser.id,
  });

  // Finance subfolders
  await Folder.create({
    name: "Invoices",
    description: "Financial invoices",
    parentId: finance.id,
    createdById: demoUser.id,
  });

  await Folder.create({
    name: "Tax Returns",
    description: "Tax documents",
    parentId: finance.id,
    createdById: demoUser.id,
  });

  await Folder.create({
    name: "Receipts",
    description: "Purchase receipts",
    parentId: finance.id,
    createdById: demoUser.id,
  });

  // Education subfolders
  await Folder.create({
    name: "Courses",
    description: "Online courses",
    parentId: education.id,
    createdById: demoUser.id,
  });

  await Folder.create({
    name: "Certificates",
    description: "Educational certificates",
    parentId: education.id,
    createdById: demoUser.id,
  });

  // Photos subfolders
  const events = await Folder.create({
    name: "Events",
    description: "Event photography",
    parentId: photos.id,
    createdById: demoUser.id,
  });

  const travel = await Folder.create({
    name: "Travel",
    description: "Travel photos",
    parentId: photos.id,
    createdById: demoUser.id,
  });

  const family = await Folder.create({
    name: "Family",
    description: "Family photos",
    parentId: photos.id,
    createdById: demoUser.id,
  });

  // Events subfolders
  await Folder.create({
    name: "Weddings",
    description: "Wedding photos",
    parentId: events.id,
    createdById: demoUser.id,
  });

  await Folder.create({
    name: "Birthdays",
    description: "Birthday celebrations",
    parentId: events.id,
    createdById: demoUser.id,
  });

  // Travel subfolders by year
  await Folder.create({
    name: "2023",
    description: "2023 travels",
    parentId: travel.id,
    createdById: demoUser.id,
  });

  await Folder.create({
    name: "2024",
    description: "2024 travels",
    parentId: travel.id,
    createdById: demoUser.id,
  });

  // Projects subfolders
  const webDev = await Folder.create({
    name: "Web Development",
    description: "Web development projects",
    parentId: projects.id,
    createdById: demoUser.id,
  });

  const design = await Folder.create({
    name: "Design",
    description: "Design projects",
    parentId: projects.id,
    createdById: demoUser.id,
  });

  // Web Development subfolders
  await Folder.create({
    name: "Frontend",
    description: "Frontend projects",
    parentId: webDev.id,
    createdById: demoUser.id,
  });

  await Folder.create({
    name: "Backend",
    description: "Backend projects",
    parentId: webDev.id,
    createdById: demoUser.id,
  });

  // Design subfolders
  await Folder.create({
    name: "UI Design",
    description: "User interface designs",
    parentId: design.id,
    createdById: demoUser.id,
  });

  await Folder.create({
    name: "Logos",
    description: "Logo designs",
    parentId: design.id,
    createdById: demoUser.id,
  });

  // Personal subfolders
  await Folder.create({
    name: "Health",
    description: "Health records",
    parentId: personal.id,
    createdById: demoUser.id,
  });

  await Folder.create({
    name: "Hobbies",
    description: "Hobby-related files",
    parentId: personal.id,
    createdById: demoUser.id,
  });

  await Folder.create({
    name: "Journal",
    description: "Personal journal entries",
    parentId: personal.id,
    createdById: demoUser.id,
  });
};

export const down: Seeder = async ({ context: sequelize }) => {
  const demoUser = await User.findOne({
    where: { name: "Demo User" },
  });

  if (demoUser) {
    await Folder.destroy({
      where: {
        createdById: demoUser.id,
      },
    });
  }
};
