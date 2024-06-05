import Joi from 'joi';

// Define the Joi schema for login
const loginSchema = Joi.object({
  phone_number: Joi.string().required(),
  password: Joi.string().required(),
});

export default loginSchema;
