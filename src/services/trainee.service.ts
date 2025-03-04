import {
  CreateTraineeDTO,
  UpdateTraineeDTO,
  UpdateTraineeNotesDTO,
} from "../dtos/trainee.dto";
import { ConflictError } from "../errors/ConflictError";
import { NotFoundError } from "../errors/NotFoundError";
import { Bcrypt } from "../helpers/Bcrypt";
import { TraineeWithoutPassword } from "../helpers/ExcludePassword";
import prisma from "../infrastructure/database/prisma";
import { Prisma, SubscriptionStatus, Trainee } from "@prisma/client";
import dayjs from 'dayjs';

class TraineeService {
  async createTrainee(data: CreateTraineeDTO) {
    let duplicate = await this.checkDuplicate(data.parcode, data.phoneNumber);

    if (duplicate)
      throw new ConflictError("Phone Number or parcode is already in use");

    const trainee: Prisma.TraineeCreateInput = {
      ...data,
      subscriptionClasses: data.totalSubscriptionClasses,
      remainingClasses: data.totalSubscriptionClasses,
      password: await Bcrypt.hash(data.phoneNumber),
      dob: data.dobAsDate,
      subscriptionDate: data.subscriptionDateAsDate,
      subscriptionStartDate: data.subscriptionStartDateAsDate,
      subscriptionEndDate: data.subscriptionEndDateAsDate,
      idFace: data.idFaceAsPath,
      idBack: data.idBackAsPath,
    };
    return await prisma.trainee.create({ data: trainee });
  }

  async checkDuplicate(parcode: string, phoneNumber: string) {
    return await prisma.trainee.findFirst({
      where: {
        OR: [{ parcode }, { phoneNumber }],
      },
      select: { id: true },
    });
  }

  async getTrainees() {
    return await prisma.trainee.findMany({ select: TraineeWithoutPassword });
  }

  async getTraineeById(id: number) {
    return await prisma.trainee.findUnique({
      where: { id },
      include: { inBodies: true, attendances: true },
    });
  }

  async getTraineeByParcode(parcode: string) {
    return await prisma.trainee.findUnique({
      where: { parcode },
    });
  }

  // async updateTrainee(id: number, dto: UpdateTraineeDTO) {
  //   const found = await this.getTraineeById(id);
  //   if (!found) {
  //     throw new NotFoundError("Trainee not found");
  //   }

  //   let duplicate = await this.checkDuplicate(dto.parcode, dto.phoneNumber);
  //   if (duplicate && duplicate.id !== id) {
  //     throw new ConflictError("Phone Number or parcode is already in use");
  //   }

  //   // Recalculate subscriptionEndDate if necessary
  //   const subscriptionEndDate = dto.subscriptionStartDate
  //     ? dayjs(dto.subscriptionStartDate)
  //         .add(dto.subscriptionMonths, "month")
  //         .toDate()
  //     : found.subscriptionEndDate; // fallback to existing date if not updated

  //   // Prepare the payload
  //   const payload = {
  //     ...dto,
  //     dob: dto.dob ? new Date(dto.dob) : undefined,
  //     subscriptionDate: dto.subscriptionDate
  //       ? new Date(dto.subscriptionDate)
  //       : undefined,
  //     subscriptionStartDate: dto.subscriptionStartDate
  //       ? new Date(dto.subscriptionStartDate)
  //       : undefined,
  //     subscriptionEndDate, // calculated value
  //     subscriptionStatus: dto.subscriptionStartDate // Set to ACTIVE if subscriptionStartDate is updated
  //       ? SubscriptionStatus.ACTIVE
  //       : found.subscriptionStatus, // Retain the old status if not updated
  //   };

  //   const { id: unusedId, ...data } = payload;

  //   return await prisma.trainee.update({
  //     where: { id },
  //     data: data,
  //   });
  // }

  // async updateTrainee(id: number, dto: UpdateTraineeDTO) {
  //   const found = await this.getTraineeById(id);
  //   if (!found) {
  //     throw new NotFoundError("Trainee not found");
  //   }
  
  //   let duplicate = await this.checkDuplicate(dto.parcode, dto.phoneNumber);
  //   if (duplicate && duplicate.id !== id) {
  //     throw new ConflictError("Phone Number or parcode is already in use");
  //   }
  
  //   // Recalculate subscriptionEndDate and remainingClasses if necessary
  //   const subscriptionEndDate = dto.subscriptionStartDate
  //     ? dayjs(dto.subscriptionStartDate)
  //         .add(dto.subscriptionMonths, "month")
  //         .toDate()
  //     : found.subscriptionEndDate; // fallback to existing date if not updated
  
  //   // Calculate the total number of classes based on subscriptionMonths and subscriptionClasses
  //   const totalClasses = dto.subscriptionMonths * dto.subscriptionClasses;
  
  //   // Prepare the payload
  //   const payload = {
  //     ...dto,
  //     dob: dto.dob ? new Date(dto.dob) : undefined,
  //     subscriptionDate: dto.subscriptionDate
  //       ? new Date(dto.subscriptionDate)
  //       : undefined,
  //     subscriptionStartDate: dto.subscriptionStartDate
  //       ? new Date(dto.subscriptionStartDate)
  //       : undefined,
  //     subscriptionEndDate, // calculated value
  //     remainingClasses: totalClasses, // Update remaining classes based on new calculation
  //     subscriptionStatus: dto.subscriptionStartDate // Set to ACTIVE if subscriptionStartDate is updated
  //       ? SubscriptionStatus.ACTIVE
  //       : found.subscriptionStatus, // Retain the old status if not updated
  //   };
  
  //   const { id: unusedId, ...data } = payload;
  
  //   return await prisma.trainee.update({
  //     where: { id },
  //     data: data,
  //   });
  // }

  async updateTrainee(id: number, dto: UpdateTraineeDTO) {
    const found = await this.getTraineeById(id);
    if (!found) {
      throw new NotFoundError("Trainee not found");
    }
  
    let duplicate = await this.checkDuplicate(dto.parcode, dto.phoneNumber);
    if (duplicate && duplicate.id !== id) {
      throw new ConflictError("Phone Number or parcode is already in use");
    }
  
    // Recalculate subscriptionEndDate and remainingClasses if necessary
    const subscriptionEndDate = dto.subscriptionStartDate
      ? dayjs(dto.subscriptionStartDate)
          .add(dto.subscriptionMonths, "month")
          .toDate()
      : found.subscriptionEndDate; // fallback to existing date if not updated
  
    // Calculate the total number of classes based on subscriptionMonths and subscriptionClasses
    const totalClasses = dto.subscriptionMonths * dto.subscriptionClasses;
  
    // Allow manual update of subscriptionStatus, falling back to automatic logic if not provided
    const subscriptionStatus = dto.subscriptionStatus 
      ? dto.subscriptionStatus // use passed status if provided
      : dto.subscriptionStartDate // Set to ACTIVE if subscriptionStartDate is updated
        ? SubscriptionStatus.ACTIVE
        : found.subscriptionStatus; // Retain the old status if not updated
  
    // Prepare the payload
    const payload = {
      ...dto,
      dob: dto.dob ? new Date(dto.dob) : undefined,
      subscriptionDate: dto.subscriptionDate
        ? new Date(dto.subscriptionDate)
        : undefined,
      subscriptionStartDate: dto.subscriptionStartDate
        ? new Date(dto.subscriptionStartDate)
        : undefined,
      subscriptionEndDate, // calculated value
      remainingClasses: totalClasses, // Update remaining classes based on new calculation
      subscriptionStatus, // Use the updated or old status
    };
  
    const { id: unusedId, ...data } = payload;
  
    return await prisma.trainee.update({
      where: { id },
      data: data,
    });
  }
  
  
  async updateTraineeNotes(id: number, dto: UpdateTraineeNotesDTO) {
    const found = await this.getTraineeById(id);
    if (!found) {
      throw new NotFoundError("Trainee not found");
    }

    return await prisma.trainee.update({
      where: { id },
      data: dto,
    });
  }

  async deleteTrainee(id: number) {
    return await prisma.trainee.delete({ where: { id } });
  }
}

export default new TraineeService();
