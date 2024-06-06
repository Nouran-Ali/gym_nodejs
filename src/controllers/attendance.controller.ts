// src/controllers/attendance.controller.ts

import { Request, Response, NextFunction } from 'express';
import AttendanceService from '../services/attendance.service';
import traineeService from '../services/trainee.service';
import { NotFoundError } from '../errors/NotFoundError';

class AttendanceController {
  async createAttendance(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { parcode } = req.params;
      const trainee = await traineeService.getTraineeByParcode(parcode);
      if (!trainee) {
        next(new NotFoundError('Could not find trainee'));
        return;
      }

      if (trainee.remainingClasses === 0) {
        next(new Error('You have finished your subscription classes'));
        return;
      }

      //   if (trainee.remainingClasses - 1 === 0) {
      // here we can update the subscription status to inactive
      //   }

      const newAttendee = await AttendanceService.createAttendance(trainee.id);
      const newTraineeData = {
        ...trainee,
        remainingClasses: trainee.remainingClasses - 1,
      };

      if (newAttendee) {
        await traineeService.updateTrainee(trainee.id, newTraineeData);
      }

      res.status(201).json(newAttendee);
    } catch (error: any) {
      next(error);
    }
  }

  async getAllAttendances(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const attendances = await AttendanceService.getAllAttendances();
      res.status(200).json(attendances);
    } catch (error: any) {
      next(error);
    }
  }

  async getAttendanceByTraineeId(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { traineeId } = req.params;
      const attendances = await AttendanceService.getAttendanceByTraineeId(
        +traineeId
      );
      res.status(200).json(attendances);
    } catch (error: any) {
      next(error);
    }
  }
}

export default new AttendanceController();
