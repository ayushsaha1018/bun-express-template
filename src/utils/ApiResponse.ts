class ApiResponse<T> {
  public statusCode: number;
  public data: T;
  public message: string;
  public success: boolean;

  /**
   * @param statusCode - HTTP status code for the response.
   * @param data - The data to be sent in the response.
   * @param message - A message describing the response.
   */
  constructor(statusCode: number, data: T, message: string = "Success") {
    this.statusCode = statusCode;
    this.data = data;
    this.message = message;
    this.success = statusCode < 400;
  }
}

export { ApiResponse };
