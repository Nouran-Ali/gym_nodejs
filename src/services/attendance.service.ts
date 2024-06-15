// src/services/attendance.service.ts

import { Attendance } from '@prisma/client';
import prisma from '../infrastructure/database/prisma';
import { TraineeWithoutPassword } from '../helpers/ExcludePassword';
import traineeService from './trainee.service';
import { NotFoundError } from '../errors/NotFoundError';
import { BadRequestError } from '../errors/BadRequestError';
import { plainToInstance } from 'class-transformer';
import { UpdateTraineeDTO } from '../dtos/trainee.dto';

class AttendanceService {
  async createAttendance(parcode: string) {
    const trainee = await traineeService.getTraineeByParcode(parcode);
    if (!trainee) throw new NotFoundError('Could not find trainee');

    if (trainee.remainingClasses === 0)
      throw new BadRequestError({
        remainingClasses: ['You have finished your subscription classes'],
      });

    await traineeService.updateTrainee(
      trainee.id,
      plainToInstance(UpdateTraineeDTO, {
        subscriptionStatus:
          trainee.remainingClasses - 1 === 0 ? 'INACTIVE' : 'ACTIVE',
        remainingClasses: trainee.remainingClasses - 1,
      })
    );

    return prisma.attendance.create({
      data: { traineeId: trainee.id },
    });
  }

  async getAllAttendances(): Promise<Attendance[]> {
    return prisma.attendance.findMany({
      include: {
        trainee: {
          select: TraineeWithoutPassword,
        },
      },
    });
  }

  async getAttendanceByTraineeId(traineeId: number): Promise<Attendance[]> {
    return prisma.attendance.findMany({
      where: {
        traineeId,
      },
    });
  }
}

export default new AttendanceService();
