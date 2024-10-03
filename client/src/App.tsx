import React from "react";
import { OverviewPage } from "./main/pages/OverviewPage";
import "./styles/App.css";
import { mainTheme } from "./styles/mainTheme";
import { ThemeProvider } from "@mui/material";
import { CustomDialogProvider } from "./main/components/CustomDialog/CustomDialogProvider";

function App() {
  return (
    <ThemeProvider theme={mainTheme}>
      <CustomDialogProvider>
        <OverviewPage />
      </CustomDialogProvider>
    </ThemeProvider>
  );
}

export default App;
