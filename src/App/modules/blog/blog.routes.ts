import express from 'express';
import { blogControllers } from './blog.controller';
import auth from '../../middlewares/auth';

const router = express.Router();

router.post(
  '/create-blog',
//   validateRequest(createStudentValidationSchema),
  blogControllers.createBlog,
);

router.get(
  '/',
  auth(),
  blogControllers.getAllBlogs,
);

router.get(
  '/:id',
  blogControllers.getSingleBlog,
);

router.patch(
  '/:id',
  blogControllers.updateBlog,
);

router.delete(
  '/:id',
  blogControllers.deleteBlog,
);

export const blogRoutes = router;