// src/services/attendance.service.ts

import { Attendance } from '@prisma/client';
import prisma from '../infrastructure/database/prisma';
import { TraineeWithoutPassword } from '../helpers/ExcludePassword';

class AttendanceService {
  async createAttendance(traineeId: number): Promise<Attendance> {
    return prisma.attendance.create({
      data: { traineeId },
      
    });
  }

  async getAllAttendances(): Promise<Attendance[]> {
    return prisma.attendance.findMany({
      include: {
        trainee: {
          select: TraineeWithoutPassword
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
