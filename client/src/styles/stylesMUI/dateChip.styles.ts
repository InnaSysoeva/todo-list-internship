import { SxProps } from "@mui/material";

export const dateChipStyles: SxProps = {
  color: "black",
  backgroundColor: "primary.light",
  "@media (max-width: 900px)": {
    fontSize: "12px",
    "& .MuiChip-label": { padding: "5px" },
  },
};
