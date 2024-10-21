import { SortOrder } from "../enums/sortOrder.enum";
import { TableParams } from "../types/tableParams.type";
import { firstPage } from "./firstPage.default";

export const defaultTableParams: TableParams = {
  page: firstPage,
  sort: { field: "", order: SortOrder.None },
  //filter: "",
  filter: undefined,
};
