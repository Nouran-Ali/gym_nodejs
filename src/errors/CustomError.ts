export interface ErrorObject {
  [key: string]: string;
}

export class CustomError extends Error {
  public errors: ErrorObject;
  public statusCode: number;

  constructor(errors: ErrorObject, statusCode: number) {
    const message = Object.values(errors).join(', ');
    super(message);
    this.name = this.constructor.name;
    this.errors = errors;
    this.statusCode = statusCode;
    Error.captureStackTrace(this, this.constructor);
  }
}
