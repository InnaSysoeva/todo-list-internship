import { taskValidator } from "@validators/task.validator";
import { NextFunction } from "express";
import errorMessages from "@utils/error.messages";
import { createError } from "./error.utils";

export const validateTask = (task: any, next: NextFunction) => {
    const { error } = taskValidator(task);
    if (error instanceof Error) {
        next(createError(400, errorMessages.validation('Task'), {details: error.details}));
        return false;
    } else {
        return true;
    }
};