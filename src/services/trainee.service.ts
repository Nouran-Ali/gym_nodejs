import prisma from '../infrastructure/database/prisma';
import { Prisma } from '@prisma/client';

class TraineeService {
  async createTrainee(data: Prisma.TraineeCreateInput) {
    return await prisma.trainee.create({ data });
  }

  async getTrainees() {
    return await prisma.trainee.findMany();
  }

  async getTraineeById(id: number) {
    return await prisma.trainee.findUnique({ where: { id } });
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

  async subscribeToGym(
    traineeId: number,
    subscriptionData: Prisma.TraineeUpdateInput
  ) {
    return await prisma.trainee.update({
      where: { id: traineeId },
      data: subscriptionData,
    });
  }
}

export default new TraineeService();
