// src/dtos/coach.dto.ts
import Joi from 'joi';

export const getFileSchema = Joi.object({
  filename: Joi.string().required(),
});
