// ./src/utils/errors.ts

class AppError extends Error {
  static errorName = "App Error";
  status: number;

  constructor(
    message: string,
    status: number = 500,
    options: ErrorOptions = {}
  ) {
    super(message, options);
    this.name =
      (this.constructor as typeof AppError).errorName || this.constructor.name;
    this.status = status;
    Error.captureStackTrace?.(this, this.constructor);
  }
}

class DatabaseError extends AppError {
  static errorName = "Database Error";

  constructor(
    message: string = "Database Error",
    { status = 500, cause = null }: { status?: number; cause?: unknown } = {}
  ) {
    super(message, status, cause ? { cause } : undefined);
  }
}

class NotFoundError extends AppError {
  static errorName = "Not Found";

  constructor(
    message: string = "Not Found",
    { status = 404, cause = null }: { status?: number; cause?: unknown } = {}
  ) {
    super(message, status, cause ? { cause } : undefined);
  }
}

class BadRequestError extends AppError {
  static errorName = "Bad Request";
  details?: unknown;

  constructor(
    message: string = "Bad Request",
    {
      status = 400,
      details,
      cause = null,
    }: { status?: number; details?: unknown; cause?: unknown } = {}
  ) {
    super(message, status, cause ? { cause } : undefined);
    if (details) {
      this.details = details;
    }
  }
}

export { AppError, DatabaseError, NotFoundError, BadRequestError };
