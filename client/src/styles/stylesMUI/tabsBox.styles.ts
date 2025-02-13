import { SxProps } from "@mui/material";

export const tabsBoxStyles: SxProps = {
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  width: "100%",
  gap: "10px",
  "@media (max-width: 1230px)": {
    marginBottom: "5px",
    flexDirection: "column",
    justifyContent: "center",
    gap: "0px",
  },
};
