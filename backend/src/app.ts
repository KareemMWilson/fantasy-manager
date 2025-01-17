import express, { Application } from 'express';
import authRouter from './routes/auth.routes'

const app: Application = express();


// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/auth', authRouter);

export default app;
