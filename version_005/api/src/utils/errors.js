// ./src/utils/errors.js

class AppError extends Error {
  static errorName = "App Error";
  constructor(message, status = 500, options = {}) {
    super(message, options);
    this.name = this.constructor.errorName || this.constructor.name;
    this.status = status;
    Error.captureStackTrace(this, this.constructor);
  }
}

class DatabaseError extends AppError {
  static errorName = "Database Error";
  constructor(message = "Database Error", { status = 500, cause = null } = {}) {
    super(message, status, cause ? { cause } : undefined);
  }
}

class NotFoundError extends AppError {
  static errorName = "Not Found";
  constructor(message = "Not Found", { status = 404, cause = null } = {}) {
    super(message, status, cause ? { cause } : undefined);
  }
}

class BadRequestError extends AppError {
  static errorName = "Bad Request";
  constructor(
    message = "Bad Request",
    { status = 400, details, cause = null } = {}
  ) {
    super(message, status, cause ? { cause } : undefined);
    if (details) {
      this.details = details;
    }
  }
}

export { AppError, DatabaseError, NotFoundError, BadRequestError };
