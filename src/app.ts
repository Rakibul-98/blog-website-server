import express, { Application } from 'express'
import cors from 'cors';
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