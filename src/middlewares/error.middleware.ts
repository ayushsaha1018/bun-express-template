import mongoose from "mongoose";
import type { Request, Response, NextFunction } from "express";

import logger from "@/logger/winston.logger";
import { ApiError } from "../utils/ApiError";
import { asyncHandler } from "@/utils/asyncHandler";

/**
 * Error handling middleware to catch and process errors.
 *
 * @param err - The error object, which could be an instance of `Error` or `ApiError`.
 * @param req - The Express request object.
 * @param res - The Express response object.
 * @param next - The Express next function.
 *
 * @description This middleware catches errors from any request handler wrapped inside the {@link asyncHandler}.
 */
const errorHandler = (
  err: Error | ApiError,
  req: Request,
  res: Response,
  next: NextFunction
): Response => {
  let error = err;

  // Check if the error is an instance of the ApiError class which extends the native Error class
  if (!(error instanceof ApiError)) {
    // If not, create a new ApiError instance to maintain consistency

    // Assign an appropriate status code
    const statusCode =
      (error as any).statusCode || error instanceof mongoose.Error ? 400 : 500;

    // Set a message from the native Error instance or use a custom one
    const message = error.message || "Something went wrong";
    error = new ApiError(
      statusCode,
      message,
      (error as any)?.errors || [],
      err.stack
    );
  }

  // Now we are sure that the `error` variable is an instance of ApiError
  const response = {
    ...error,
    message: error.message,
    ...(process.env.NODE_ENV === "development" ? { stack: error.stack } : {}), // Show stack trace in development mode
  };

  logger.error(`${error.message}`);

  // Send error response
  return res.status((error as ApiError).statusCode).json(response);
};

export { errorHandler };
