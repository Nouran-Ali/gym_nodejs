// src/dto/attendance.dto.ts

import Joi from 'joi';

export const createAttendanceSchema = Joi.object({
  traineeId: Joi.number().integer().required(),
});
