import { Request, Response, NextFunction } from 'express';
import path from 'path';

 class FileController {
  async getFile(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      // Extract filename from request params
      const { filename } = req.body;

      // Construct the path to the file
      const filePath = path.join(__dirname, '../..', `uploads/`, filename);

      // Send the file as a response
      res.sendFile(filePath);
    } catch (error) {
      // Handle errors
      next(error);
    }
  }
}

export default new FileController();