import { createTheme } from "@mui/material";

export const mainTheme = createTheme({
  palette: {
    primary: {
      main: "#CCA2E5",
      dark: "#8800a3",
    },
    secondary: {
      main: "#F7F7F7",
      dark: "#4C0058",
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    fontSize: 14,
  },
});
