// src/middlewares/validateSchema.ts

import { Request, Response, NextFunction } from 'express';
import { Schema } from 'joi';
import { ErrorObject } from '../errors/CustomError';

export function validateSchema(schema: Schema) {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body, { abortEarly: false });
    if (error) {
      const errorObject: ErrorObject = {};
      if (error.details) {
        error.details.forEach((detail) => {
          errorObject[detail.path.join('.')] = detail.message;
        });
      }
      res.status(400).json({ error: 'Validation Error', details: errorObject });
    } else {
      next();
    }
  };
}
