import React from "react";
import { AppBar, Toolbar, Typography, Box, Fab } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

export const Header = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar sx={{ height: 90 }} color="primary">
          <MenuIcon sx={{ mr: 3 }} />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            DoDo
          </Typography>
          <Typography variant="h6" component="div">
            Header Section
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
};
