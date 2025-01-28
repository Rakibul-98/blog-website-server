import express from 'express';
import { blogControllers } from './blog.controller';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import blogValidationSchema from './blog.validation';

const router = express.Router();

router.post(
  '/create-blog',
  auth('user'),
  validateRequest(blogValidationSchema),
  blogControllers.createBlog,
);

router.get(
  '/',
  blogControllers.getAllBlogs,
);

router.get(
  '/:id',
  blogControllers.getSingleBlog,
);

router.patch(
  '/:id',
  auth('user'),
  validateRequest(blogValidationSchema),
  blogControllers.updateBlog,
);

router.delete(
  '/:id',
  auth('user'),
  blogControllers.deleteBlog,
);

export const blogRoutes = router;