import { Request, Response, NextFunction } from 'express';
import { logger } from '../utils/logger';

export const loggingMiddleware = (req: Request, res: Response, next: NextFunction) => {
  logger.request(req);

  const originalSend = res.send;

  res.send = function (body: any): Response {
    logger.response(res, body);
    
    return originalSend.call(this, body);
  };

  next();
}; 