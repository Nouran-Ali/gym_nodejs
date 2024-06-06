// src/services/inbody.service.ts

import { Prisma } from '@prisma/client';
import prisma from '../infrastructure/database/prisma';

class InBodyService {
  async createInBody(data: Prisma.InBodyCreateInput): Promise<any> {
    return prisma.inBody.create({
      data,
    });
  }

  async getAll(): Promise<any> {
    return prisma.inBody.findMany({
      orderBy: {
        date: 'desc', // Sort by date in descending order
      },
    });
  }

  // Add more methods as needed
}

export default new InBodyService();
