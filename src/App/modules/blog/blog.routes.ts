import express from 'express';
import { blogControllers } from './blog.controller';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import blogValidationSchema from './blog.validation';

const router = express.Router();

// create user route with proper validation
router.post(
  '/',
  auth('user'),
  validateRequest(blogValidationSchema),
  blogControllers.createBlog,
);

// get all blogs with public api
router.get(
  '/',
  blogControllers.getAllBlogs,
);

router.get(
  '/:id',
  blogControllers.getSingleBlog,
);

// update blog proper validation for user only
router.patch(
  '/:id',
  auth('user'),
  validateRequest(blogValidationSchema),
  blogControllers.updateBlog,
);

// delete blog by user only
router.delete(
  '/:id',
  auth('user'),
  blogControllers.deleteBlog,
);

export const blogRoutes = router;