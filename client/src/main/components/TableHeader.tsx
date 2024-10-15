import React, { useState } from "react";
import { TableCell, TableSortLabel, Tooltip } from "@mui/material";
import { tableHeaderStyles } from "../../styles/stylesMUI/tableHeader.styles";

interface Header {
  label: string;
  sortable: boolean;
}

export const TableHeader: React.FC = () => {
  const headers: Header[] = [
    { label: "More", sortable: false },
    { label: "Task", sortable: false },
    { label: "State", sortable: true },
    { label: "Date Start", sortable: true },
    { label: "Date End", sortable: true },
    { label: "Actions", sortable: false },
  ];

  const ascendingSort = "asc";
  const descendingSort = "desc";

  const [order, setOrder] = useState<{ [key: string]: "asc" | "desc" | null }>({
    "Date Start": null,
    "Date End": null,
    State: null,
  });

  const handleSortClick = (header: string): void => {
    setOrder((prevOrder) => {
      const currentOrder = prevOrder[header];
      const nextOrder =
        currentOrder === ascendingSort
          ? descendingSort
          : currentOrder === descendingSort
            ? null
            : ascendingSort;
      return { ...prevOrder, [header]: nextOrder };
    });
  };

  return (
    <>
      {headers.map((header) => (
        <TableCell key={header.label} sx={tableHeaderStyles}>
          {header.sortable ? (
            <Tooltip title="Sort">
              <TableSortLabel
                active={order[header.label] !== null}
                direction={order[header.label] || ascendingSort}
                onClick={() => handleSortClick(header.label)}
                sx={{ ml: 3 }}
              >
                {header.label}
              </TableSortLabel>
            </Tooltip>
          ) : (
            header.label
          )}
        </TableCell>
      ))}
    </>
  );
};
