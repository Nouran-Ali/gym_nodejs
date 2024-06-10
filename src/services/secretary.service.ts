// src/services/secretary.service.ts
import { ConflictError } from '../errors/ConflictError';
import { AdminWithoutPassword } from '../helpers/ExcludePassword';
import prisma from '../infrastructure/database/prisma';
import { Prisma } from '@prisma/client';

class SecretaryService {
  async createSecretary(data: Prisma.SecretaryCreateInput) {
    const duplicate = await this.checkIfDuplicate(data.phoneNumber);
    if (duplicate) throw new ConflictError('Phone number already exists');

    return await prisma.secretary.create({ data });
  }

  async checkIfDuplicate(phoneNumber: string) {
    const secretary = await prisma.secretary.findUnique({
      where: { phoneNumber },
    });
    return !!secretary;
  }

  async getSecretaries() {
    return await prisma.secretary.findMany({ select: AdminWithoutPassword });
  }

  async getSecretaryById(id: number) {
    return await prisma.secretary.findUnique({
      where: { id },
      select: AdminWithoutPassword,
    });
  }

  async updateSecretary(id: number, data: Prisma.SecretaryUpdateInput) {
    return await prisma.secretary.update({
      where: { id },
      data,
      select: AdminWithoutPassword,
    });
  }

  async deleteSecretary(id: number) {
    return await prisma.secretary.delete({ where: { id } });
  }
}

export default new SecretaryService();
