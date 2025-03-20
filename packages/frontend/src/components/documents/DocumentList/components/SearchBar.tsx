"use client";

import { Box, TextField } from "@mui/material";
import { Search as SearchIcon } from "@mui/icons-material";
import { SearchBarProps } from "../types";

export const SearchBar = ({ value, onChange }: SearchBarProps) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  return (
    <Box mb={3} sx={{ maxWidth: 400 }}>
      <TextField
        fullWidth
        placeholder="Search"
        variant="outlined"
        size="small"
        value={value}
        onChange={handleChange}
        InputProps={{
          startAdornment: <SearchIcon color="action" sx={{ mr: 1 }} />,
          sx: {
            borderRadius: "8px",
            bgcolor: "background.paper",
          },
        }}
      />
    </Box>
  );
};
