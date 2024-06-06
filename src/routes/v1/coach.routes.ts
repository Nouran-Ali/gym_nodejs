// src/routes/coach.routes.ts

import { Router } from 'express';
import CoachController from '../../controllers/coach.controller';
import { createCoachSchema, updateCoachSchema } from '../../dtos/coach.dto';
import { validateSchema } from '../../middlewares/validateSchema';
import { upload } from '../../config/multer.config';

const router = Router();

// router.get('/coaches', CoachController.getAllCoaches);
// router.post(
//   '/coaches',
//   upload.none(),
//   validateSchema(createCoachSchema),
//   CoachController.createCoach
// );
// router.put(
//   '/coaches/:id',
//   validateSchema(updateCoachSchema),
//   CoachController.updateCoach
// );

export default router;
