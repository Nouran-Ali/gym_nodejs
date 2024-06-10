// src/routes/coach.routes.ts

import { Router } from 'express';
import CoachController from '../../controllers/coach.controller';
import { createCoachSchema, updateCoachSchema } from '../../dtos/coach.dto';
import { upload } from '../../config/multer.config';

const router = Router();


export default router;
