import { Request, Response, NextFunction } from "express";
import { createTaskService } from "@services/task.service";
import { validateTask } from "@validators/task.validator";
import { createError } from "@utils/error.utils";

export const createTask = async (
  request: Request,
  result: Response,
  next: NextFunction,
) => {
  const { error } = validateTask(request.body);
  if (error) {
    return next(createError(400, "Validation error", error.details));
  }

  try {
    const newTask = await createTaskService(request.body);
    result.status(200).json(newTask);
  } catch (error) {
    if (error instanceof Error) {
      return next(createError(400, "Error creating task", error.message));
    }
  }
};
