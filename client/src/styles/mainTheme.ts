import { createTheme } from "@mui/material";

export const mainTheme = createTheme({
  palette: {
    primary: {
      main: "#CCA2E5",
      dark: "#8800a3",
    },
    secondary: {
      main: "#F2F2F0",
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    fontSize: 14,
  },
});
