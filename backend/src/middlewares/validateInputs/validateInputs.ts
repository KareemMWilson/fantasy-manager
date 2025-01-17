import { Request, Response, NextFunction } from 'express';
import { authSchema } from '../../validations/auth.validation';
import { ZodError } from 'zod';

export const validateAuthInputs = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await authSchema.parseAsync(req.body);
    next();
  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(400).json({
        status: 'error',
        message: error.errors[0].message,
      });
    }
    next(error);
  }
}; 