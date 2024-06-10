import { Router } from 'express';
import attendanceController from '../../controllers/attendance.controller';
import { createAttendanceSchema } from '../../dtos/attendance.dto';
import { authMiddleware } from '../../middlewares/authMiddleware';

const router = Router();

router.post(
  '/attendance/:parcode',
  authMiddleware,
  // validateSchema(createAttendanceSchema),
  attendanceController.createAttendance
);

router.get(
  '/attendance',
  authMiddleware,
  attendanceController.getAllAttendances
);

router.get(
  '/attendance/:traineeId',
  authMiddleware,
  attendanceController.getAttendanceByTraineeId
);

export default router;
