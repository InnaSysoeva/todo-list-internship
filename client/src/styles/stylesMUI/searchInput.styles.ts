import { SxProps } from "@mui/material";

export const searchInputStyles: SxProps = {
  height: "35px",
  padding: "10px",
  backgroundColor: "secondary.main",
  width: "300px",
  border: "1px solid grey",
  borderBottom: "none",
};

export const searchButtonStyles: SxProps = {
  backgroundColor: "primary.dark",
  color: "white",
  "&:hover": {
    backgroundColor: "secondary.dark",
  },
  ml: "5px",
};
