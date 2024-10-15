import { Request, Response, NextFunction } from "express";
import {
  createTaskService,
  deleteTaskService,
  getAllTasksService,
  getPagesCountService,
  getTaskByIdService,
  getTasksByPageService,
  updateTaskService,
  updateTaskStateService,
} from "@services/task.service";
import { validateTask } from "@utils/validation.utils";
import errorMessages from "@utils/error.messages";
import { createError } from "@utils/error.utils";
import { SortType } from "types/sort.type";
import { TaskStateEnum } from "@models/task.model";

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
        createError(401, errorMessages.notFound("Id"), {
          details: errorMessages.notFound("Id"),
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
        createError(401, errorMessages.notFound("Id"), {
          details: errorMessages.notFound("Id"),
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

export const getTaskById = async (
  request: Request,
  result: Response,
  next: NextFunction,
) => {
  try {
    const taskId = request.params.id;
    const task = await getTaskByIdService(taskId);
    if (!task) {
      return next(
        createError(401, errorMessages.notFound("Id"), {
          details: errorMessages.notFound("Id"),
        }),
      );
    }
    result.status(200).json(task);
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

export const updateTaskState = async (
  request: Request,
  result: Response,
  next: NextFunction,
) => {
  try {
    const taskId = request.params.id;
    const { state } = request.body;
    const updatedTask = await updateTaskStateService(taskId, state);
    if (!updatedTask) {
      return next(
        createError(401, errorMessages.notFound("Id"), {
          details: errorMessages.notFound("Id"),
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

export const getTasksByPage = async (
  request: Request,
  result: Response,
  next: NextFunction,
) => {
  try {
    const limit = parseInt(request.params.limit);
    const tableParams = {
      page: parseInt(request.query.page as string),
      filter: parseInt(request.query.filter as string),
      sort: request.query.sort as SortType,
      search: request.query.search as string,
    };
    const tasks = await getTasksByPageService(tableParams, limit);
    result.status(200).json(tasks);
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

export const getPagesCount = async (
  request: Request,
  result: Response,
  next: NextFunction,
) => {
  try {
    const pagesCount = await getPagesCountService();
    result.status(200).json(pagesCount);
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
