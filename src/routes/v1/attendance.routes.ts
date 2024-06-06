import { Router } from 'express';
import InBodyController from '../../controllers/inbody.controller';
import { validateSchema } from '../../middlewares/validateSchema';
import { createInBodySchema } from '../../dtos/inbody.dto';
import { authMiddleware } from '../../middlewares/authMiddleware';
import { upload } from '../../config/multer.config';
import { createAttendanceSchema } from '../../dtos/attendance.dto';
import attendanceController from '../../controllers/attendance.controller';

const router = Router();

// Route to create InBody
router.post(
  '/attendance/:parcode',
  authMiddleware,
  attendanceController.createAttendance
);

router.get('/attendance', authMiddleware, attendanceController.getAllAttendances);
router.get('/attendance/:traineeId', authMiddleware, attendanceController.getAttendanceByTraineeId);

// Add more routes as needed

export default router;
