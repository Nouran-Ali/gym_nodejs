// src/services/secretary.service.ts
import prisma from '../infrastructure/database/prisma';
import { Prisma } from '@prisma/client';

class SecretaryService {
  async createSecretary(data: Prisma.SecretaryCreateInput) {
    return await prisma.secretary.create({ data });
  }

  async getSecretaries() {
    return await prisma.secretary.findMany();
  }

  async getSecretaryById(id: number) {
    return await prisma.secretary.findUnique({ where: { id } });
  }

  async updateSecretary(id: number, data: Prisma.SecretaryUpdateInput) {
    return await prisma.secretary.update({
      where: { id },
      data,
    });
  }

  async deleteSecretary(id: number) {
    return await prisma.secretary.delete({ where: { id } });
  }

  async checkIfDuplicate(phoneNumber: string) {
    const secretary = await prisma.secretary.findUnique({
      where: { phoneNumber },
    });
    return !!secretary;
  }
}

export default new SecretaryService();
