"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const trainee_controller_1 = __importDefault(require("../../controllers/trainee.controller"));
const authMiddleware_1 = require("../../middlewares/authMiddleware");
const multer_config_1 = require("../../config/multer.config");
const trainee_dto_1 = require("../../dtos/trainee.dto");
const validationMiddleware_1 = __importDefault(require("../../middlewares/validationMiddleware"));
const router = (0, express_1.Router)();
/**
 * @swagger
 * tags:
 *   name: Trainees
 *   description: Trainee management
 */
/**
 * @swagger
 * /trainees:
 *   get:
 *     summary: Get all trainees
 *     tags: [Trainees]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of trainees
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Trainee'
 *       401:
 *         description: Unauthorized
 */
router.get('/trainees', authMiddleware_1.authMiddleware, authMiddleware_1.adminMiddleware, trainee_controller_1.default.getTrainees);
/**
 * @swagger
 * /trainees:
 *   post:
 *     summary: Create a new trainee
 *     tags: [Trainees]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             $ref: '#/components/schemas/CreateTrainee'
 *     responses:
 *       200:
 *         description: Trainee created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Trainee'
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 */
router.post('/trainees', authMiddleware_1.authMiddleware, authMiddleware_1.adminMiddleware, multer_config_1.uploadTraineeS3.fields([
    { name: 'idFace', maxCount: 1 },
    { name: 'idBack', maxCount: 1 },
]), (0, validationMiddleware_1.default)(trainee_dto_1.CreateTraineeDTO), trainee_controller_1.default.createTrainee);
/**
 * @swagger
 * /trainees/{id}:
 *   put:
 *     summary: Update a trainee
 *     tags: [Trainees]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Trainee ID
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             $ref: '#/components/schemas/UpdateTrainee'
 *     responses:
 *       200:
 *         description: Trainee updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Trainee'
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Trainee not found
 */
router.put('/trainees/:id', authMiddleware_1.authMiddleware, authMiddleware_1.adminMiddleware, multer_config_1.uploadTraineeS3.fields([
    { name: 'idFace', maxCount: 1 },
    { name: 'idBack', maxCount: 1 },
]), (0, validationMiddleware_1.default)(trainee_dto_1.UpdateTraineeDTO), trainee_controller_1.default.updateTrainee);
/**
 * @swagger
 * /trainees/{id}:
 *   get:
 *     summary: Get a trainee by ID
 *     tags: [Trainees]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Trainee ID
 *     responses:
 *       200:
 *         description: Trainee found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Trainee'
 *       404:
 *         description: Trainee not found
 *       401:
 *         description: Unauthorized
 */
router.get('/trainees/:id', authMiddleware_1.authMiddleware, authMiddleware_1.adminMiddleware, trainee_controller_1.default.getTraineeById);
exports.default = router;
