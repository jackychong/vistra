import type { Seeder } from "./seeder.js";
import { User } from "../models/User.js";
import { Folder } from "../models/Folder.js";
import { File } from "../models/File.js";

export const up: Seeder = async ({ context: sequelize }) => {
  const demoUser = await User.findOne({
    where: { name: "Demo User" },
  });

  if (!demoUser) {
    throw new Error("Demo user not found");
  }

  // Get folders
  const presentations = await Folder.findOne({
    where: { name: "Presentations", createdById: demoUser.id },
  });

  const contracts = await Folder.findOne({
    where: { name: "Contracts", createdById: demoUser.id },
  });

  const invoices = await Folder.findOne({
    where: { name: "Invoices", createdById: demoUser.id },
  });

  const courses = await Folder.findOne({
    where: { name: "Courses", createdById: demoUser.id },
  });

  const travel2024 = await Folder.findOne({
    where: { name: "2024", createdById: demoUser.id },
  });

  const frontend = await Folder.findOne({
    where: { name: "Frontend", createdById: demoUser.id },
  });

  const uiDesign = await Folder.findOne({
    where: { name: "UI Design", createdById: demoUser.id },
  });

  // Sample files for each folder
  if (presentations) {
    await File.create({
      name: "Q1 Review.pptx",
      description: "Q1 2024 Performance Review",
      mimeType:
        "application/vnd.openxmlformats-officedocument.presentationml.presentation",
      size: 2500000,
      folderId: presentations.id,
      createdById: demoUser.id,
    });

    await File.create({
      name: "Project Proposal.pptx",
      description: "New Project Proposal",
      mimeType:
        "application/vnd.openxmlformats-officedocument.presentationml.presentation",
      size: 1800000,
      folderId: presentations.id,
      createdById: demoUser.id,
    });
  }

  if (contracts) {
    await File.create({
      name: "Service Agreement.pdf",
      description: "Client Service Agreement",
      mimeType: "application/pdf",
      size: 500000,
      folderId: contracts.id,
      createdById: demoUser.id,
    });
  }

  if (invoices) {
    await File.create({
      name: "March2024.pdf",
      description: "March 2024 Invoice",
      mimeType: "application/pdf",
      size: 250000,
      folderId: invoices.id,
      createdById: demoUser.id,
    });
  }

  if (courses) {
    await File.create({
      name: "TypeScript Basics.mp4",
      description: "TypeScript Course Video",
      mimeType: "video/mp4",
      size: 50000000,
      folderId: courses.id,
      createdById: demoUser.id,
    });

    await File.create({
      name: "Course Notes.pdf",
      description: "TypeScript Course Notes",
      mimeType: "application/pdf",
      size: 1500000,
      folderId: courses.id,
      createdById: demoUser.id,
    });
  }

  if (travel2024) {
    await File.create({
      name: "Beach Sunset.jpg",
      description: "Beautiful beach sunset photo",
      mimeType: "image/jpeg",
      size: 3500000,
      folderId: travel2024.id,
      createdById: demoUser.id,
    });

    await File.create({
      name: "Mountain View.jpg",
      description: "Mountain landscape photo",
      mimeType: "image/jpeg",
      size: 4200000,
      folderId: travel2024.id,
      createdById: demoUser.id,
    });
  }

  if (frontend) {
    await File.create({
      name: "app.tsx",
      description: "Main application component",
      mimeType: "application/typescript",
      size: 5000,
      folderId: frontend.id,
      createdById: demoUser.id,
    });

    await File.create({
      name: "styles.css",
      description: "Application styles",
      mimeType: "text/css",
      size: 2500,
      folderId: frontend.id,
      createdById: demoUser.id,
    });
  }

  if (uiDesign) {
    await File.create({
      name: "Dashboard.fig",
      description: "Dashboard UI Design",
      mimeType: "application/x-figma",
      size: 15000000,
      folderId: uiDesign.id,
      createdById: demoUser.id,
    });

    await File.create({
      name: "Mobile App.sketch",
      description: "Mobile App Design",
      mimeType: "application/x-sketch",
      size: 12000000,
      folderId: uiDesign.id,
      createdById: demoUser.id,
    });
  }
};

export const down: Seeder = async ({ context: sequelize }) => {
  const demoUser = await User.findOne({
    where: { name: "Demo User" },
  });

  if (demoUser) {
    await File.destroy({
      where: {
        createdById: demoUser.id,
      },
    });
  }
};
