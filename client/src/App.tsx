import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { OverviewPage } from "./main/pages/OverviewPage";
import { mainTheme } from "./styles/stylesMUI/mainTheme";
import { ThemeProvider } from "@mui/material";
import { CustomDialogProvider } from "./main/components/CustomDialog/CustomDialogProvider";
import { CustomToastProvider } from "./main/components/CustomToast/CustomToastProvider";
import { ConfirmationDialogProvider } from "./main/components/ConfirmationDialog/ConfirmationDialogProvider";
import "./styles/App.css";

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider theme={mainTheme}>
        <CustomDialogProvider>
          <ConfirmationDialogProvider>
            <CustomToastProvider>
              <Routes>
                <Route path="/" element={<OverviewPage />} />
                <Route path="/new" element={<OverviewPage />} />
                <Route path="/:id" element={<OverviewPage />} />
              </Routes>
            </CustomToastProvider>
          </ConfirmationDialogProvider>
        </CustomDialogProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
