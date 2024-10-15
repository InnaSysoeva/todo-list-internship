import { StateEnum } from "../enums/state.enum";

export type TaskType = {
  id: string;
  title: string;
  description: string;
  priority: number;
  dateStart: string;
  dateEnd: string;
  state: StateEnum;
};
