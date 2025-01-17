import express, { Application } from 'express';

const app: Application = express();


// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
// app.use('/', indexRouter);

export default app;
