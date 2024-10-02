import React from "react";
import {
  Table,
  TableBody,
  TableRow,
  TableCell,
  TableHead,
  TableContainer,
  Paper,
  Box,
  Tab,
  Tabs,
  Typography,
  Fab,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { CustomPagination } from "./CustomPagination";

export const TaskTable = () => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
      sx={{
        marginLeft: 25,
        marginRight: 25,
        marginTop: 4,
        position: "relative",
      }}
    >
      <Box sx={{ width: "100%" }}>
        <Tabs variant="fullWidth" sx={{ flexGrow: 1 }}>
          <Tab
            label="All"
            sx={{ borderBottom: 3, borderColor: "primary.dark" }}
          />
          <Tab label="Active" />
          <Tab label="In Progress" />
          <Tab label="Done" />
        </Tabs>
      </Box>
      <TableContainer component={Paper}>
        <Table sx={{ height: 480, backgroundColor: "secondary.main" }}>
          <TableHead>
            <TableRow>
              <Typography>Task Section</Typography>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <CustomPagination />
      <Fab
        sx={{
          backgroundColor: "primary.dark",
          color: "white",
          position: "absolute",
          bottom: 20,
          right: -130,
          "&:hover": {
            backgroundColor: "primary.main",
          },
        }}
      >
        <AddIcon />
      </Fab>
    </Box>
  );
};
