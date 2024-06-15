"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = exports.generateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
require("dotenv/config");
const secret = process.env.JWT_SECRET || 'hard-coded-secret';
const generateToken = (payload, expiresIn = '30d') => {
    // console.log(secret);
    return jsonwebtoken_1.default.sign(payload, secret, { expiresIn });
};
exports.generateToken = generateToken;
const verifyToken = (token) => {
    try {
        // console.log(secret);
        return jsonwebtoken_1.default.verify(token, secret);
    }
    catch (error) {
        console.error('Token verification failed:', error);
        throw new Error('Invalid token');
    }
};
exports.verifyToken = verifyToken;
