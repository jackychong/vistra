"use client";

import {
  Box,
  TextField,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { Search as SearchIcon, Clear as ClearIcon } from "@mui/icons-material";
import { SearchBarProps } from "../types";
import { useCallback, useEffect, useState } from "react";
import debounce from "lodash/debounce";

export const SearchBar = ({
  value,
  onChange,
}: SearchBarProps) => {
  const [searchTerm, setSearchTerm] = useState(value);

  // Debounce the onChange callback
  const debouncedOnChange = useCallback(
    debounce((value: string) => {
      onChange(value);
    }, 300),
    [onChange],
  );

  // Update local state when prop changes
  useEffect(() => {
    setSearchTerm(value);
  }, [value]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setSearchTerm(newValue);
    debouncedOnChange(newValue);
  };

  const handleClear = () => {
    setSearchTerm("");
    onChange("");
  };

  return (
    <Box mb={3} sx={{ maxWidth: 400 }}>
      <TextField
        fullWidth
        placeholder="Search files and folders..."
        variant="outlined"
        size="small"
        value={searchTerm}
        onChange={handleChange}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon color="action" />
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position="end">
              {searchTerm ? (
                <IconButton
                  aria-label="clear search"
                  onClick={handleClear}
                  edge="end"
                  size="small"
                >
                  <ClearIcon />
                </IconButton>
              ) : null}
            </InputAdornment>
          ),
          sx: {
            borderRadius: "8px",
            bgcolor: "background.paper",
            "& .MuiOutlinedInput-root": {
              "&.Mui-disabled": {
                backgroundColor: "action.hover",
              },
            },
          },
        }}
      />
    </Box>
  );
};
