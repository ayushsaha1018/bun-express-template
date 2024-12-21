import { errorHandler } from "@/middlewares/error.middleware";

/**
 * @description Common Error class to throw an error from anywhere.
 * The {@link errorHandler} middleware will catch this error at the central place and return an appropriate response to the client.
 */
class ApiError extends Error {
  public statusCode: number;
  public data: any | null;
  public success: boolean;
  public errors: any[];
  public stack?: string;

  /**
   * @param statusCode - The HTTP status code.
   * @param message - The error message (default: "Something went wrong").
   * @param errors - Additional error details (default: empty array).
   * @param stack - The stack trace of the error (optional).
   */
  constructor(
    statusCode: number,
    message: string = "Something went wrong",
    errors: any[] = [],
    stack: string = ""
  ) {
    super(message);
    this.statusCode = statusCode;
    this.data = null;
    this.message = message;
    this.success = false;
    this.errors = errors;

    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export { ApiError };
