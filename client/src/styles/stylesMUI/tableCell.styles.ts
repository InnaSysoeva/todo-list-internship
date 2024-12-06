import { SxProps } from "@mui/material";

export const tableCellStyles: SxProps = {
  borderBottom: "none",
  borderTop: "0.1px solid",
  borderColor: "rgba(224, 224, 224, 1)",
  padding: "8px",
  textAlign: "center",
  "@media (max-width: 900px)": {
    pl: "2px",
    pr: "2px",
  },
};

export const cellWidths = ["600px", "30px", "30px", "80px", "10px"];
