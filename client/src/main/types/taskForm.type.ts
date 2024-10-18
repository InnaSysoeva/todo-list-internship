import { PriorityEnum } from "../enums/priority.enum";

export type TaskFormType = {
  title: string;
  description: string;
  dateStart: string;
  dateEnd: string;
  priority: PriorityEnum;
};
