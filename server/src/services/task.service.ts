import { TaskModel } from "@models/task.model";

export const createTaskService = async (task: any) => {
  const newTask = new TaskModel(task);
  await newTask.save();
  return newTask;
};
