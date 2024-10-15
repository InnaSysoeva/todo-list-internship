import React from "react";
import { Header } from "../components/Header";
import { TaskTable } from "../components/TaskTable";
import { CustomDialog } from "../components/CustomDialog/CustomDialog";
import { Box } from "@mui/material";

export const OverviewPage = () => {
  return (
    <Box
      sx={{
        position: "relative",
      }}
    >
      <Header />
      <TaskTable />
      <CustomDialog />
    </Box>
  );
};
