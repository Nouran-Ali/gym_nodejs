import { Request, Response, NextFunction } from 'express';
import { UnauthorizedError } from '../errors/UnauthorizedError';
import { verifyToken } from '../helpers/Jwt';

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    console.error('No authorization header provided');
    throw new UnauthorizedError('No token provided');
  }

  const token = authHeader.split(' ')[1];

  if (!token) {
    console.error('No token found in authorization header');
    throw new UnauthorizedError('No token provided');
  }

  try {
    const decoded = verifyToken(token);
    (req as any).user = decoded;
    next();
  } catch (error: any) {
    console.error('Error during token verification:', error.message);
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
    throw new UnauthorizedError('Only allowed for coaches');
  }

  next();
};

export const adminMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const decodedUser = (req as any).user;
  if (
    !decodedUser ||
    (decodedUser.userType !== 'COACH' && decodedUser.userType !== 'SECRETARY')
  ) {
    throw new UnauthorizedError('Only allowed for admins');
  }

  next();
};
