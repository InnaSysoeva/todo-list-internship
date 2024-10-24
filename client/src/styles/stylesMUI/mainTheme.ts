import { createTheme } from "@mui/material";

export const mainTheme = createTheme({
  palette: {
    primary: {
      main: "#9852A6",
      dark: "#9852A6",
      light: "#F2E0FD",
    },
    secondary: {
      main: "#FFFFFF",
      dark: "#4C0058",
      light: "#E3D7EB",
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    fontSize: 14,
  },
});
