import { SxProps } from "@mui/material";

export const searchInputStyles: SxProps = {
  backgroundColor: "secondary.main",
  width: "300px",
  "& .MuiInputBase-root": {
    height: "37px",
  },
  "& .MuiInputLabel-root": {
    fontSize: "15px",
  },
};

export const searchButtonStyles: SxProps = {
  backgroundColor: "primary.dark",
  color: "white",
  "&:hover": {
    backgroundColor: "secondary.dark",
  },
  ml: "5px",
};
