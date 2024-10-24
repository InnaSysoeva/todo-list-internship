import { SxProps } from "@mui/material/styles";

export const tableHeaderStyles: SxProps = {
  textAlign: "center",
  fontSize: "14px",
  position: "relative",
  whiteSpace: "nowrap",
  padding: "8px",
  "&:not(:last-child)": {
    "::after": {
      content: '""',
      position: "absolute",
      top: "50%",
      right: 0,
      transform: "translateY(-50%)",
      height: "50%",
      width: "1px",
      backgroundColor: "rgba(224, 224, 224, 1)",
    },
  },
  "@media (max-width: 900px)": {
    mr: "0px",
    ml: "0px",
    pl: "2px",
    pr: "2px",
  },
};
