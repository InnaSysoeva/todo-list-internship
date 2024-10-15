import { createTheme } from "@mui/material";

export const mainTheme = createTheme({
  palette: {
    primary: {
      main: "#F2E0FD",
      dark: "#9852A6",
      light: "#DECBE9",
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
