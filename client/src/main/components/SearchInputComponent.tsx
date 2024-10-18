import React, { useState } from "react";
import { Box, Input, Button, Tooltip } from "@mui/material";
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
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Input
        value={input}
        onChange={(event) => setInput(event.target.value)}
        sx={searchInputStyles}
        size="small"
        placeholder="Search for task..."
      />
      <Tooltip title="Search">
        <Button onClick={handleSearchClick} type="button" sx={searchButtonStyles}>
          <SearchIcon />
        </Button>
      </Tooltip>
    </Box>
  );
};
