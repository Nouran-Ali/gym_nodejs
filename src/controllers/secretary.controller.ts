// src/controllers/secretary.controller.ts
import { Request, Response, NextFunction } from 'express';
import SecretaryService from '../services/secretary.service';
import { Bcrypt } from './../helpers/Bcrypt';
import { Prisma } from '@prisma/client';
import { NotFoundError } from '../errors/NotFoundError';
import { ConflictError } from '../errors/ConflictError';
import { CreateSecretaryDTO } from '../dtos/secretary.dto';

class SecretaryController {
  async createSecretary(req: Request, res: Response, next: NextFunction) {
    try {
      let {confirm_password, ...secretaryData}: CreateSecretaryDTO = req.body;
      const data = {
        ...secretaryData,
        dob: CreateSecretaryDTO.getFormattedDOB(secretaryData.dob),
        password: await Bcrypt.hash(secretaryData.password),
      };

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
      const secretary: any = await SecretaryService.getSecretaryById(
        Number(id)
      );
      if (!secretary) {
        next(new NotFoundError('Secretary not found'));
      }
      res.status(200).json(secretary);
    } catch (error: any) {
      next(error);
    }
  }

  async updateSecretary(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    const newSecretary = req.body;
    if (newSecretary.dob) newSecretary.dob = new Date(newSecretary.dob);
    try {
      const existed: any = await SecretaryService.getSecretaryById(Number(id));
      if (!existed) {
        next(new NotFoundError('Secretary not found'));
      }
      const secretary = await SecretaryService.updateSecretary(Number(id), {
        ...newSecretary,
      });
      res.status(200).json(secretary);
    } catch (error: any) {
      next(error);
    }
  }

  async deleteSecretary(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    try {
      const secretary = await SecretaryService.getSecretaryById(+id);
      if (!secretary) {
        next(new NotFoundError('Secretary not found'));
        return;
      }
      await SecretaryService.deleteSecretary(Number(id));
      res.status(200).json({ message: 'Secretary deleted successfully' });
    } catch (error: any) {
      next(error);
    }
  }
}

export default new SecretaryController();
