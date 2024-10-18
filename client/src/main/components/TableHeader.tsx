import React, { useState } from "react";
import { TableCell, TableSortLabel, Tooltip } from "@mui/material";
import { tableHeaderStyles } from "../../styles/stylesMUI/tableHeader.styles";
import { headers } from "../constants/headers";
import { SortOrder } from "../enums/sortOrder.enum";
import { fieldMapping } from "../constants/fieldMapping";
import { SortType } from "../types/sort.type";

interface TableHeaderProps {
  onSortClicked: (sortModel: SortType) => void;
}

interface Header {
  label: string;
  sortable: boolean;
}

export const TableHeader: React.FC<TableHeaderProps> = ({ onSortClicked }) => {
  const createInitialOrder = (headers: Header[]): { [key: string]: SortOrder } => {
    return headers.reduce((acc, header) => {
      if (header.sortable) {
        acc[header.label] = SortOrder.None;
      }
      return acc;
    }, {} as { [key: string]: SortOrder });
  };

  const [order, setOrder] = useState<{ [key: string]: SortOrder }>(
    createInitialOrder(headers)
  );

  const handleSortClick = (header: string): void => {
    setOrder((prevOrder) => {
      const currentOrder = prevOrder[header];
      const nextOrder =
        currentOrder === SortOrder.Ascending
          ? SortOrder.Descending
          : currentOrder === SortOrder.Descending
            ? SortOrder.None
            : SortOrder.Ascending;

      const fieldInDataBase = fieldMapping[header];
      onSortClicked({ field: fieldInDataBase, order: nextOrder });

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
                active={order[header.label] !== SortOrder.None}
                direction={
                  order[header.label] === SortOrder.Ascending
                    ? "asc"
                    : order[header.label] === SortOrder.Descending
                      ? "desc"
                      : undefined
                }
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
