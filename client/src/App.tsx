import React from "react";
import { OverviewPage } from "./main/pages/OverviewPage";
import { mainTheme } from "./styles/mainTheme";
import { ThemeProvider } from "@mui/material";
import "./styles/App.css";

function App() {
  return (
    <ThemeProvider theme={mainTheme}>
      <OverviewPage />
    </ThemeProvider>
  );
}

export default App;
