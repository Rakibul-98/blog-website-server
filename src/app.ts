import express, { Application, Request, Response } from 'express'
import cors from 'cors';
import { userRoutes } from './App/modules/user/user.routes';
import { blogRoutes } from './App/modules/blog/blog.routes';

const app: Application = express();

app.use(express.json());
app.use(cors());

app.use('/api/users', userRoutes);
app.use('/api/blogs', blogRoutes);


const getAController = (req: Request, res: Response) => {
    res.send('Hello from A controller');
}

app.get('/', getAController);

export default app;