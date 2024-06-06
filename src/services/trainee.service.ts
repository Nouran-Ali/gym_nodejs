import { TraineeWithoutPassword } from '../helpers/ExcludePassword';
import prisma from '../infrastructure/database/prisma';
import { Prisma } from '@prisma/client';

class TraineeService {
  async createTrainee(data: Prisma.TraineeCreateInput) {
    return await prisma.trainee.create({ data });
  }

  async checkDuplicate(parcode: string, phoneNumber: string) {
    return await prisma.trainee.findUnique({
      where: {
        parcode,
        phoneNumber,
      },
      select: TraineeWithoutPassword,
    });
  }

  async getTrainees() {
    return await prisma.trainee.findMany({ select: TraineeWithoutPassword });
  }

  async getTraineeById(id: number) {
    return await prisma.trainee.findUnique({
      where: { id },
      include: { inBodies: true },
    });
  }

  async getTraineeByParcode(parcode: string) {
    return await prisma.trainee.findUnique({
      where: { parcode },
    });
  }

  async updateTrainee(id: number, data: Prisma.TraineeUpdateInput) {
    return await prisma.trainee.update({
      where: { id },
      data,
    });
  }

  async deleteTrainee(id: number) {
    return await prisma.trainee.delete({ where: { id } });
  }
}

export default new TraineeService();
