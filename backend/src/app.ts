import express, { Application } from 'express';
import cors from 'cors';
import authRouter from './routes/auth.routes'
import teamRouter from './routes/team.routes'
import { loggingMiddleware } from './middlewares/logging';

const app: Application = express();

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(loggingMiddleware);


// Routes
app.use('/auth', authRouter);
app.use('/team', teamRouter);

export default app;
