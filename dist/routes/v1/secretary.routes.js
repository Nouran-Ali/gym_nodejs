"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const secretary_controller_1 = __importDefault(require("../../controllers/secretary.controller"));
const secretary_dto_1 = require("../../dtos/secretary.dto");
const authMiddleware_1 = require("../../middlewares/authMiddleware");
const validationMiddleware_1 = __importDefault(require("../../middlewares/validationMiddleware"));
const router = (0, express_1.Router)();
/**
 * @swagger
 * tags:
 *   name: Secretaries
 *   description: Secretary management
 */
/**
 * @swagger
 * /secretaries:
 *   get:
 *     summary: Get all secretaries
 *     tags: [Secretaries]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of secretaries
 *       401:
 *         description: Unauthorized
 */
router.get('/secretaries', authMiddleware_1.authMiddleware, authMiddleware_1.coachMiddleware, secretary_controller_1.default.getSecretaries);
/**
 * @swagger
 * /secretaries:
 *   post:
 *     summary: Create a new secretary
 *     tags: [Secretaries]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateSecretary'
 *     responses:
 *       200:
 *         description: Secretary created successfully
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 */
router.post('/secretaries', authMiddleware_1.authMiddleware, authMiddleware_1.coachMiddleware, (0, validationMiddleware_1.default)(secretary_dto_1.CreateSecretaryDTO), secretary_controller_1.default.createSecretary);
/**
 * @swagger
 * /secretaries/{id}:
 *   get:
 *     summary: Get a secretary by ID
 *     tags: [Secretaries]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Secretary ID
 *     responses:
 *       200:
 *         description: Secretary found
 *       404:
 *         description: Secretary not found
 */
router.get('/secretaries/:id', secretary_controller_1.default.getSecretaryById);
/**
 * @swagger
 * /secretaries/{id}:
 *   put:
 *     summary: Update a secretary
 *     tags: [Secretaries]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Secretary ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateSecretary'
 *     responses:
 *       200:
 *         description: Secretary updated successfully
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Secretary not found
 */
router.put('/secretaries/:id', authMiddleware_1.authMiddleware, authMiddleware_1.coachMiddleware, (0, validationMiddleware_1.default)(secretary_dto_1.UpdateSecretaryDTO), secretary_controller_1.default.updateSecretary);
/**
 * @swagger
 * /secretaries/{id}:
 *   delete:
 *     summary: Delete a secretary
 *     tags: [Secretaries]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Secretary ID
 *     responses:
 *       200:
 *         description: Secretary deleted successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Secretary not found
 */
router.delete('/secretaries/:id', authMiddleware_1.authMiddleware, authMiddleware_1.coachMiddleware, secretary_controller_1.default.deleteSecretary);
exports.default = router;
