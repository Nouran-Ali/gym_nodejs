import {
  Gender,
  SubscriptionStatus,
  SubscriptionType,
  User,
  UserType,
} from '@prisma/client';
import Joi from 'joi';
import { secretaryT } from '../types/types';

const genderValues = Object.values(Gender);

const secretarySchema = Joi.object<secretaryT>({
  // required for secretaries
  full_name: Joi.string().required(),
  phone_number: Joi.string().required(),
  gender: Joi.string()
    .valid(...genderValues)
    .required(),
  dob: Joi.date().required(),
});

export default secretarySchema;
