import { Request, Response } from 'express';
import * as taskService from '../services/task.service';
import { catchAsync } from '../utils/catchAsync';

export const createTask = catchAsync(async (req: Request, res: Response) => {
  const task = await taskService.createTask(req.params.caseId as string, req.body);
  res.status(201).json({ success: true, data: task });
});

export const getTasks = catchAsync(async (req: Request, res: Response) => {
  const tasks = await taskService.getTasksByCaseId(req.params.caseId as string);
  res.status(200).json({ success: true, data: tasks });
});

export const updateTask = catchAsync(async (req: Request, res: Response) => {
  const task = await taskService.updateTask(req.params.id as string, req.body);
  res.status(200).json({ success: true, data: task });
});

export const toggleTaskStatus = catchAsync(async (req: Request, res: Response) => {
  const { status } = req.body;
  const task = await taskService.toggleTaskStatus(req.params.id as string, status);
  res.status(200).json({ success: true, data: task });
});

export const deleteTask = catchAsync(async (req: Request, res: Response) => {
  await taskService.deleteTask(req.params.id as string);
  res.status(200).json({ success: true, data: {} });
});
