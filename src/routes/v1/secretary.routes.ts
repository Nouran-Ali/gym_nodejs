// src/routes/secretary.routes.ts
import { Router } from 'express';
import SecretaryController from '../../controllers/secretary.controller';
import { validateSchema } from '../../middlewares/validateSchema';
import {
  createSecretarySchema,
  updateSecretarySchema,
} from '../../dtos/secretary.dto';
import { upload } from '../../config/multer.config';
import {
  authMiddleware,
  coachMiddleware,
} from '../../middlewares/authMiddleware';

const router = Router();

router.get(
  '/secretaries',
  authMiddleware,
  coachMiddleware,
  SecretaryController.getSecretaries
);

router.post(
  '/secretaries',
  authMiddleware,
  coachMiddleware,
  upload.none(),
  validateSchema(createSecretarySchema),
  SecretaryController.createSecretary
);

router.get('/secretaries/:id', SecretaryController.getSecretaryById);

router.put(
  '/secretaries/:id',
  validateSchema(updateSecretarySchema),
  SecretaryController.updateSecretary
);

router.delete('/secretaries/:id', SecretaryController.deleteSecretary);

export default router;
