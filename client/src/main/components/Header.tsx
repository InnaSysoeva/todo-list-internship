import React from "react";
import { AppBar, Toolbar, Box, Typography } from "@mui/material";

export const Header = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar sx={{ height: 40, backgroundColor: "primary.light" }}>
          <Typography
            sx={{ ml: "40px", fontSize: "35px", color: "secondary.dark" }}
          >
            dodo
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
};
