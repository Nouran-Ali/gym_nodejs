// src/middlewares/errorHandler.ts

import { Request, Response, NextFunction } from 'express';
import { CustomError } from '../errors/CustomError';
import { DuplicateError } from '../errors/DuplicateError';
import { ForbiddenError } from '../errors/ForbiddenError';
import { InternalServerError } from '../errors/InternalServerError';
import { NotFoundError } from '../errors/NotFoundError';
import { UnauthorizedError } from '../errors/UnauthorizedError';

export function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (err instanceof CustomError) {
    res.status(err.statusCode).json({ error: err.message });
  } else if (err instanceof DuplicateError) {
    res
      .status(err.statusCode)
      .json({ error: err.message, errorCode: 'DUPLICATE_ERROR' });
  } else if (err instanceof ForbiddenError) {
    res
      .status(err.statusCode)
      .json({ error: err.message, errorCode: 'FORBIDDEN_ERROR' });
  } else if (err instanceof InternalServerError) {
    res
      .status(err.statusCode)
      .json({ error: err.message, errorCode: 'INTERNAL_SERVER_ERROR' });
  } else if (err instanceof NotFoundError) {
    res
      .status(err.statusCode)
      .json({ error: err.message, errorCode: 'NOT_FOUND_ERROR' });
  } else if (err instanceof UnauthorizedError) {
    res
      .status(err.statusCode)
      .json({ error: err.message, errorCode: 'UNAUTHORIZED_ERROR' });
  } else {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
