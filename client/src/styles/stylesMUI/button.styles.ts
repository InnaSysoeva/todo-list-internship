import { SxProps } from "@mui/material";

export const buttonStyles: SxProps = {
  backgroundColor: "primary.dark",
  color: "white",
  textTransform: "capitalize",
  fontSize: "14px",
  "&:hover": {
    backgroundColor: "secondary.dark",
  },
  ml: "5px",
  padding: "6px 10px",
};
