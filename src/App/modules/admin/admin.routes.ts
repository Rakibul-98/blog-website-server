import express from 'express';
import { userControllers } from '../user/user.controller';
import auth from '../../middlewares/auth';
import { blogControllers } from '../blog/blog.controller';

const router = express.Router();

// route to block user by admin
router.patch(
  '/users/:userId/block',
  auth('admin'),
  userControllers.blockUser,
)

// route to update user by admin
router.delete(
    '/blogs/:id',
    auth('admin'),
    blogControllers.deleteBlog,
  )

export const adminRoutes = router;