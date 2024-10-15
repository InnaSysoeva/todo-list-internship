import { SxProps } from "@mui/material/styles";

export const tabStyles: SxProps = {
  borderBottom: 3,
  backgroundColor: "white",
  color: "black",
  borderColor: "primary.main",
  "&.Mui-selected": {
    color: "black",
    backgroundColor: "secondary.main",
  },
  textTransform: "none",
};
