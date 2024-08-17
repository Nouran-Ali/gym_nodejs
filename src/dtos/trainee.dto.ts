import {
  IsString,
  IsNotEmpty,
  IsDateString,
  IsEnum,
  IsNumber,
  IsOptional,
  Validate,
  IsInt,
  IsDate,
  IsBoolean,
} from 'class-validator';
import { Transform } from 'class-transformer';
import { IsDateFormat } from '../helpers/isDateFormat'; // Assuming you have a custom date format validator
import { Gender, SubscriptionStatus, SubscriptionType } from '@prisma/client';
import { IsFile } from '../helpers/isFileDecorator';
import { stringToBoolean } from '../helpers/custom-transformers';

export class CreateTraineeDTO {
  @IsString()
  @IsNotEmpty()
  parcode!: string;

  @IsString()
  @IsNotEmpty()
  phoneNumber!: string;

  @IsString()
  @IsNotEmpty()
  fullName!: string;

  @IsEnum(Gender)
  @IsNotEmpty()
  gender!: Gender;

  @IsString()
  @IsNotEmpty()
  dob!: string;

  @IsEnum(SubscriptionType)
  @IsNotEmpty()
  subscriptionType!: SubscriptionType;

  @IsEnum(SubscriptionStatus)
  @IsNotEmpty()
  subscriptionStatus!: SubscriptionStatus;

  @IsString()
  @IsNotEmpty()
  subscriptionStartDate!: string;

  @IsInt()
  @IsNotEmpty()
  @Transform(({ value }) => parseInt(value, 10), { toClassOnly: true })
  subscriptionMonths!: number;

  @IsInt()
  @IsNotEmpty()
  @Transform(({ value }) => parseInt(value, 10), { toClassOnly: true })
  subscriptionClasses!: number;

  @IsInt()
  @IsNotEmpty()
  @Transform(({ value }) => parseInt(value, 10), { toClassOnly: true })
  paid!: number;

  @IsInt()
  @IsNotEmpty()
  @Transform(({ value }) => parseInt(value, 10), { toClassOnly: true })
  reminder!: number;

  @IsNotEmpty()
  idFace!: any;

  @IsNotEmpty()
  idBack!: any;

  // Optional fields
  @IsOptional()
  @IsString()
  trainingName?: string;

  @IsOptional()
  @IsString()
  offerName?: string;

  @IsOptional()
  @IsString()
  medicalProblem?: string;

  @IsOptional()
  @Transform(({ value }) => stringToBoolean(value), { toClassOnly: true })
  @IsBoolean()
  surgeries?: boolean;

  @IsOptional()
  @IsString()
  goal?: string;

  @IsOptional()
  @IsString()
  sundayNote?: string;

  @IsOptional()
  @IsString()
  mondayNote?: string;

  @IsOptional()
  @IsString()
  tuesdayNote?: string;

  @IsOptional()
  @IsString()
  wednesdayNote?: string;

  @IsOptional()
  @IsString()
  thursdayNote?: string;

  @IsOptional()
  @IsString()
  fridayNote?: string;

  @IsOptional()
  @IsString()
  saturdayNote?: string;

  @IsOptional()
  @IsString()
  generalNote?: string;
}

export class UpdateTraineeDTO {
  @IsString()
  @IsNotEmpty()
  parcode!: string;

  @IsString()
  @IsNotEmpty()
  phoneNumber!: string;

  @IsOptional()
  @IsString()
  fullName?: string;

  @IsOptional()
  @IsEnum(Gender)
  gender?: Gender;

  @IsOptional()
  @IsString()
  dob?: string;

  @IsOptional()
  @IsEnum(SubscriptionType)
  subscriptionType?: SubscriptionType;

  @IsOptional()
  @IsEnum(SubscriptionStatus)
  subscriptionStatus?: SubscriptionStatus;

  @IsOptional()
  @IsString()
  subscriptionStartDate?: string;

  @IsOptional()
  @IsInt()
  @IsNotEmpty()
  @Transform(({ value }) => parseInt(value, 10), { toClassOnly: true })
  subscriptionMonths?: number;

  @IsOptional()
  @IsInt()
  @IsNotEmpty()
  @Transform(({ value }) => parseInt(value, 10), { toClassOnly: true })
  subscriptionClasses?: number;

  @IsOptional()
  @IsNumber()
  remainingClasses?: number;

  @IsOptional()
  @IsInt()
  @IsNotEmpty()
  @Transform(({ value }) => parseInt(value, 10), { toClassOnly: true })
  paid?: number;

  @IsOptional()
  @IsInt()
  @IsNotEmpty()
  @Transform(({ value }) => parseInt(value, 10), { toClassOnly: true })
  reminder?: number;

  @IsOptional()
  @IsString()
  trainingName?: string;

  @IsOptional()
  @IsString()
  offerName?: string;

  @IsOptional()
  @IsString()
  medicalProblem?: string;

  @IsOptional()
  @Transform(({ value }) => stringToBoolean(value), { toClassOnly: true })
  @IsBoolean()
  surgeries?: boolean;

  @IsOptional()
  @IsString()
  goal?: string;

  @IsOptional()
  @IsString()
  sundayNote?: string;

  @IsOptional()
  @IsString()
  mondayNote?: string;

  @IsOptional()
  @IsString()
  tuesdayNote?: string;

  @IsOptional()
  @IsString()
  wednesdayNote?: string;

  @IsOptional()
  @IsString()
  thursdayNote?: string;

  @IsOptional()
  @IsString()
  fridayNote?: string;

  @IsOptional()
  @IsString()
  saturdayNote?: string;

  @IsOptional()
  @IsString()
  generalNote?: string;

  @IsOptional()
  idFace?: any;

  @IsOptional()
  idBack?: any;
}
