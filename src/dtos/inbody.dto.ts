// src/dto/inbody.dto.ts

import Joi from 'joi';

export const createInBodySchema = Joi.object({
  traineeId: Joi.number().integer().required(),
  // Body measurements
  length: Joi.number().required(),
  weight: Joi.number().required(),
  shoulder: Joi.number().required(),
  chest: Joi.number().required(),
  belowChest: Joi.number().required(),
  middle: Joi.number().required(),
  stomach: Joi.number().required(),
  buttocks: Joi.number().required(),
  thigh: Joi.number().required(),
  arm: Joi.number().required(),
  // Health metrics
  BMI: Joi.number().required(),
  currentSituation: Joi.string().required(),
  dailyWaterNeed: Joi.number().required(),
  caloriesRequired: Joi.number().required(),
  muscleWeight: Joi.number().required(),
  fatMass: Joi.number().required(),
  boneDensity: Joi.number().required(),
  bellyFat: Joi.number().required(),
  dietFile: Joi.string().optional().allow(null, ''),
});
