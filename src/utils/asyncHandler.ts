import type { Request, Response, NextFunction } from "express";

/**
 * A utility function to handle asynchronous middleware and route handlers.
 *
 * @param requestHandler - The asynchronous function to handle the request.
 * @returns A function that wraps the asynchronous handler with error handling.
 */
const asyncHandler = (
  requestHandler: (
    req: Request,
    res: Response,
    next: NextFunction
  ) => Promise<void>
) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    Promise.resolve(requestHandler(req, res, next)).catch((err) => next(err));
  };
};

export { asyncHandler };
