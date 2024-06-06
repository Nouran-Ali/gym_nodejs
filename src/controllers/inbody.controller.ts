// src/controllers/inbody.controller.ts

import { NextFunction, Request, Response } from 'express';
import InBodyService from '../services/inbody.service';
import path from 'path';

export class InBodyController {
  async createInBody(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      let inBodyData = req.body;
      let dietFile = req.file;
      inBodyData.dietFile = `inbodies/${dietFile?.filename}`;

      const notNumberAttributes = ['dietFile', 'currentSituation'];

      for (let key in inBodyData) {
        if (!notNumberAttributes.includes(key)) {
          inBodyData[key] = +inBodyData[key];
        }
      }

      const newInBody = await InBodyService.createInBody(inBodyData);
      res.status(201).json(newInBody);
    } catch (error: any) {
      next(error);
    }
  }

  async getAll(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const inbodies = await InBodyService.getAll();

      res.status(200).json(inbodies);
    } catch (error: any) {
      next(error);
    }
  }

  // Add more controller methods as needed
}

export default new InBodyController();
