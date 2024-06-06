import { Request, Response, NextFunction } from 'express';
import { Bcrypt } from '../helpers/Bcrypt';
import { generateToken } from '../helpers/Jwt';
import { UnauthorizedError } from '../errors/UnauthorizedError';
import userService from '../services/user.service';
import { Coach, Secretary, Trainee } from '@prisma/client';
import coachService from '../services/coach.service';
import secretaryService from '../services/secretary.service';
import traineeService from '../services/trainee.service';

class AuthController {
  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { phoneNumber, password } = req.body;
      const user = await userService.findUserByPhoneNumber(phoneNumber);
      console.log("🚀 ~ AuthController ~ login ~ user:", user)

      if (!user) {
        throw new UnauthorizedError('Invalid phoneNumber or password');
      }

      const isPasswordValid = await Bcrypt.compare(password, user.password);

      if (!isPasswordValid) {
        throw new UnauthorizedError('Invalid phoneNumber or password');
      }

      const token = generateToken({
        id: user.id,
        phoneNumber: user.phoneNumber,
        userType: user.userType,
      });

      res.status(200).json({ seccess: true, token });
    } catch (error) {
      next(error); // Pass the error to the error handling middleware
    }
  }

  async me(req: Request, res: Response, next: NextFunction) {
    try {
      const decodedUser = (req as any).user;
      console.log("🚀 ~ AuthController ~ me ~ decodedUser:", decodedUser)
      
      let user = await userService.findUserById(+decodedUser.id, decodedUser.userType);
      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  }
}

export default new AuthController();
