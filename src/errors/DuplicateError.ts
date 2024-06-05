// src/errors/DuplicateError.ts

export class DuplicateError extends Error {
  public statusCode: number;

  constructor(message: string) {
    super(message);
    this.name = 'DuplicateError';
    this.statusCode = 409; // Conflict status code
    Error.captureStackTrace(this, this.constructor);
  }
}
