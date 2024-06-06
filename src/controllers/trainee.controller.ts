// src/controllers/trainee.controller.ts

import { NextFunction, Request, Response } from 'express';
import TraineeService from '../services/trainee.service';
import { Prisma, Trainee } from '@prisma/client';
import traineeService from '../services/trainee.service';
import { NotFoundError } from '../errors/NotFoundError';
import { Bcrypt } from '../helpers/Bcrypt';
import { DuplicateError } from '../errors/DuplicateError';

export class TraineeController {
  async getTrainees(req: Request, res: Response, next: NextFunction) {
    try {
      const trainees = await traineeService.getTrainees();
      res.status(200).json(trainees);
    } catch (error: any) {
      next(error);
    }
  }

  async createTrainee(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const trainee = req.body;
      const data: Prisma.TraineeCreateInput = {
        ...trainee,
        dob: new Date(trainee.dob),
        subscriptionMonths: +trainee.subscriptionMonths,
        subscriptionDate: new Date(trainee.subscriptionDate),
        subscriptionClasses: +trainee.subscriptionClasses,
        remainingClasses: +trainee.subscriptionClasses,
        paid: +trainee.paid,
        reminder: +trainee.reminder,
        subscriptionStartDate: new Date(trainee.subscriptionStartDate),
        subscriptionEndDate: new Date(
          new Date(trainee.subscriptionStartDate).setMonth(
            new Date(trainee.subscriptionStartDate).getMonth() +
              +trainee.subscriptionMonths
          )
        ),
        password: await Bcrypt.hash(trainee.phoneNumber),
      };

      let duplicate = await traineeService.checkDuplicate(
        trainee.parcode,
        trainee.phoneNumber
      );
      if (duplicate) {
        next(new DuplicateError('Phone Number or parcode is already in use'));
        return;
      }
      const { password, ...newTrainee } = await traineeService.createTrainee(
        data
      );
      res.status(201).json(newTrainee);
    } catch (error: any) {
      next(error);
    }
  }

  async getTraineeById(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const id = parseInt(req.params.id, 10);
      const trainee = await traineeService.getTraineeById(id);

      if (!trainee) {
        next(new NotFoundError('Trainee not found'));
        return;
      }

      res.status(200).json(trainee);
    } catch (error: any) {
      next(error);
    }
  }
}

export default new TraineeController();
