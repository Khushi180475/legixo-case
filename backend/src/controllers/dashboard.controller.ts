import { Request, Response } from 'express';
import * as dashboardService from '../services/dashboard.service';
import { catchAsync } from '../utils/catchAsync';

export const getSummary = catchAsync(async (req: Request, res: Response) => {
  const summary = await dashboardService.getDashboardSummary();
  res.status(200).json({ success: true, data: summary });
});
