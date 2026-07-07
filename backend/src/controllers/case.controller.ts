import { Request, Response } from 'express';
import * as caseService from '../services/case.service';
import { catchAsync } from '../utils/catchAsync';

export const createCase = catchAsync(async (req: Request, res: Response) => {
  const caseRecord = await caseService.createCase(req.body);
  res.status(201).json({ success: true, data: caseRecord });
});

export const getCases = catchAsync(async (req: Request, res: Response) => {
  const cases = await caseService.getAllCases(req.query);
  res.status(200).json({ success: true, data: cases });
});

export const getCase = catchAsync(async (req: Request, res: Response) => {
  const caseRecord = await caseService.getCaseById(req.params.id as string);
  res.status(200).json({ success: true, data: caseRecord });
});

export const updateCase = catchAsync(async (req: Request, res: Response) => {
  const caseRecord = await caseService.updateCase(req.params.id as string, req.body);
  res.status(200).json({ success: true, data: caseRecord });
});

export const deleteCase = catchAsync(async (req: Request, res: Response) => {
  await caseService.deleteCase(req.params.id as string);
  res.status(200).json({ success: true, data: {} });
});
