import { Request, Response, NextFunction } from "express";
import { createTaskService } from "@services/task.service";
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
      return next(createError(500, errorMessages.creation('Task'), {details: error.message}));
    }
  }
};
