import { Request, Response, NextFunction } from "express";
import { createTaskService, updateTaskService } from "@services/task.service";
import { createError } from "@utils/error.utils";
import { validateTask } from "@utils/validation.utils";

export const createTask = async (
  request: Request,
  result: Response,
  next: NextFunction,
) => {
  validateTask(request.body, next)
  try {
    const newTask = await createTaskService(request.body);
    result.status(200).json(newTask);
  } catch (error) {
    if (error instanceof Error) {
      return next(createError(400, "Error creating task", error.message));
    }
  }
};

export const updateTask = async (
  request: Request,
  result: Response,
  next: NextFunction,
) => {
  validateTask(request.body, next)
  try {
    const taskId = request.params.id;
    const updatedTask = await updateTaskService(taskId, request.body);
    result.status(200).json(updatedTask);
  } catch (error) {
    if (error instanceof Error) {
      return next(createError(400, "Error updating task", error.message));
    }
  }
};
