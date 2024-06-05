import prisma from '../infrastructure/database/prisma';
import { Prisma } from '@prisma/client';

class CoachService {
  async createCoach(data: Prisma.CoachCreateInput) {
    return await prisma.coach.create({ data });
  }

  async checkIfDuplicate(phoneNumber: string) {
    return await prisma.coach.findUnique({
      where: {
        phoneNumber,
      },
    });
  }

  async getCoaches() {
    return await prisma.coach.findMany({
      select: {
        id: true,
        phoneNumber: true,
        fullName: true,
        gender: true,
        dob: true,
        password: false,
      },
    });
  }

  async getCoachById(id: number) {
    return await prisma.coach.findUnique({
      where: { id },
      select: { password: false },
    });
  }

  async updateCoach(id: number, data: Prisma.CoachUpdateInput) {
    return await prisma.coach.update({
      where: { id },
      data,
    });
  }

  async deleteCoach(id: number) {
    return await prisma.coach.delete({ where: { id } });
  }

}

export default new CoachService();
