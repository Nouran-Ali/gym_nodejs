// src/schemas/trainee.schema.ts
import Joi from 'joi';

export const createTraineeSchema = Joi.object({
  parcode: Joi.string().required(),
  phoneNumber: Joi.string().required(),
  fullName: Joi.string().required(),
  gender: Joi.string().valid('MALE', 'FEMALE').required(),
  dob: Joi.date().required(),
  subscriptionType: Joi.string().valid('PRIVATE', 'NOT_PRIVATE').required(),
  subscriptionStatus: Joi.string()
    .valid('ACTIVE', 'INACTIVE', 'PENDING')
    .required(),
  subscriptionDate: Joi.date().required(),
  subscriptionStartDate: Joi.date().required(),
  subscriptionMonths: Joi.number().required(),
  subscriptionClasses: Joi.number().required(),
  // remainingClasses: Joi.number().required(),
  // subscriptionEndDate: Joi.date().required(),
  paid: Joi.number().required(),
  reminder: Joi.number().required(),
  // optional
  trainingName: Joi.string().optional(),
  offerName: Joi.string().optional(),
  medicalProblem: Joi.string().optional(),
  surgeries: Joi.string().optional(),
  goal: Joi.string().optional(),
  sundayNote: Joi.string().optional(),
  mondayNote: Joi.string().optional(),
  tuesdayNote: Joi.string().optional(),
  wednesdayNote: Joi.string().optional(),
  thursdayNote: Joi.string().optional(),
  fridayNote: Joi.string().optional(),
  saturdayNote: Joi.string().optional(),
  generalNote: Joi.string().optional(),
});
