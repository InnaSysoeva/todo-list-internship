import { Request, Response, NextFunction } from "express";
import {
  createTaskService,
  deleteTaskService,
  getAllTasksService,
  updateTaskService,
} from "@services/task.service";
import { validateTask } from "@utils/validation.utils";
import errorMessages from "@utils/error.messages";
import { createError } from "@utils/error.utils";

export const createTask = async (
  request: Request,
  result: Response,
  next: NextFunction,
) => {
  const isValid = validateTask(request.body, next);
  if (!isValid) return;

  try {
    const newTask = await createTaskService(request.body);
    result.status(200).json(newTask);
  } catch (error) {
    if (error instanceof Error) {
      return next(
        createError(500, errorMessages.creation("Task"), {
          details: error.message,
        }),
      );
    }
  }
};

export const updateTask = async (
  request: Request,
  result: Response,
  next: NextFunction,
) => {
  const isValid = validateTask(request.body, next);
  if (!isValid) return;

  try {
    const taskId = request.params.id;
    const updatedTask = await updateTaskService(taskId, request.body);
    if (!updatedTask) {
      return next(
        createError(401, errorMessages.update("Task"), {
          details: "Id Not Found",
        }),
      );
    }
    result.status(200).json(updatedTask);
  } catch (error) {
    if (error instanceof Error) {
      return next(
        createError(500, errorMessages.update("Task"), {
          details: error.message,
        }),
      );
    }
  }
};

export const deleteTask = async (
  request: Request,
  result: Response,
  next: NextFunction,
) => {
  try {
    const taskId = request.params.id;
    const deletedTask = await deleteTaskService(taskId);
    if (!deletedTask) {
      return next(
        createError(401, errorMessages.deletion("Task"), {
          details: "Id Not Found",
        }),
      );
    }
    result.status(200).json(deletedTask);
  } catch (error) {
    if (error instanceof Error) {
      return next(
        createError(500, errorMessages.deletion("Task"), {
          details: error.message,
        }),
      );
    }
  }
};

export const getAllTasks = async (
  request: Request,
  result: Response,
  next: NextFunction,
) => {
  try {
    const allTasks = await getAllTasksService();
    result.status(200).json(allTasks);
  } catch (error) {
    if (error instanceof Error) {
      return next(
        createError(500, errorMessages.notFound("Task"), {
          details: error.message,
        }),
      );
    }
  }
};
