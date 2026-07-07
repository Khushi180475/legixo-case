import { Request, Response, NextFunction } from 'express';
import { ApiError } from '../utils/ApiError';

export const requireAdmin = (req: Request, res: Response, next: NextFunction) => {
  const role = req.headers['x-user-role'];
  if (role !== 'Admin') {
    return next(new ApiError(403, 'Forbidden: Admin access required'));
  }
  next();
};
