import type { Seeder } from "./seeder.js";
import { User } from "../models/User.js";
import { Folder } from "../models/Folder.js";

export const up: Seeder = async () => {
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
    createdById: demoUser.id,
  });

  const photos = await Folder.create({
    name: "Photos",
    createdById: demoUser.id,
  });

  const projects = await Folder.create({
    name: "Projects",
    createdById: demoUser.id,
  });

  const personal = await Folder.create({
    name: "Personal",
    createdById: demoUser.id,
  });

  // Documents subfolders
  const work = await Folder.create({
    name: "Work",
    parentId: documents.id,
    createdById: demoUser.id,
  });

  const finance = await Folder.create({
    name: "Finance",
    parentId: documents.id,
    createdById: demoUser.id,
  });

  const education = await Folder.create({
    name: "Education",
    parentId: documents.id,
    createdById: demoUser.id,
  });

  // Work subfolders
  await Folder.create({
    name: "Reports",
    parentId: work.id,
    createdById: demoUser.id,
  });

  await Folder.create({
    name: "Presentations",
    parentId: work.id,
    createdById: demoUser.id,
  });

  await Folder.create({
    name: "Contracts",
    parentId: work.id,
    createdById: demoUser.id,
  });

  // Finance subfolders
  await Folder.create({
    name: "Invoices",
    parentId: finance.id,
    createdById: demoUser.id,
  });

  await Folder.create({
    name: "Tax Returns",
    parentId: finance.id,
    createdById: demoUser.id,
  });

  await Folder.create({
    name: "Receipts",
    parentId: finance.id,
    createdById: demoUser.id,
  });

  // Education subfolders
  await Folder.create({
    name: "Courses",
    parentId: education.id,
    createdById: demoUser.id,
  });

  await Folder.create({
    name: "Certificates",
    parentId: education.id,
    createdById: demoUser.id,
  });

  // Photos subfolders
  const events = await Folder.create({
    name: "Events",
    parentId: photos.id,
    createdById: demoUser.id,
  });

  const travel = await Folder.create({
    name: "Travel",
    parentId: photos.id,
    createdById: demoUser.id,
  });

  const family = await Folder.create({
    name: "Family",
    parentId: photos.id,
    createdById: demoUser.id,
  });

  // Events subfolders
  await Folder.create({
    name: "Weddings",
    parentId: events.id,
    createdById: demoUser.id,
  });

  await Folder.create({
    name: "Birthdays",
    parentId: events.id,
    createdById: demoUser.id,
  });

  // Travel subfolders by year
  await Folder.create({
    name: "2023",
    parentId: travel.id,
    createdById: demoUser.id,
  });

  await Folder.create({
    name: "2024",
    parentId: travel.id,
    createdById: demoUser.id,
  });

  // Projects subfolders
  const webDev = await Folder.create({
    name: "Web Development",
    parentId: projects.id,
    createdById: demoUser.id,
  });

  const design = await Folder.create({
    name: "Design",
    parentId: projects.id,
    createdById: demoUser.id,
  });

  // Web Development subfolders
  await Folder.create({
    name: "Frontend",
    parentId: webDev.id,
    createdById: demoUser.id,
  });

  await Folder.create({
    name: "Backend",
    parentId: webDev.id,
    createdById: demoUser.id,
  });

  // Design subfolders
  await Folder.create({
    name: "UI Design",
    parentId: design.id,
    createdById: demoUser.id,
  });

  await Folder.create({
    name: "Logos",
    parentId: design.id,
    createdById: demoUser.id,
  });

  // Personal subfolders
  await Folder.create({
    name: "Health",
    parentId: personal.id,
    createdById: demoUser.id,
  });

  await Folder.create({
    name: "Hobbies",
    parentId: personal.id,
    createdById: demoUser.id,
  });

  await Folder.create({
    name: "Journal",
    parentId: personal.id,
    createdById: demoUser.id,
  });
};

export const down: Seeder = async () => {
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
