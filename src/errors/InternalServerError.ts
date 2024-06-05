// src/errors/InternalServerError.ts
export class InternalServerError extends Error {
  public statusCode: number;

  constructor(message: string = 'Internal Server Error') {
    super(message);
    this.name = 'InternalServerError';
    this.statusCode = 500;
    Error.captureStackTrace(this, this.constructor);
  }
}
