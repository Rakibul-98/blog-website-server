import express from 'express';
import { userControllers } from '../user/user.controller';
import auth from '../../middlewares/auth';
import { blogControllers } from '../blog/blog.controller';

const router = express.Router();

router.patch(
  '/users/:userId/block',
  auth('admin'),
  userControllers.blockUser,
)

router.delete(
    '/blogs/:id',
    auth('admin'),
    blogControllers.deleteBlog,
  )

export const adminRoutes = router;