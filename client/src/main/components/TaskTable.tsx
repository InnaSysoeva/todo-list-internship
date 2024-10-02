import React from 'react'
import {Table, TableBody, TableRow, TableCell, TableHead, TableContainer, Paper, Box, Tab, Tabs, Typography} from '@mui/material'
import { CustomPagination } from './CustomPagination'

export const TaskTable = () => {
  return (
    <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
        sx={{ marginLeft: 25, marginRight: 25, marginTop: 5 }}>
      <Box sx={{ width: '100%'}}>
        <Tabs variant="fullWidth"  sx={{ flexGrow: 1}}>
          <Tab label="Filter Tabs Section" />
        </Tabs>
      </Box>
    <TableContainer component={Paper}>
      <Table sx={{ height: 400}}>
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
    <CustomPagination/>
  </Box>
  )
}
