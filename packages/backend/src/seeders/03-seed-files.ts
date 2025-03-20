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

  // Get all needed folders
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
  const backend = await Folder.findOne({
    where: { name: "Backend", createdById: demoUser.id },
  });
  const uiDesign = await Folder.findOne({
    where: { name: "UI Design", createdById: demoUser.id },
  });
  const logos = await Folder.findOne({
    where: { name: "Logos", createdById: demoUser.id },
  });
  const reports = await Folder.findOne({
    where: { name: "Reports", createdById: demoUser.id },
  });
  const receipts = await Folder.findOne({
    where: { name: "Receipts", createdById: demoUser.id },
  });
  const certificates = await Folder.findOne({
    where: { name: "Certificates", createdById: demoUser.id },
  });
  const weddings = await Folder.findOne({
    where: { name: "Weddings", createdById: demoUser.id },
  });
  const birthdays = await Folder.findOne({
    where: { name: "Birthdays", createdById: demoUser.id },
  });
  const health = await Folder.findOne({
    where: { name: "Health", createdById: demoUser.id },
  });
  const journal = await Folder.findOne({
    where: { name: "Journal", createdById: demoUser.id },
  });

  // Presentations folder - PowerPoint and Keynote files
  if (presentations) {
    await File.create({
      name: "Q1 Review.pptx",
      mimeType:
        "application/vnd.openxmlformats-officedocument.presentationml.presentation",
      size: 2500000,
      folderId: presentations.id,
      createdById: demoUser.id,
    });

    await File.create({
      name: "Project Proposal.pptx",
      mimeType:
        "application/vnd.openxmlformats-officedocument.presentationml.presentation",
      size: 1800000,
      folderId: presentations.id,
      createdById: demoUser.id,
    });
  }

  // Contracts folder - Legal documents
  if (contracts) {
    await File.create({
      name: "Service Agreement.pdf",
      mimeType: "application/pdf",
      size: 500000,
      folderId: contracts.id,
      createdById: demoUser.id,
    });
    await File.create({
      name: "NDA Template.docx",
      mimeType:
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      size: 350000,
      folderId: contracts.id,
      createdById: demoUser.id,
    });
    await File.create({
      name: "Partnership Agreement.pdf",
      mimeType: "application/pdf",
      size: 750000,
      folderId: contracts.id,
      createdById: demoUser.id,
    });
  }

  // Invoices folder - Financial documents
  if (invoices) {
    await File.create({
      name: "March2024.pdf",
      mimeType: "application/pdf",
      size: 250000,
      folderId: invoices.id,
      createdById: demoUser.id,
    });
    await File.create({
      name: "Q1_2024_Summary.xlsx",
      mimeType:
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      size: 450000,
      folderId: invoices.id,
      createdById: demoUser.id,
    });
    await File.create({
      name: "February2024.pdf",
      mimeType: "application/pdf",
      size: 275000,
      folderId: invoices.id,
      createdById: demoUser.id,
    });
  }

  // Courses folder - Educational content
  if (courses) {
    await File.create({
      name: "TypeScript Basics.mp4",
      mimeType: "video/mp4",
      size: 50000000,
      folderId: courses.id,
      createdById: demoUser.id,
    });
    await File.create({
      name: "Course Notes.pdf",
      mimeType: "application/pdf",
      size: 1500000,
      folderId: courses.id,
      createdById: demoUser.id,
    });
    await File.create({
      name: "Exercise Files.zip",
      mimeType: "application/zip",
      size: 25000000,
      folderId: courses.id,
      createdById: demoUser.id,
    });
    await File.create({
      name: "Final Project.zip",
      mimeType: "application/zip",
      size: 30000000,
      folderId: courses.id,
      createdById: demoUser.id,
    });
  }

  // Travel photos
  if (travel2024) {
    await File.create({
      name: "Beach Sunset.jpg",
      mimeType: "image/jpeg",
      size: 3500000,
      folderId: travel2024.id,
      createdById: demoUser.id,
    });
    await File.create({
      name: "Mountain View.jpg",
      mimeType: "image/jpeg",
      size: 4200000,
      folderId: travel2024.id,
      createdById: demoUser.id,
    });
    await File.create({
      name: "City Panorama.jpg",
      mimeType: "image/jpeg",
      size: 5500000,
      folderId: travel2024.id,
      createdById: demoUser.id,
    });
    await File.create({
      name: "Travel Itinerary.pdf",
      mimeType: "application/pdf",
      size: 450000,
      folderId: travel2024.id,
      createdById: demoUser.id,
    });
    await File.create({
      name: "Vacation Video.mp4",
      mimeType: "video/mp4",
      size: 75000000,
      folderId: travel2024.id,
      createdById: demoUser.id,
    });
  }

  // Frontend development files
  if (frontend) {
    await File.create({
      name: "app.tsx",
      mimeType: "application/typescript",
      size: 5000,
      folderId: frontend.id,
      createdById: demoUser.id,
    });
    await File.create({
      name: "styles.css",
      mimeType: "text/css",
      size: 2500,
      folderId: frontend.id,
      createdById: demoUser.id,
    });
    await File.create({
      name: "index.html",
      mimeType: "text/html",
      size: 1500,
      folderId: frontend.id,
      createdById: demoUser.id,
    });
    await File.create({
      name: "package.json",
      mimeType: "application/json",
      size: 1000,
      folderId: frontend.id,
      createdById: demoUser.id,
    });
    await File.create({
      name: "tsconfig.json",
      mimeType: "application/json",
      size: 800,
      folderId: frontend.id,
      createdById: demoUser.id,
    });
  }

  // Backend development files
  if (backend) {
    await File.create({
      name: "server.ts",
      mimeType: "application/typescript",
      size: 4500,
      folderId: backend.id,
      createdById: demoUser.id,
    });
    await File.create({
      name: "database.ts",
      mimeType: "application/typescript",
      size: 3500,
      folderId: backend.id,
      createdById: demoUser.id,
    });
    await File.create({
      name: "routes.ts",
      mimeType: "application/typescript",
      size: 2800,
      folderId: backend.id,
      createdById: demoUser.id,
    });
    await File.create({
      name: "middleware.ts",
      mimeType: "application/typescript",
      size: 2200,
      folderId: backend.id,
      createdById: demoUser.id,
    });
  }

  // UI Design files
  if (uiDesign) {
    await File.create({
      name: "Dashboard.fig",
      mimeType: "application/x-figma",
      size: 15000000,
      folderId: uiDesign.id,
      createdById: demoUser.id,
    });
    await File.create({
      name: "Mobile App.sketch",
      mimeType: "application/x-sketch",
      size: 12000000,
      folderId: uiDesign.id,
      createdById: demoUser.id,
    });
    await File.create({
      name: "Design System v2.fig",
      mimeType: "application/x-figma",
      size: 18000000,
      folderId: uiDesign.id,
      createdById: demoUser.id,
    });
    await File.create({
      name: "Wireframes.pdf",
      mimeType: "application/pdf",
      size: 8000000,
      folderId: uiDesign.id,
      createdById: demoUser.id,
    });
  }

  // Logo design files
  if (logos) {
    await File.create({
      name: "Logo_Dark.svg",
      mimeType: "image/svg+xml",
      size: 25000,
      folderId: logos.id,
      createdById: demoUser.id,
    });
    await File.create({
      name: "Logo_Light.svg",
      mimeType: "image/svg+xml",
      size: 25000,
      folderId: logos.id,
      createdById: demoUser.id,
    });
    await File.create({
      name: "Logo_Source.ai",
      mimeType: "application/illustrator",
      size: 5000000,
      folderId: logos.id,
      createdById: demoUser.id,
    });
    await File.create({
      name: "Brand Guidelines.pdf",
      mimeType: "application/pdf",
      size: 12000000,
      folderId: logos.id,
      createdById: demoUser.id,
    });
  }

  // Reports
  if (reports) {
    await File.create({
      name: "Annual Report 2023.pdf",
      mimeType: "application/pdf",
      size: 15000000,
      folderId: reports.id,
      createdById: demoUser.id,
    });
    await File.create({
      name: "Q4 Analysis.xlsx",
      mimeType:
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      size: 2500000,
      folderId: reports.id,
      createdById: demoUser.id,
    });
    await File.create({
      name: "Market Research.docx",
      mimeType:
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      size: 1800000,
      folderId: reports.id,
      createdById: demoUser.id,
    });
  }

  // Receipts
  if (receipts) {
    await File.create({
      name: "Office Supplies.pdf",
      mimeType: "application/pdf",
      size: 250000,
      folderId: receipts.id,
      createdById: demoUser.id,
    });
    await File.create({
      name: "Software Licenses.pdf",
      mimeType: "application/pdf",
      size: 300000,
      folderId: receipts.id,
      createdById: demoUser.id,
    });
    await File.create({
      name: "Travel Expenses.xlsx",
      mimeType:
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      size: 450000,
      folderId: receipts.id,
      createdById: demoUser.id,
    });
  }

  // Certificates
  if (certificates) {
    await File.create({
      name: "Web Development.pdf",
      mimeType: "application/pdf",
      size: 850000,
      folderId: certificates.id,
      createdById: demoUser.id,
    });
    await File.create({
      name: "Project Management.pdf",
      mimeType: "application/pdf",
      size: 920000,
      folderId: certificates.id,
      createdById: demoUser.id,
    });
    await File.create({
      name: "UI/UX Design.pdf",
      mimeType: "application/pdf",
      size: 780000,
      folderId: certificates.id,
      createdById: demoUser.id,
    });
  }

  // Wedding photos
  if (weddings) {
    await File.create({
      name: "Ceremony.jpg",
      mimeType: "image/jpeg",
      size: 8500000,
      folderId: weddings.id,
      createdById: demoUser.id,
    });
    await File.create({
      name: "Reception.jpg",
      mimeType: "image/jpeg",
      size: 7800000,
      folderId: weddings.id,
      createdById: demoUser.id,
    });
    await File.create({
      name: "Family Photos.jpg",
      mimeType: "image/jpeg",
      size: 9200000,
      folderId: weddings.id,
      createdById: demoUser.id,
    });
    await File.create({
      name: "Wedding Video.mp4",
      mimeType: "video/mp4",
      size: 95000000,
      folderId: weddings.id,
      createdById: demoUser.id,
    });
  }

  // Birthday photos
  if (birthdays) {
    await File.create({
      name: "Party Photos.jpg",
      mimeType: "image/jpeg",
      size: 6500000,
      folderId: birthdays.id,
      createdById: demoUser.id,
    });
    await File.create({
      name: "Cake Cutting.mp4",
      mimeType: "video/mp4",
      size: 85000000,
      folderId: birthdays.id,
      createdById: demoUser.id,
    });
    await File.create({
      name: "Gift List.xlsx",
      mimeType:
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      size: 250000,
      folderId: birthdays.id,
      createdById: demoUser.id,
    });
  }

  // Health records
  if (health) {
    await File.create({
      name: "Medical History.pdf",
      mimeType: "application/pdf",
      size: 1200000,
      folderId: health.id,
      createdById: demoUser.id,
    });
    await File.create({
      name: "Vaccination Record.pdf",
      mimeType: "application/pdf",
      size: 850000,
      folderId: health.id,
      createdById: demoUser.id,
    });
    await File.create({
      name: "Lab Results.pdf",
      mimeType: "application/pdf",
      size: 950000,
      folderId: health.id,
      createdById: demoUser.id,
    });
    await File.create({
      name: "Insurance Card.jpg",
      mimeType: "image/jpeg",
      size: 1500000,
      folderId: health.id,
      createdById: demoUser.id,
    });
  }

  // Journal entries
  if (journal) {
    await File.create({
      name: "January 2024.docx",
      mimeType:
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      size: 580000,
      folderId: journal.id,
      createdById: demoUser.id,
    });
    await File.create({
      name: "February 2024.docx",
      mimeType:
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      size: 620000,
      folderId: journal.id,
      createdById: demoUser.id,
    });
    await File.create({
      name: "March 2024.docx",
      mimeType:
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      size: 550000,
      folderId: journal.id,
      createdById: demoUser.id,
    });
  }

  // Root level files (no parent folder)
  console.log("Creating root level files...");

  // Document files
  await File.create({
    name: "Project Proposal.docx",
    mimeType:
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    size: 450000,
    folderId: null,
    createdById: demoUser.id,
  });

  await File.create({
    name: "Meeting Minutes.docx",
    mimeType:
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    size: 380000,
    folderId: null,
    createdById: demoUser.id,
  });

  await File.create({
    name: "Business Plan.pdf",
    mimeType: "application/pdf",
    size: 2500000,
    folderId: null,
    createdById: demoUser.id,
  });

  await File.create({
    name: "Company Overview.pdf",
    mimeType: "application/pdf",
    size: 1800000,
    folderId: null,
    createdById: demoUser.id,
  });

  // Spreadsheet files
  await File.create({
    name: "Budget 2024.xlsx",
    mimeType:
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    size: 550000,
    folderId: null,
    createdById: demoUser.id,
  });

  await File.create({
    name: "Sales Forecast.xlsx",
    mimeType:
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    size: 620000,
    folderId: null,
    createdById: demoUser.id,
  });

  await File.create({
    name: "Employee Schedule.xlsx",
    mimeType:
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    size: 480000,
    folderId: null,
    createdById: demoUser.id,
  });

  // Presentation files
  await File.create({
    name: "Company Presentation.pptx",
    mimeType:
      "application/vnd.openxmlformats-officedocument.presentationml.presentation",
    size: 3500000,
    folderId: null,
    createdById: demoUser.id,
  });

  await File.create({
    name: "Product Launch.pptx",
    mimeType:
      "application/vnd.openxmlformats-officedocument.presentationml.presentation",
    size: 4200000,
    folderId: null,
    createdById: demoUser.id,
  });

  // Image files
  await File.create({
    name: "Team Photo.jpg",
    mimeType: "image/jpeg",
    size: 2800000,
    folderId: null,
    createdById: demoUser.id,
  });

  await File.create({
    name: "Office Building.jpg",
    mimeType: "image/jpeg",
    size: 3200000,
    folderId: null,
    createdById: demoUser.id,
  });

  await File.create({
    name: "Product Mockup.png",
    mimeType: "image/png",
    size: 1500000,
    folderId: null,
    createdById: demoUser.id,
  });

  // PDF files
  await File.create({
    name: "User Manual.pdf",
    mimeType: "application/pdf",
    size: 4500000,
    folderId: null,
    createdById: demoUser.id,
  });

  await File.create({
    name: "Legal Agreement.pdf",
    mimeType: "application/pdf",
    size: 750000,
    folderId: null,
    createdById: demoUser.id,
  });

  await File.create({
    name: "Technical Specification.pdf",
    mimeType: "application/pdf",
    size: 3800000,
    folderId: null,
    createdById: demoUser.id,
  });

  // Code files
  await File.create({
    name: "main.js",
    mimeType: "application/javascript",
    size: 15000,
    folderId: null,
    createdById: demoUser.id,
  });

  await File.create({
    name: "styles.css",
    mimeType: "text/css",
    size: 8500,
    folderId: null,
    createdById: demoUser.id,
  });

  await File.create({
    name: "index.html",
    mimeType: "text/html",
    size: 12000,
    folderId: null,
    createdById: demoUser.id,
  });

  await File.create({
    name: "config.json",
    mimeType: "application/json",
    size: 5000,
    folderId: null,
    createdById: demoUser.id,
  });

  await File.create({
    name: "README.md",
    mimeType: "text/markdown",
    size: 7500,
    folderId: null,
    createdById: demoUser.id,
  });
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
