export interface Document {
  id: string;
  name: string;
  type: "folder" | "file";
  createdBy: string;
  createdAt: string;
  updatedAt: string;
  size?: string;
}

export const mockDocuments: Document[] = [
  {
    id: "1",
    name: "Appointment resolutions",
    type: "folder",
    createdBy: "John Green",
    createdAt: "2024-04-12T10:00:00Z",
    updatedAt: "2024-04-12T10:00:00Z",
  },
  {
    id: "2",
    name: "Policy approvals",
    type: "folder",
    createdBy: "John Green",
    createdAt: "2024-04-12T10:00:00Z",
    updatedAt: "2024-04-12T10:00:00Z",
  },
  {
    id: "3",
    name: "2025_01_15_Director_Appointment_Resolution.pdf",
    type: "file",
    createdBy: "John Green",
    createdAt: "2024-04-12T10:00:00Z",
    updatedAt: "2024-04-12T10:00:00Z",
    size: "1 KB",
  },
  {
    id: "4",
    name: "2024_12_10_Dividend_Declaration_Resolution.docx2024",
    type: "file",
    createdBy: "John Green",
    createdAt: "2024-04-12T10:00:00Z",
    updatedAt: "2024-04-12T10:00:00Z",
    size: "1 KB",
  },
  {
    id: "5",
    name: "2023_08_05_Investment_Policy_Approval.pdf",
    type: "file",
    createdBy: "John Green",
    createdAt: "2024-04-12T10:00:00Z",
    updatedAt: "2024-04-12T10:00:00Z",
    size: "1 KB",
  },
];
