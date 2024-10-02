import React from "react";
import { OverviewPage } from "./main/pages/OverviewPage";
import "./styles/App.css";
import { mainTheme } from "./styles/mainTheme";
import { ThemeProvider } from "@mui/material";

function App() {
  return (
    <ThemeProvider theme={mainTheme}>
      <OverviewPage />
    </ThemeProvider>
  );
}

export default App;
