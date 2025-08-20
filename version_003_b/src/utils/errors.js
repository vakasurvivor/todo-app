// ./src/utils/errors.js

class AppError extends Error {
  constructor(message, status = 500, options = {}) {
    super(message, options);
    this.name = this.constructor.name;
    this.status = status;
    Error.captureStackTrace(this, this.constructor);
  }
}

class DatabaseError extends AppError {
  constructor(message = "Database Error", { status = 500, cause = null } = {}) {
    super(message, status, cause ? { cause } : undefined);
  }
}

class NotFoundError extends AppError {
  constructor(message = "Not Found", { status = 404, cause = null } = {}) {
    super(message, status, cause ? { cause } : undefined);
  }
}

class BadRequestError extends AppError {
  constructor(message = "Bad Request", { status = 400, cause = null } = {}) {
    super(message, status, cause ? { cause } : undefined);
  }
}

export { AppError, DatabaseError, NotFoundError, BadRequestError };
