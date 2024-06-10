// src/controllers/trainee.controller.ts

import { NextFunction, Request, Response } from 'express';
import TraineeService from '../services/trainee.service';
import { Prisma, Trainee } from '@prisma/client';
import traineeService from '../services/trainee.service';
import { NotFoundError } from '../errors/NotFoundError';
import { Bcrypt } from '../helpers/Bcrypt';
import { ConflictError } from '../errors/ConflictError';

export class TraineeController {
  async getTrainees(req: Request, res: Response, next: NextFunction) {
    try {
      const trainees = await traineeService.getTrainees();
      res.status(200).json(trainees);
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

  async createTrainee(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const trainee = req.body;
      const idImgs: any = req.files;

      // Validate files presence
      if (!idImgs || !idImgs.idFace || !idImgs.idBack) {
        res.status(400).json({
          errorCode: 'VALIDATION_ERROR',
          details: { id_images: 'idFace is required' },
        });
        return;
      }

      let duplicate = await traineeService.checkDuplicate(
        trainee.parcode,
        trainee.phoneNumber
      );

      if (duplicate) {
        next(new ConflictError('Phone Number or parcode is already in use'));
        return;
      }

      const numberAttributes = [
        'subscriptionMonths',
        'subscriptionClasses',
        'paid',
        'reminder',
      ];

      for (let key in trainee) {
        if (numberAttributes.includes(key)) {
          trainee[key] = +trainee[key];
        }
      }

      const classes = trainee.subscriptionMonths * trainee.subscriptionClasses;
      // modify data to accepted by service
      trainee.subscriptionClasses = classes;
      trainee.remainingClasses = classes;
      trainee.password = await Bcrypt.hash(trainee.phoneNumber);
      trainee.dob = new Date(trainee.dob);
      trainee.subscriptionDate = new Date(Date.now());
      trainee.subscriptionStartDate = new Date(trainee.subscriptionStartDate);
      trainee.subscriptionEndDate = new Date(
        trainee.subscriptionStartDate.setMonth(
          new Date(trainee.subscriptionStartDate).getMonth() +
            +trainee.subscriptionMonths
        )
      );
      trainee.idFace = `trainees/${idImgs.idFace[0].filename}`;
      trainee.idBack = `trainees/${idImgs.idBack[0].filename}`;

      const { password, ...newTrainee } = await traineeService.createTrainee(
        trainee
      );
      res.status(201).json(newTrainee);
    } catch (error: any) {
      next(error);
    }
  }

  async updateTrainee(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { id } = req.params;
      const trainee = req.body;

      const found = TraineeService.getTraineeById(+id);

      if (!found) {
        next(new NotFoundError('Trainee not found'));
        return;
      }

      // if found, modify the trainee body object
      const data: Prisma.TraineeUpdateInput = {
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
        next(new ConflictError('Phone Number or parcode is already in use'));
        return;
      }
      const { password, ...newTrainee } = await traineeService.updateTrainee(
        +id,
        data
      );
      res.status(201).json(newTrainee);
    } catch (error: any) {
      next(error);
    }
  }
}

export default new TraineeController();
