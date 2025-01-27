import express from 'express';
import { blogControllers } from './blog.controller';

const router = express.Router();

router.post(
  '/create-blog',
//   validateRequest(createStudentValidationSchema),
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
  blogControllers.updateBlog,
);

router.delete(
  '/:id',
  blogControllers.deleteBlog,
);

export const blogRoutes = router;