// src/controllers/secretary.controller.ts
import { Request, Response, NextFunction } from 'express';
import SecretaryService from '../services/secretary.service';
import { Bcrypt } from './../helpers/Bcrypt';
import { DuplicateError } from '../errors/DuplicateError';
import { Prisma } from '@prisma/client';

class SecretaryController {
  async createSecretary(req: Request, res: Response, next: NextFunction) {
    try {
      const { confirm_password, ...secretaryData } = req.body;
      const hashedPassword = await Bcrypt.hash(confirm_password);

      secretaryData.dob = new Date(secretaryData.dob);

      let data: Prisma.SecretaryCreateInput = {
        ...secretaryData,
        password: await Bcrypt.hash(secretaryData.password),
      };

      const duplicate = await SecretaryService.checkIfDuplicate(
        data.phoneNumber
      );
      if (duplicate) {
        next(new DuplicateError('Phone number already exists'));
        return;
      }

      const { password, ...secretary } = await SecretaryService.createSecretary(
        data
      );
      res.status(201).json(secretary);
    } catch (error: any) {
      next(error);
    }
  }

  async getSecretaries(req: Request, res: Response, next: NextFunction) {
    try {
      const secretaries = await SecretaryService.getSecretaries();
      res.status(200).json(secretaries.map(({ password, ...rest }) => rest));
    } catch (error: any) {
      next(error);
    }
  }

  async getSecretaryById(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    try {
      const secretary = await SecretaryService.getSecretaryById(Number(id));
      if (secretary) {
        const { password, ...rest } = secretary;
        res.status(200).json(rest);
      } else {
        res.status(404).json({ message: 'Secretary not found' });
      }
    } catch (error: any) {
      next(error);
    }
  }

  async updateSecretary(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    const { password, ...data } = req.body;
    try {
      if (password) {
        data.password = await Bcrypt.hash(password);
      }
      const secretary = await SecretaryService.updateSecretary(
        Number(id),
        data
      );
      res.status(200).json(secretary);
    } catch (error: any) {
      next(error);
    }
  }

  async deleteSecretary(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    try {
      await SecretaryService.deleteSecretary(Number(id));
      res.status(204).send();
    } catch (error: any) {
      next(error);
    }
  }
}

export default new SecretaryController();
