import { Request, Response, NextFunction } from 'express';
import { UnauthorizedError } from '../errors/UnauthorizedError';
import { verifyToken } from '../helpers/Jwt';

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    throw new UnauthorizedError('No token provided');
  }

  try {
    const decoded = verifyToken(token);
    (req as any).user = decoded;
    next();
  } catch (error) {
    throw new UnauthorizedError('Invalid token');
  }
};

export const coachMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const decodedUser = (req as any).user;
  if (!decodedUser || decodedUser.userType !== 'COACH') {
    throw new UnauthorizedError('User is not a coach');
  }

  next();
};
