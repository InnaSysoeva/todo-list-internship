import { SxProps } from "@mui/material";

export const buttonBoxStyles: SxProps = {
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
  gap: "20px",
  "@media (max-width: 1230px)": {
    justifyContent: "center",
    marginBottom: "5px",
    marginTop: "5px",
  },
};
