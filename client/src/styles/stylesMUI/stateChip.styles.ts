import { SxProps } from "@mui/material";

export const stateChipStyles: SxProps = {
  width: "75px",
  fontSize: "13px",
  borderWidth: "2px",
  "& .MuiChip-label": { padding: "0px" },
  "@media (max-width: 900px)": {
    fontSize: "12px",
    width: "60px",
  },
};
