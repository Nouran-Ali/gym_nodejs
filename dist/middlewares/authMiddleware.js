"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminMiddleware = exports.coachMiddleware = exports.authMiddleware = void 0;
const UnauthorizedError_1 = require("../errors/UnauthorizedError");
const Jwt_1 = require("../helpers/Jwt");
const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        throw new UnauthorizedError_1.UnauthorizedError('No token provided');
    }
    const token = authHeader.split(' ')[1];
    if (!token) {
        throw new UnauthorizedError_1.UnauthorizedError('No token provided');
    }
    try {
        const decoded = (0, Jwt_1.verifyToken)(token);
        req.user = decoded;
        next();
    }
    catch (error) {
        throw new UnauthorizedError_1.UnauthorizedError('Invalid token');
    }
};
exports.authMiddleware = authMiddleware;
const coachMiddleware = (req, res, next) => {
    const decodedUser = req.user;
    if (!decodedUser || decodedUser.userType !== 'COACH') {
        throw new UnauthorizedError_1.UnauthorizedError('Only allowed for coaches');
    }
    next();
};
exports.coachMiddleware = coachMiddleware;
const adminMiddleware = (req, res, next) => {
    const decodedUser = req.user;
    if (!decodedUser ||
        (decodedUser.userType !== 'COACH' && decodedUser.userType !== 'SECRETARY')) {
        throw new UnauthorizedError_1.UnauthorizedError('Only allowed for admins');
    }
    next();
};
exports.adminMiddleware = adminMiddleware;
