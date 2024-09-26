import { Request, Response } from "express";
import { TaskModel } from "@models/task.model";
import { createTaskService } from "@services/task.service";
import { validateTask } from "@validators/task.validator";

export const createTask = async (request: Request, result: Response) => {
  const { error } = validateTask(request.body);
  if (error) {
    return result
      .status(400)
      .json({ message: "Validation error", details: error.details });
  }

  try {
    const newTask = await createTaskService(request.body);
    result.status(200).json(newTask);
  } catch (error) {
    result.status(400).json({ message: "Error creating task", error });
  }
};
