import { Request, Response, NextFunction } from 'express';
import { ApiError } from '../utils/ApiError';

export const errorHandler = (err: Error | ApiError, req: Request, res: Response, next: NextFunction) => {
  let statusCode = 500;
  let message = 'Internal Server Error';
  let errors: any = undefined;

  if (err instanceof ApiError) {
    statusCode = err.statusCode;
    message = err.message;
  }

  console.error('DEBUG_TEMP', err);

  res.status(statusCode).json({
    success: false,
    message,
    ...(errors && { errors })
  });
};
