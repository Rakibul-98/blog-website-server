import { Router } from 'express';
import { userRoutes } from '../modules/user/user.routes';
import { blogRoutes } from '../modules/blog/blog.routes';
import { authRoutes } from '../modules/auth/auth.routes';

const router = Router();

const moduleRoutes = [
  {
    path: '/users',
    route: userRoutes,
  },
  {
    path: '/blogs',
    route: blogRoutes,
  },
  {
    path: '/auth',
    route: authRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;