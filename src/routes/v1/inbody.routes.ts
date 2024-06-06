// src/routes/inbody.routes.ts

import { Router } from 'express';
import InBodyController from '../../controllers/inbody.controller';
import { validateSchema } from '../../middlewares/validateSchema';
import { createInBodySchema } from '../../dtos/inbody.dto';
import { authMiddleware } from '../../middlewares/authMiddleware';
import { upload } from '../../config/multer.config';

const router = Router();

// Route to create InBody
router.post(
  '/inbodies',
  upload.single('dietFile'),
  authMiddleware,
  validateSchema(createInBodySchema),
  InBodyController.createInBody
);

router.get(
  '/inbodies',
  authMiddleware,
  InBodyController.getAll
);

// Add more routes as needed

export default router;
