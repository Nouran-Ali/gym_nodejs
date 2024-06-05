import {
  Gender,
  SubscriptionStatus,
  SubscriptionType,
  User,
} from '@prisma/client';
import Joi from 'joi';

const subscriptionTypeValues = Object.values(SubscriptionType);
const subscriptionStatusValues = Object.values(SubscriptionStatus);
const genderValues = Object.values(Gender);

const traineeSchema = Joi.object<User>({
  // required
  parcode: Joi.string().required(),
  full_name: Joi.string().required(),
  phone_number: Joi.string().required(),
  gender: Joi.string()
    .valid(...genderValues)
    .required(),
  dob: Joi.date().optional(),
  password: Joi.string().required(),
  subscription_type: Joi.string()
    .valid(...subscriptionTypeValues)
    .required(),
  subscription_date: Joi.date().required(),
  subscription_start_date: Joi.date().required(),
  subscription_end_date: Joi.date().required(),
  subscription_months: Joi.number().integer().required(),
  subscription_classes: Joi.number().integer().required(),
  remaining_classes: Joi.number().integer().required(),
  paid: Joi.boolean().required(),
  reminder: Joi.boolean().required(),
  subscription_status: Joi.string().valid(...subscriptionStatusValues).required(),
  // optional
  training_name: Joi.string().optional(),
  offer_name: Joi.string().optional(),
  medical_problem: Joi.string().optional(),
  surgeries: Joi.string().optional(),
  goal: Joi.string().optional(),
  sunday_note: Joi.string().optional(),
  monday_note: Joi.string().optional(),
  tuesday_note: Joi.string().optional(),
  wednesday_note: Joi.string().optional(),
  thursday_note: Joi.string().optional(),
  friday_note: Joi.string().optional(),
  saturday_note: Joi.string().optional(),
  general_note: Joi.string().optional(),
});

export default traineeSchema;
