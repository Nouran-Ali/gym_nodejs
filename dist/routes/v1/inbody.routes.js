"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const inbody_controller_1 = __importDefault(require("../../controllers/inbody.controller"));
const inbody_dto_1 = require("../../dtos/inbody.dto");
const authMiddleware_1 = require("../../middlewares/authMiddleware");
const multer_config_1 = require("../../config/multer.config");
const validationMiddleware_1 = __importDefault(require("../../middlewares/validationMiddleware"));
/**
 * @swagger
 * tags:
 *   name: InBody
 *   description: InBody management
 */
const router = (0, express_1.Router)();
/**
 * @swagger
 * /inbodies:
 *   post:
 *     summary: Create a new inbody data
 *     consumes:
 *       - multipart/form-data
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             $ref: '#/components/schemas/CreateInBody'
 *     responses:
 *       200:
 *         description: Inbody data created successfully
 *     tags:
 *       - InBody
 */
router.post('/inbodies', multer_config_1.uploadInbodyS3.single('dietFile'), authMiddleware_1.authMiddleware, (0, validationMiddleware_1.default)(inbody_dto_1.CreateInBodyDTO), inbody_controller_1.default.createInBody);
/**
 * @swagger
 * /inbodies:
 *   get:
 *     summary: Get all inbody data
 *     description: Retrieve a list of all inbody data records.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of inbody data records
 *     tags:
 *       - InBody
 */
router.get('/inbodies', authMiddleware_1.authMiddleware, inbody_controller_1.default.getAll);
exports.default = router;
