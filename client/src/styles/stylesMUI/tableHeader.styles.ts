import { SxProps } from "@mui/material/styles";

export const tableHeaderStyles: SxProps = {
  textAlign: "center",
  fontSize: "14px",
  position: "relative",
  whiteSpace: "nowrap",
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
};
