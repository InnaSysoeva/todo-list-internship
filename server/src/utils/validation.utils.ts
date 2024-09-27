import { createError } from "./error.utils";
import { taskValidator } from "@validators/task.validator";
import { NextFunction } from "express";

export const validateTask = (task: any, next: NextFunction) => {
    const { error } = taskValidator(task);
    if (error) {
        return next(createError(400, "Validation error", error.details));
    }
};