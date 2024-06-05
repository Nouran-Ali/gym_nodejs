// src/dto/secretary.dto.ts
import Joi from 'joi';

export const createSecretarySchema = Joi.object({
  phoneNumber: Joi.string().required(),
  fullName: Joi.string().required(),
  gender: Joi.string().valid('MALE', 'FEMALE').required(),
  dob: Joi.date().required(),
  password: Joi.string().required(),
  confirm_password: Joi.string()
    .valid(Joi.ref('password'))
    .required()
    .messages({
      'any.only': 'Passwords must match',
    }),
});

export const updateSecretarySchema = Joi.object({
  phoneNumber: Joi.string(),
  fullName: Joi.string(),
  gender: Joi.string().valid('MALE', 'FEMALE'),
  dob: Joi.date(),
  password: Joi.string(),
});
