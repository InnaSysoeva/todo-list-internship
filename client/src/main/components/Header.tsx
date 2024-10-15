import React from "react";
import { AppBar, Toolbar, Box, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

export const Header = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar sx={{ height: 40 }} color="primary">
          <MenuIcon sx={{ mr: 3 }} />
          <Typography variant="h5"></Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
};
