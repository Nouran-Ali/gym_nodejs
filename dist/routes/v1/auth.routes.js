"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = __importDefault(require("../../controllers/auth.controller"));
const authMiddleware_1 = require("../../middlewares/authMiddleware");
const auth_dto_1 = __importDefault(require("../../dtos/auth.dto"));
const validationMiddleware_1 = __importDefault(require("../../middlewares/validationMiddleware"));
const router = (0, express_1.Router)();
/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: User authentication
 */
/**
 * @swagger
 * /login:
 *   post:
 *     summary: User login
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Login'
 *     responses:
 *       200:
 *         description: Successful login
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 token:
 *                   type: string
 *       400:
 *         description: Invalid credentials
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 token:
 *                   type: string
 */
router.post('/login', (0, validationMiddleware_1.default)(auth_dto_1.default), auth_controller_1.default.login);
/**
 * @swagger
 * /me:
 *   get:
 *     summary: Get current user
 *     tags: [Authentication]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Current user data
 *         content:
 *           application/json:
 *             example:
 *               id: "12345"
 *               phoneNumber: "1234567890"
 *               name: "John Doe"
 *               email: "johndoe@example.com"
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             example:
 *               message: "Unauthorized"
 */
router.get('/me', authMiddleware_1.authMiddleware, auth_controller_1.default.me);
exports.default = router;
