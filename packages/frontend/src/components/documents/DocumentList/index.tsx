"use client";

import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  IconButton,
  Button,
  TextField,
  Stack,
  Checkbox,
} from "@mui/material";
import {
  MoreVert as MoreVertIcon,
  Search as SearchIcon,
  Upload as UploadIcon,
  Add as AddIcon,
  Folder as FolderIcon,
  InsertDriveFile as FileIcon,
} from "@mui/icons-material";
import { Document, mockDocuments } from "@/mocks/documents";

interface DocumentListProps {
  folderId?: string;
}

export const DocumentList = ({ folderId }: DocumentListProps) => {
  return (
    <Box sx={{ p: 3 }}>
      {/* Header */}
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        mb={3}
      >
        <Typography variant="h4" component="h1" sx={{ fontWeight: "normal" }}>
          Documents
        </Typography>
        <Stack direction="row" spacing={2}>
          <Button
            variant="outlined"
            startIcon={<UploadIcon />}
            sx={{
              borderRadius: "50px",
              textTransform: "none",
              color: "primary.main",
              borderColor: "primary.main",
              px: 3,
            }}
          >
            Upload files
          </Button>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            sx={{
              borderRadius: "50px",
              textTransform: "none",
              bgcolor: "#1a237e",
              "&:hover": {
                bgcolor: "#0d47a1",
              },
              px: 3,
            }}
          >
            Add new folder
          </Button>
        </Stack>
      </Stack>

      {/* Search */}
      <Box mb={3} sx={{ maxWidth: 400 }}>
        <TextField
          fullWidth
          placeholder="Search"
          variant="outlined"
          size="small"
          InputProps={{
            startAdornment: <SearchIcon color="action" sx={{ mr: 1 }} />,
            sx: {
              borderRadius: "8px",
              bgcolor: "background.paper",
            },
          }}
        />
      </Box>

      {/* Table */}
      <TableContainer
        component={Paper}
        sx={{ borderRadius: 2, overflow: "hidden", mb: 2 }}
      >
        <Table>
          <TableHead>
            <TableRow sx={{ bgcolor: "#1a237e" }}>
              <TableCell padding="checkbox" sx={{ color: "white" }}>
                <Checkbox
                  sx={{ color: "white", "&.Mui-checked": { color: "white" } }}
                />
              </TableCell>
              <TableCell sx={{ color: "white" }}>
                Name
                <IconButton size="small" sx={{ color: "white", ml: 1 }}>
                  <MoreVertIcon fontSize="small" />
                </IconButton>
              </TableCell>
              <TableCell sx={{ color: "white" }}>Created by</TableCell>
              <TableCell sx={{ color: "white" }}>
                Date
                <IconButton size="small" sx={{ color: "white", ml: 1 }}>
                  <MoreVertIcon fontSize="small" />
                </IconButton>
              </TableCell>
              <TableCell sx={{ color: "white" }}>File size</TableCell>
              <TableCell sx={{ color: "white" }}></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {mockDocuments.map((doc) => (
              <TableRow key={doc.id} hover>
                <TableCell padding="checkbox">
                  <Checkbox />
                </TableCell>
                <TableCell>
                  <Stack direction="row" alignItems="center" spacing={1}>
                    {doc.type === "folder" ? (
                      <FolderIcon sx={{ color: "#FFA726" }} />
                    ) : (
                      <FileIcon sx={{ color: "#2196F3" }} />
                    )}
                    {doc.name}
                  </Stack>
                </TableCell>
                <TableCell>{doc.createdBy}</TableCell>
                <TableCell>
                  {new Date(doc.createdAt).toLocaleDateString("en-US", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </TableCell>
                <TableCell>{doc.size || "-"}</TableCell>
                <TableCell align="right">
                  <IconButton size="small">
                    <MoreVertIcon fontSize="small" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination */}
      <Stack direction="row" spacing={2} alignItems="center">
        <Typography variant="body2" color="text.secondary">
          Show
        </Typography>
        <select
          style={{
            padding: "4px 8px",
            borderRadius: "4px",
            border: "1px solid #e0e0e0",
          }}
        >
          <option>10</option>
          <option>20</option>
          <option>50</option>
        </select>
        <Typography variant="body2" color="text.secondary">
          rows per page
        </Typography>
        <Box sx={{ flexGrow: 1 }} />
        <Stack direction="row" spacing={1}>
          {[1, 2, 3, 4, 5].map((page) => (
            <Button
              key={page}
              variant={page === 1 ? "contained" : "text"}
              size="small"
              sx={{
                minWidth: "auto",
                px: 2,
                borderRadius: "4px",
                ...(page === 1 && {
                  bgcolor: "#1a237e",
                  "&:hover": {
                    bgcolor: "#0d47a1",
                  },
                }),
              }}
            >
              {page}
            </Button>
          ))}
        </Stack>
      </Stack>
    </Box>
  );
};
