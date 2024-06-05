import { Router } from 'express';
import { validateSchema } from '../../middlewares/validateSchema';
import { loginSchema } from '../../dtos/auth.dto';
import authController from '../../controllers/auth.controller';
import { upload } from '../../config/multer.config';

const router = Router();

router.post(
  '/login',
  upload.none(),
  validateSchema(loginSchema),
  authController.login
);


export default router;
