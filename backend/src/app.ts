import express, { Application } from 'express';
import authRouter from './routes/auth.routes'
import { loggingMiddleware } from './middlewares/logging';

const app: Application = express();


// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(loggingMiddleware);


// Routes
app.use('/auth', authRouter);

export default app;
