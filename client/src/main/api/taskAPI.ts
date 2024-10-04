import { $host } from "./index";

export const getAllTasks = async () => {
  const allTasks = await $host.get("all");
  return allTasks;
};

export const createTask = async (task: object) => {
  const newTask = await $host.post("", task);
  return newTask;
};

export const updateTask = async (taskId: string, task: object) => {
  const updatedTask = await $host.put(`${taskId}`, task);
  return updatedTask;
};

export const deleteTask = async (taskId: string) => {
  const deletedTask = await $host.delete(`${taskId}`);
  return deletedTask;
};

export const getTaskById = async (taskId: string) => {
  const task = await $host.get(`${taskId}`);
  return task;
};

export const updateTaskState = async (taskId: string, taskState: Number) => {
  const task = await $host.patch(`${taskId}`, taskState);
  return task;
};
