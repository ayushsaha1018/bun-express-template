import type { Request, Response, NextFunction } from "express";
import { ApiResponse } from "@/utils/ApiResponse";
import { asyncHandler } from "@/utils/asyncHandler";

/**
 * Healthcheck endpoint to check the server's status.
 * Wrapped with asyncHandler for error handling.
 */
const healthcheck = asyncHandler(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    res.status(200).json(new ApiResponse(200, "OK", "Health check passed"));
  }
);

export { healthcheck };
