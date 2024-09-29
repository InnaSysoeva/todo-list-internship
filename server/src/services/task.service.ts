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

export const deleteTaskService = async (taskId: string) => {
  const deletedTask = await TaskModel.findByIdAndDelete(taskId);
  return deletedTask;
};

export const getAllTasksService = async () => {
  const allTasks = await TaskModel.find();
  return allTasks;
};
