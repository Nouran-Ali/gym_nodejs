// src/helpers/jwt.ts
import jwt from 'jsonwebtoken';

const secret = process.env.JWT_SECRET || 'hard-coded-secret';

export const generateToken = (payload: object, expiresIn: string = '1h') => {
  return jwt.sign(payload, secret, { expiresIn });
};

export const verifyToken = (token: string) => {
  return jwt.verify(token, secret);
};
