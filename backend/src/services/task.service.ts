import { Task, ITask } from '../models/Task.model';
import { Case } from '../models/Case.model';
import { ApiError } from '../utils/ApiError';

export const createTask = async (caseId: string, data: Partial<ITask>) => {
  const caseExists = await Case.findById(caseId);
  if (!caseExists) throw new ApiError(404, 'Case not found');
  
  return await Task.create({ ...data, caseId });
};

export const getTasksByCaseId = async (caseId: string) => {
  return await Task.find({ caseId }).sort({ createdAt: -1 });
};

export const updateTask = async (id: string, data: Partial<ITask>) => {
  const updated = await Task.findByIdAndUpdate(id, data, { new: true, runValidators: true });
  if (!updated) throw new ApiError(404, 'Task not found');
  return updated;
};

export const toggleTaskStatus = async (id: string, status: 'Pending' | 'Completed') => {
  const updated = await Task.findByIdAndUpdate(id, { status }, { new: true, runValidators: true });
  if (!updated) throw new ApiError(404, 'Task not found');
  return updated;
};

export const deleteTask = async (id: string) => {
  const deleted = await Task.findByIdAndDelete(id);
  if (!deleted) throw new ApiError(404, 'Task not found');
  return deleted;
};
