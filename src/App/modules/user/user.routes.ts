import express from 'express';
import { userControllers } from './user.controller';
import validateRequest from '../../middlewares/validateRequest';
import userValidationSchema from './user.validation';

const router = express.Router();

router.post(
  '/create-user',
  validateRequest(userValidationSchema),
  userControllers.createUser,
);

export const userRoutes = router;