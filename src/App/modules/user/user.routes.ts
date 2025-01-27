import express from 'express';
import { userControllers } from './user.controller';

const router = express.Router();

router.post(
  '/create-user',
//   validateRequest(createStudentValidationSchema),
  userControllers.createStudent,
);

export const userRoutes = router;