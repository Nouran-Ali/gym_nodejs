// src/errors/CustomValidationError.ts

import { ValidationErrorItem } from 'joi';

export class CustomValidationError extends Error {
  public errors: Record<string, string>;
  public statusCode: number;

  constructor(validationErrors: ValidationErrorItem[]) {
    const errors: Record<string, string> = {};
    validationErrors.forEach((error) => {
      const key = error.context?.key ?? '';
      errors[key] = error.message;
    });
    const errorMessage = JSON.stringify(errors);
    super(errorMessage);
    this.name = this.constructor.name;
    this.errors = errors;
    this.statusCode = 400;
    Error.captureStackTrace(this, this.constructor);
  }
}
