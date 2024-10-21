import React, { useState } from "react";
import { Pagination, Stack } from "@mui/material";
import { firstPage } from "../constants/firstPage.default";

interface CustomPaginationProps {
  pageCount: number;
  onPageChange: (page: number) => void;
}

export const CustomPagination: React.FC<CustomPaginationProps> = ({
  pageCount,
  onPageChange,
}) => {
  const [page, setPage] = useState<number>(firstPage);

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number,
  ): void => {
    setPage(value);
    onPageChange(value);
  };

  return (
    <Stack spacing={2} sx={{ marginTop: 3 }}>
      <Pagination
        count={pageCount}
        page={page}
        onChange={handlePageChange}
        sx={{
          "& .MuiPaginationItem-root": {
            color: "black",
            fontSize: "15px",
          },
        }}
      />
    </Stack>
  );
};
