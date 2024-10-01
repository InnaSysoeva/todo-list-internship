import React from 'react'
import {AppBar, Toolbar, Typography } from '@mui/material'

export const Header = () => {
  return (
    <AppBar position="static">
      <Toolbar sx={{height: 90}}>
        <Typography variant="h6" component="div">
          Header
        </Typography>
      </Toolbar>
    </AppBar>
  )
}
