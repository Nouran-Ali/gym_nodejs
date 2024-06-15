"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const attendance_controller_1 = __importDefault(require("../../controllers/attendance.controller"));
const authMiddleware_1 = require("../../middlewares/authMiddleware");
const router = (0, express_1.Router)();
/**
 * @swagger
 * /attendance/{parcode}:
 *   post:
 *     summary: Create a new attendance record
 *     description: Create a new attendance record for a trainee using their parcode.
 *     parameters:
 *       - in: path
 *         name: parcode
 *         schema:
 *           type: string
 *         required: true
 *         description: The parcode of the trainee
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Attendance created successfully
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *     tags:
 *       - Attendance
 */
router.post('/attendance/:parcode', authMiddleware_1.authMiddleware, authMiddleware_1.adminMiddleware, attendance_controller_1.default.createAttendance);
/**
 * @swagger
 * /attendance:
 *   get:
 *     summary: Get all attendance records
 *     description: Retrieve a list of all attendance records.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of attendance records
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: number
 *                   parcode:
 *                     type: string
 *                   traineeId:
 *                     type: number
 *                   date:
 *                     type: string
 *                     format: date-time
 *                   status:
 *                     type: string
 *                     enum: [PRESENT, ABSENT]
 *       401:
 *         description: Unauthorized
 *     tags:
 *       - Attendance
 */
router.get('/attendance', authMiddleware_1.authMiddleware, attendance_controller_1.default.getAllAttendances);
/**
 * @swagger
 * /attendance/{traineeId}:
 *   get:
 *     summary: Get attendance records by trainee ID
 *     description: Retrieve attendance records for a specific trainee using their ID.
 *     parameters:
 *       - in: path
 *         name: traineeId
 *         schema:
 *           type: number
 *         required: true
 *         description: The ID of the trainee
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Attendance records retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: number
 *                   traineeId:
 *                     type: number
 *                   date:
 *                     type: string
 *                     format: date-time
 *                   status:
 *                     type: string
 *                     enum: [PRESENT, ABSENT]
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *     tags:
 *       - Attendance
 */
router.get('/attendance/:traineeId', authMiddleware_1.authMiddleware, attendance_controller_1.default.getAttendanceByTraineeId);
exports.default = router;
