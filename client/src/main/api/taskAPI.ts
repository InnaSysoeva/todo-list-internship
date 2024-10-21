import { $host } from "./index";
import { AxiosResponse } from "axios";
import { TaskType } from "../types/task.type";

interface TasksByPageResponse {
  tasks: TaskType[];
  totalDocuments: number;
}

export const getAllTasks = async (): Promise<AxiosResponse<TaskType>> => {
  return await $host.get("/");
};

export const createTask = async (
  task: object,
): Promise<AxiosResponse<TaskType>> => {
  return await $host.post("/", task);
};

export const updateTask = async (
  taskId: string,
  task: object,
): Promise<AxiosResponse<TaskType>> => {
  return await $host.put(`/${taskId}`, task);
};

export const deleteTask = async (
  taskId: string,
): Promise<AxiosResponse<TaskType>> => {
  return await $host.delete(`/${taskId}`);
};

export const getTaskById = async (
  taskId: string,
): Promise<AxiosResponse<TaskType>> => {
  return await $host.get(`/${taskId}`);
};

export const updateTaskState = async (
  taskId: string,
  taskState: number,
): Promise<AxiosResponse<TaskType>> => {
  return await $host.patch(`/${taskId}`, { state: taskState });
};

export const getTasksByPage = async (
  tableParams: object,
  limit: number,
): Promise<AxiosResponse<TasksByPageResponse>> => {
  return await $host.get(`/sort/${limit}`, { params: tableParams });
};
