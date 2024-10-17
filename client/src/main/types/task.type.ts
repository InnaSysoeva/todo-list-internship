import { StateEnum } from "../enums/state.enum";

export type TaskType = {
  _id: string;
  title: string;
  description: string;
  priority: number;
  dateStart: string;
  dateEnd: string;
  state: StateEnum;
};
