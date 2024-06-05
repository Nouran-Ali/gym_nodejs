import { Request, Response, NextFunction } from 'express';
import { Bcrypt } from '../helpers/Bcrypt';
import { generateToken } from '../helpers/Jwt';
import { UnauthorizedError } from '../errors/UnauthorizedError';
import userService from '../services/user.service';

class AuthController {
  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { phoneNumber, password } = req.body;
      const user = await userService.findUserByPhoneNumber(phoneNumber);

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
        userType: user.userType
      });

      res.status(200).json({ token });
    } catch (error) {
      next(error); // Pass the error to the error handling middleware
    }
  }
}

export default new AuthController();
