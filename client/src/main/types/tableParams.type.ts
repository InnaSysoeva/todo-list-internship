import { SortType } from "./sort.type";
import { StateEnum } from "../enums/state.enum";

export type TableParams = Partial<{
  page?: number;
  sort?: SortType;
  filter?: StateEnum;
  search?: string;
}>;
