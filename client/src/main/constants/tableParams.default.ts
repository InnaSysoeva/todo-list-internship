import { SortOrder } from "../enums/sortOrder.enum";
import { TableParams } from "../types/tableParams.type";

export const defaultTableParams: TableParams = {
  page: 1,
  sort: { field: "", order: SortOrder.None },
  filter: "",
};
