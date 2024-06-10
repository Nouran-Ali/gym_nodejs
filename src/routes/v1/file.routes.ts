// src/routes/inbody.routes.ts

import { Router } from 'express';
import { createInBodySchema } from '../../dtos/inbody.dto';
import { authMiddleware } from '../../middlewares/authMiddleware';
import { upload } from '../../config/multer.config';
import fileController from '../../controllers/file.controller';
import { getFileSchema } from '../../dtos/file.dto';

const router = Router();

router.get(
  '/files/',
  authMiddleware,
  // validateSchema(getFileSchema),
  fileController.getFile
);

// Add more routes as needed

export default router;
