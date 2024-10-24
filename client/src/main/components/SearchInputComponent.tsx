import React, { useState } from "react";
import { Box, TextField, Button, Tooltip } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import {
  searchInputStyles,
  searchButtonStyles,
} from "../../styles/stylesMUI/searchInput.styles";

interface SearchInputProps {
  onSearchClicked: (input: string) => void;
}

export const SearchInputComponent: React.FC<SearchInputProps> = ({
  onSearchClicked,
}) => {
  const [input, setInput] = useState<string>("");

  const handleSearchClick = (): void => {
    onSearchClicked(input);
    setInput("");
  };

  return (
    <Box
      sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
    >
      <TextField
        value={input}
        onChange={(event) => setInput(event.target.value)}
        sx={searchInputStyles}
        label="Search for task..."
        size="small"
      />
      <Tooltip title="Search">
        <Button
          onClick={handleSearchClick}
          type="button"
          sx={searchButtonStyles}
        >
          <SearchIcon />
        </Button>
      </Tooltip>
    </Box>
  );
};
