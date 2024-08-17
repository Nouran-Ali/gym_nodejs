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
  @Validate(IsDateFormat, {
    message: 'Invalid date format. Date must be in YYYY-MM-DD format',
  })
  dob?: string;

  @IsOptional()
  @IsEnum(SubscriptionType)
  subscriptionType?: SubscriptionType;

  @IsOptional()
  @IsEnum(SubscriptionStatus)
  subscriptionStatus?: SubscriptionStatus;

  @IsOptional()
  @IsString()
  @Validate(IsDateFormat, {
    message: 'Invalid date format. Date must be in YYYY-MM-DD format',
  })
  subscriptionStartDate?: string;

  @IsOptional()
  @IsNumber()
  subscriptionMonths?: number;

  @IsOptional()
  @IsNumber()
  subscriptionClasses?: number;

  @IsOptional()
  @IsNumber()
  remainingClasses?: number;

  @IsOptional()
  @IsNumber()
  paid?: number;

  @IsOptional()
  @IsNumber()
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
