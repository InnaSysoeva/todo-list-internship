import React from 'react'
import { Pagination, Stack, Typography } from '@mui/material'

export const CustomPagination = () => {
  return (
    <Stack spacing={2}>
      <Typography>Pagination Section</Typography>
      <Pagination count={10} />
    </Stack>
  )
}
