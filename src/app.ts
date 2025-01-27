import express, { Application } from 'express'
import cors from 'cors';
import { userRoutes } from './App/modules/user/user.routes';
import { blogRoutes } from './App/modules/blog/blog.routes';
import { authRoutes } from './App/modules/auth/auth.routes';
import cookieParser from 'cookie-parser';
import router from './App/routes';
import globalErrorHandler from './App/middlewares/globalErrorhandler';

const app: Application = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: ['http://localhost:5173'] }));

app.use('/api/', router);

app.use(globalErrorHandler);

export default app;