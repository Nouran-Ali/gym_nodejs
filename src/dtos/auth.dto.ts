import Joi from "joi";

export const loginSchema = Joi.object({
  phoneNumber: Joi.string().required().messages({
    'any.required': 'Email is required',
  }),
  password: Joi.string().min(8).required().messages({
    'string.min': 'Password must be at least 8 characters long',
    'any.required': 'Password is required',
  }),
});
