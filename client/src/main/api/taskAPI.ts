import { $host } from "./index";

export const getAllTasks = async () => {
  return await $host.get("/");
};

export const createTask = async (task: object) => {
  return await $host.post("/", task);
};

export const updateTask = async (taskId: string, task: object) => {
  return await $host.put(`/${taskId}`, task);
};

export const deleteTask = async (taskId: string) => {
  return await $host.delete(`/${taskId}`);
};

export const getTaskById = async (taskId: string) => {
  return await $host.get(`/${taskId}`);
};

export const updateTaskState = async (taskId: string, taskState: number) => {
  return await $host.patch(`/${taskId}`, { state: taskState });
};
