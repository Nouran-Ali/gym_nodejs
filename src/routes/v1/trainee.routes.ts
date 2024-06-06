// src/routes/trainee.routes.ts
import { Router } from 'express';
import { createTraineeSchema } from '../../dtos/trainee.dto';
import { validateSchema } from '../../middlewares/validateSchema';
import TraineeController  from '../../controllers/trainee.controller';
import { adminMiddleware, authMiddleware, coachMiddleware } from '../../middlewares/authMiddleware';
import { upload } from '../../config/multer.config';
import { createInBodySchema } from '../../dtos/inbody.dto';

const router = Router();


router.get(
  '/trainees',
  authMiddleware,
  adminMiddleware,
  TraineeController.getTrainees
);

router.post(
  '/trainees',
  upload.none(),
  authMiddleware,
  adminMiddleware,
  validateSchema(createTraineeSchema),
  TraineeController.createTrainee
);
router.get(
  '/trainees/:id',
  authMiddleware,
  adminMiddleware,
  TraineeController.getTraineeById
);

export default router;
