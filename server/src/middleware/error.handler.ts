import { Request, Response, NextFunction } from "express";
export const ErrorHandler = (
  error: any,
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  const defaultStatusCode = 500;
  const statusCode = error.status || defaultStatusCode;
  return response.status(statusCode).json({
    message: error.message || "Internal Server Error",
    details: error.details,
  });
};
