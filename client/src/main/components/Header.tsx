import React from "react";
import { AppBar, Toolbar, Box, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

export const Header = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar sx={{ height: 40 }} color="primary">
          <Typography sx={{ml: "50px", fontSize: "35px"}}></Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
};
