import { TaskModel } from "@models/task.model";

export const createTaskService = async (task: any) => {
  const newTask = new TaskModel(task);
  await newTask.save();
  return newTask;
};

export const updateTaskService = async (taskId: string, task: any) => {
  const updatedTask = await TaskModel.findByIdAndUpdate(taskId, task, {
    new: true,
  });
  return updatedTask;
};
