import React from "react";
import { Pagination, Stack } from "@mui/material";

export const CustomPagination = () => {
  return (
    <Stack spacing={2} sx={{ marginTop: 3 }}>
      <Pagination
        count={10}
        sx={{
          "& .Mui-selected": {
            backgroundColor: "primary.main",
            color: "white",
          },
          "& .MuiPaginationItem-root": {
            color: "primary.dark",
            fontSize: "0.9rem",
          },
        }}
      />
    </Stack>
  );
};
