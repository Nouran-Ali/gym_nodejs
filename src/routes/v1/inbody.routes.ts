import { Router } from 'express';
import InBodyController from '../../controllers/inbody.controller';
import { createInBodySchema } from '../../dtos/inbody.dto';
import { authMiddleware } from '../../middlewares/authMiddleware';
import { upload, uploadInbody } from '../../config/multer.config';

const router = Router();
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
 *             type: object
 *             properties:
 *               traineeId:
 *                 type: number
 *               length:
 *                 type: number
 *               weight:
 *                 type: number
 *               shoulder:
 *                 type: number
 *               chest:
 *                 type: number
 *               belowChest:
 *                 type: number
 *               middle:
 *                 type: number
 *               stomach:
 *                 type: number
 *               buttocks:
 *                 type: number
 *               thigh:
 *                 type: number
 *               arm:
 *                 type: number
 *               BMI:
 *                 type: number
 *               currentSituation:
 *                 type: string
 *               dailyWaterNeed:
 *                 type: number
 *               caloriesRequired:
 *                 type: number
 *               muscleWeight:
 *                 type: number
 *               fatMass:
 *                 type: number
 *               boneDensity:
 *                 type: number
 *               bellyFat:
 *                 type: number
 *               dietFile:
 *                 type: string
 *                 description: Reference to the uploaded file
 *             required:
 *               - traineeId
 *               - length
 *               - weight
 *               - shoulder
 *               - chest
 *               - belowChest
 *               - middle
 *               - stomach
 *               - buttocks
 *               - thigh
 *               - arm
 *               - BMI
 *               - currentSituation
 *               - dailyWaterNeed
 *               - caloriesRequired
 *               - muscleWeight
 *               - fatMass
 *               - boneDensity
 *               - bellyFat
 *     responses:
 *       200:
 *         description: Inbody data created successfully
 */

router.post(
  '/inbodies',
  uploadInbody.single('dietFile'),
  authMiddleware,
  // validateSchema(createInBodySchema),
  InBodyController.createInBody
);

router.get('/inbodies', authMiddleware, InBodyController.getAll);

export default router;
