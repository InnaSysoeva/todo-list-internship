import { SxProps } from "@mui/material";

export const fabStyles: SxProps = {
  backgroundColor: "primary.dark",
  color: "white",
  position: "absolute",
  bottom: 20,
  right: -100,
  "&:hover": {
    backgroundColor: "secondary.dark",
  },
};
